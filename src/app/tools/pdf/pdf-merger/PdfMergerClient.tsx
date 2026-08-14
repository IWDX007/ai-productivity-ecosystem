"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, FileText, X, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface PdfMergerPageProps {
  name?: string;
  description?: string;
}

export default function PdfMergerPage({ name, description }: PdfMergerPageProps) {
  const [files, setFiles] = useState<File[]>([])
  const [merging, setMerging] = useState(false)
  const [mergedUrl, setMergedUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = Array.from(e.target.files || []).filter(f => f.type === "application/pdf")
    setFiles(prev => [...prev, ...uploaded])
  }

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx))
  }

  const merge = async () => {
    if (files.length < 2) return
    setMerging(true)
    try {
      const { PDFDocument } = await import("pdf-lib")
      const mergedPdf = await PDFDocument.create()

      for (const file of files) {
        const bytes = await file.arrayBuffer()
        const pdf = await PDFDocument.load(bytes)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach(page => mergedPdf.addPage(page))
      }

      const mergedBytes = await mergedPdf.save()
      const blob = new Blob([mergedBytes as unknown as ArrayBuffer], { type: "application/pdf" })
      setMergedUrl(URL.createObjectURL(blob))
    } catch (e) {
      console.error(e)
    }
    setMerging(false)
  }

  const handleDownload = () => {
    if (!mergedUrl) return
    const link = document.createElement("a")
    link.download = "merged.pdf"
    link.href = mergedUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF Merger" description="Combine multiple PDF files into one document. Drag and drop to reorder. 100% private - all processing in your browser." keywords="pdf merger, free online tool, pdf-merger, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF Merger" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF <span className="gradient-text">Merger</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Combine multiple PDF files into one document. Drag and drop to reorder.
            100% private - all processing in your browser.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <FileText className="w-5 h-5 text-red-400" />
            <span>Upload PDF Files (min 2)</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf" multiple onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PDF files</span>
          </button>

          {files.length > 0 && (
            <>
              <div className="space-y-2 mb-6">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-theme-secondary border border-theme">
                    <FileText className="w-5 h-5 text-red-400" />
                    <div className="flex-1 min-w-0">
                      <div className="text-theme-primary text-sm truncate">{file.name}</div>
                      <div className="text-xs text-theme-muted">{(file.size / 1024).toFixed(1)} KB</div>
                    </div>
                    <span className="text-xs text-theme-muted">#{idx + 1}</span>
                    <button onClick={() => removeFile(idx)} className="text-red-400 hover:text-red-500">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={merge} disabled={files.length < 2 || merging}
                className="w-full mb-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                {merging ? <><Loader2 className="w-5 h-5 animate-spin" /> Merging...</> : `Merge ${files.length} PDFs`}
              </button>

              {mergedUrl && (
                <button onClick={handleDownload}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Merged PDF
                </button>
              )}
            </>
          )}
        </div>
</div>
    </div>
  )
}
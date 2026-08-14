"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, FileText, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function PdfSplitterPage() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [range, setRange] = useState("1-1")
  const [splitting, setSplitting] = useState(false)
  const [splitPdfs, setSplitPdfs] = useState<Array<{ range: string; url: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded || uploaded.type !== "application/pdf") return
    setFile(uploaded)

    const { PDFDocument } = await import("pdf-lib")
    const bytes = await uploaded.arrayBuffer()
    const pdf = await PDFDocument.load(bytes)
    setPageCount(pdf.getPageCount())
    setRange(`1-${pdf.getPageCount()}`)
  }

  const split = async () => {
    if (!file) return
    setSplitting(true)
    try {
      const { PDFDocument } = await import("pdf-lib")
      const bytes = await file.arrayBuffer()
      const sourcePdf = await PDFDocument.load(bytes)

      // Parse range like "1-3,5,7-10"
      const ranges = range.split(",").map(r => r.trim())
      const results: Array<{ range: string; url: string }> = []

      for (const r of ranges) {
        const newPdf = await PDFDocument.create()
        let pageNumbers: number[] = []

        if (r.includes("-")) {
          const [start, end] = r.split("-").map(Number)
          for (let i = start; i <= end; i++) pageNumbers.push(i - 1)
        } else {
          pageNumbers.push(parseInt(r) - 1)
        }

        const validPages = pageNumbers.filter(n => n >= 0 && n < sourcePdf.getPageCount())
        if (validPages.length === 0) continue

        const copied = await newPdf.copyPages(sourcePdf, validPages)
        copied.forEach(page => newPdf.addPage(page))

        const newBytes = await newPdf.save()
        const blob = new Blob([newBytes as unknown as ArrayBuffer], { type: "application/pdf" })
        results.push({ range: r, url: URL.createObjectURL(blob) })
      }
      setSplitPdfs(results)
    } catch (e) {
      console.error(e)
    }
    setSplitting(false)
  }

  const downloadPdf = (url: string, name: string) => {
    const link = document.createElement("a")
    link.download = `split-${name}.pdf`
    link.href = url
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF Splitter" description="Split PDF into multiple files by page ranges. Extract specific pages or split into sections. 100% private processing." keywords="pdf splitter, free online tool, pdf-splitter, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF Splitter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF <span className="gradient-text">Splitter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Split PDF into multiple files by page ranges. Extract specific pages 
            or split into sections. 100% private processing.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <FileText className="w-5 h-5 text-red-400" />
            <span>Upload PDF</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PDF file</span>
          </button>

          {file && (
            <>
              <div className="mb-4 p-3 rounded-lg bg-theme-secondary border border-theme text-sm">
                <div className="text-theme-primary">{file.name}</div>
                <div className="text-theme-muted">Total pages: {pageCount}</div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-theme-muted mb-2 block">Page Ranges (e.g., 1-3,5,7-10)</label>
                <input type="text" value={range} onChange={(e) => setRange(e.target.value)}
                  className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary font-mono focus:outline-none focus:border-red-500"
                  placeholder="1-5,7,9-12" />
                <div className="text-xs text-theme-muted mt-1">
                  Comma-separated ranges. Each range becomes a separate PDF.
                </div>
              </div>

              <button onClick={split} disabled={splitting}
                className="w-full mb-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                {splitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Splitting...</> : "Split PDF"}
              </button>

              {splitPdfs.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm text-theme-muted mb-2">Generated {splitPdfs.length} files:</div>
                  {splitPdfs.map((pdf, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                      <FileText className="w-5 h-5 text-red-400" />
                      <div className="flex-1">
                        <div className="text-theme-primary text-sm">Pages: {pdf.range}</div>
                      </div>
                      <button onClick={() => downloadPdf(pdf.url, pdf.range)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm flex items-center gap-1">
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <SEOSections toolSlug="pdf-splitter" toolName="PDF Splitter" category="PDF" />
      </div>
    </div>
  )
}
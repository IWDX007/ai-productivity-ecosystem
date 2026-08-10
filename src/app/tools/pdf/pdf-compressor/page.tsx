"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, FileText, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function PdfCompressorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [compressing, setCompressing] = useState(false)
  const [compressedUrl, setCompressedUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded || uploaded.type !== "application/pdf") return
    setFile(uploaded)
    setOriginalSize(uploaded.size)
    setCompressedSize(0)
    setCompressedUrl("")
  }

  const compress = async () => {
    if (!file) return
    setCompressing(true)
    try {
      const { PDFDocument } = await import("pdf-lib")
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)

      // Basic compression - remove metadata and re-save
      pdf.setTitle("")
      pdf.setAuthor("")
      pdf.setSubject("")
      pdf.setKeywords([])
      pdf.setProducer("")
      pdf.setCreator("")

      const compressedBytes = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
      })

      const blob = new Blob([compressedBytes as unknown as ArrayBuffer], { type: "application/pdf" })
      setCompressedSize(compressedBytes.length)
      setCompressedUrl(URL.createObjectURL(blob))
    } catch (e) {
      console.error(e)
    }
    setCompressing(false)
  }

  const handleDownload = () => {
    if (!compressedUrl) return
    const link = document.createElement("a")
    link.download = `compressed-${file?.name || "pdf"}`
    link.href = compressedUrl
    link.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(2)} MB`
  }

  const savings = originalSize > 0 && compressedSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF Compressor" description="Reduce PDF file size for easier sharing and storage. 100% private - processing in your browser only." keywords="pdf compressor, free online tool, pdf-compressor, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF Compressor" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF <span className="gradient-text">Compressor</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Reduce PDF file size for easier sharing and storage. 
            100% private - processing in your browser only.
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
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-theme-secondary border border-theme">
                  <div className="text-sm text-theme-muted mb-1">Original Size</div>
                  <div className="text-theme-primary font-bold text-2xl">{formatSize(originalSize)}</div>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <div className="text-sm text-red-400 mb-1">Compressed Size</div>
                  <div className="text-red-400 font-bold text-2xl">
                    {compressedSize > 0 ? formatSize(compressedSize) : "-"}
                    {savings > 0 && <span className="text-green-400 text-sm ml-2">(-{savings}%)</span>}
                  </div>
                </div>
              </div>

              <button onClick={compress} disabled={compressing}
                className="w-full mb-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                {compressing ? <><Loader2 className="w-5 h-5 animate-spin" /> Compressing...</> : "Compress PDF"}
              </button>

              {compressedUrl && (
                <button onClick={handleDownload}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Compressed PDF
                </button>
              )}
            </>
          )}
        </div>

        <SEOSections toolSlug="pdf-compressor" toolName="PDF Compressor" category="PDF" />
      </div>
    </div>
  )
}
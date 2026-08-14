"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, FileText, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function PdfPageExtractorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [pagesToExtract, setPagesToExtract] = useState("1")
  const [processing, setProcessing] = useState(false)
  const [resultUrl, setResultUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded || uploaded.type !== "application/pdf") return
    setFile(uploaded)
    setResultUrl("")

    const { PDFDocument } = await import("pdf-lib")
    const bytes = await uploaded.arrayBuffer()
    const pdf = await PDFDocument.load(bytes)
    setPageCount(pdf.getPageCount())
    setPagesToExtract("1")
  }

  const extract = async () => {
    if (!file) return
    setProcessing(true)
    try {
      const { PDFDocument } = await import("pdf-lib")
      const bytes = await file.arrayBuffer()
      const sourcePdf = await PDFDocument.load(bytes)
      const newPdf = await PDFDocument.create()

      // Parse pages like "1,3,5-8"
      const pageNumbers: number[] = []
      pagesToExtract.split(",").forEach(part => {
        const trimmed = part.trim()
        if (trimmed.includes("-")) {
          const [start, end] = trimmed.split("-").map(Number)
          for (let i = start; i <= end; i++) pageNumbers.push(i - 1)
        } else {
          pageNumbers.push(parseInt(trimmed) - 1)
        }
      })

      const validPages = pageNumbers.filter(n => n >= 0 && n < sourcePdf.getPageCount())
      const copied = await newPdf.copyPages(sourcePdf, validPages)
      copied.forEach(page => newPdf.addPage(page))

      const newBytes = await newPdf.save()
      const blob = new Blob([newBytes as unknown as ArrayBuffer], { type: "application/pdf" })
      setResultUrl(URL.createObjectURL(blob))
    } catch (e) {
      console.error(e)
    }
    setProcessing(false)
  }

  const handleDownload = () => {
    if (!resultUrl) return
    const link = document.createElement("a")
    link.download = `extracted-${file?.name || "pdf"}`
    link.href = resultUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF Page Extractor" description="Extract specific pages from a PDF to create a new PDF file. 100% private processing in your browser." keywords="pdf page extractor, free online tool, pdf-page-extractor, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF Page Extractor" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF Page <span className="gradient-text">Extractor</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Extract specific pages from a PDF to create a new PDF file. 
            100% private processing in your browser.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <FileText className="w-5 h-5 text-red-400" />
            <span>Upload and Extract</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PDF file</span>
          </button>

          {file && (
            <>
              <div className="mb-4 p-3 rounded-lg bg-theme-secondary border border-theme">
                <div className="text-theme-primary text-sm">{file.name}</div>
                <div className="text-theme-muted text-xs">Total pages: {pageCount}</div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-theme-muted mb-2 block">Pages to Extract (e.g., 1,3,5-8)</label>
                <input type="text" value={pagesToExtract} onChange={(e) => setPagesToExtract(e.target.value)}
                  className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary font-mono focus:outline-none focus:border-red-500"
                  placeholder="1,3,5-8" />
                <div className="text-xs text-theme-muted mt-1">
                  Comma-separated pages or ranges. Available: 1-{pageCount}
                </div>
              </div>

              <button onClick={extract} disabled={processing}
                className="w-full mb-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Extracting...</> : "Extract Pages"}
              </button>

              {resultUrl && (
                <button onClick={handleDownload}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Extracted PDF
                </button>
              )}
            </>
          )}
        </div>

        <SEOSections toolSlug="pdf-page-extractor" toolName="PDF Page Extractor" category="PDF" />
      </div>
    </div>
  )
}
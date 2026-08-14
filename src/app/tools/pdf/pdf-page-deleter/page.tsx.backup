"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, FileText, Trash2, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function PdfPageDeleterPage() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [pagesToDelete, setPagesToDelete] = useState("")
  const [processing, setProcessing] = useState(false)
  const [resultUrl, setResultUrl] = useState("")
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded || uploaded.type !== "application/pdf") return
    setFile(uploaded)
    setResultUrl("")
    setError("")

    const { PDFDocument } = await import("pdf-lib")
    const bytes = await uploaded.arrayBuffer()
    const pdf = await PDFDocument.load(bytes)
    setPageCount(pdf.getPageCount())
  }

  const deletePages = async () => {
    if (!file || !pagesToDelete.trim()) {
      setError("Please enter pages to delete")
      return
    }
    setProcessing(true)
    setError("")
    try {
      const { PDFDocument } = await import("pdf-lib")
      const bytes = await file.arrayBuffer()
      const sourcePdf = await PDFDocument.load(bytes)

      // Parse pages like "1,3,5-8"
      const deleteSet = new Set<number>()
      pagesToDelete.split(",").forEach(part => {
        const trimmed = part.trim()
        if (trimmed.includes("-")) {
          const [start, end] = trimmed.split("-").map(Number)
          for (let i = start; i <= end; i++) deleteSet.add(i - 1)
        } else {
          deleteSet.add(parseInt(trimmed) - 1)
        }
      })

      const totalPages = sourcePdf.getPageCount()
      const keepPages: number[] = []
      for (let i = 0; i < totalPages; i++) {
        if (!deleteSet.has(i)) keepPages.push(i)
      }

      if (keepPages.length === 0) {
        setError("Cannot delete all pages")
        setProcessing(false)
        return
      }

      const newPdf = await PDFDocument.create()
      const copied = await newPdf.copyPages(sourcePdf, keepPages)
      copied.forEach(page => newPdf.addPage(page))

      const newBytes = await newPdf.save()
      const blob = new Blob([newBytes as unknown as ArrayBuffer], { type: "application/pdf" })
      setResultUrl(URL.createObjectURL(blob))
    } catch (e: any) {
      setError("Failed: " + e.message)
    }
    setProcessing(false)
  }

  const handleDownload = () => {
    if (!resultUrl) return
    const link = document.createElement("a")
    link.download = `deleted-pages-${file?.name || "pdf"}`
    link.href = resultUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF Page Deleter" description="Remove specific pages from PDF files. Perfect for deleting blank pages, ads or unwanted content. 100% private processing." keywords="pdf page deleter, free online tool, pdf-page-deleter, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF Page Deleter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF Page <span className="gradient-text">Deleter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Remove specific pages from PDF files. Perfect for deleting blank pages, 
            ads or unwanted content. 100% private processing.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Trash2 className="w-5 h-5 text-red-400" />
            <span>Upload and Delete Pages</span>
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
                <label className="text-sm text-theme-muted mb-2 block">Pages to Delete (e.g., 1,3,5-8)</label>
                <input type="text" value={pagesToDelete} onChange={(e) => setPagesToDelete(e.target.value)}
                  className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary font-mono focus:outline-none focus:border-red-500"
                  placeholder="2,5,8-10" />
                <div className="text-xs text-theme-muted mt-1">
                  Available pages: 1-{pageCount}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button onClick={deletePages} disabled={processing}
                className="w-full mb-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : "Delete Pages"}
              </button>

              {resultUrl && (
                <button onClick={handleDownload}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Updated PDF
                </button>
              )}
            </>
          )}
        </div>

        <SEOSections toolSlug="pdf-page-deleter" toolName="PDF Page Deleter" category="PDF" />
      </div>
    </div>
  )
}
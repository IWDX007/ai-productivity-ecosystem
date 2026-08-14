"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, FileText, ArrowUp, ArrowDown, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function PdfPageReorderPage() {
  const [file, setFile] = useState<File | null>(null)
  const [pageOrder, setPageOrder] = useState<number[]>([])
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
    const count = pdf.getPageCount()
    setPageOrder(Array.from({ length: count }, (_, i) => i + 1))
  }

  const movePage = (idx: number, direction: "up" | "down") => {
    const newOrder = [...pageOrder]
    if (direction === "up" && idx > 0) {
      [newOrder[idx], newOrder[idx - 1]] = [newOrder[idx - 1], newOrder[idx]]
    } else if (direction === "down" && idx < newOrder.length - 1) {
      [newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]]
    }
    setPageOrder(newOrder)
  }

  const reorderPages = async () => {
    if (!file) return
    setProcessing(true)
    try {
      const { PDFDocument } = await import("pdf-lib")
      const bytes = await file.arrayBuffer()
      const sourcePdf = await PDFDocument.load(bytes)
      const newPdf = await PDFDocument.create()

      const indices = pageOrder.map(p => p - 1)
      const copied = await newPdf.copyPages(sourcePdf, indices)
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
    link.download = `reordered-${file?.name || "pdf"}`
    link.href = resultUrl
    link.click()
  }

  const reverseOrder = () => {
    setPageOrder([...pageOrder].reverse())
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF Page Reorder" description="Rearrange PDF pages in any order. Move pages up or down, reverse order, or reorganize entire document structure." keywords="pdf page reorder, free online tool, pdf-page-reorder, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF Page Reorder" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF Page <span className="gradient-text">Reorder</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Rearrange PDF pages in any order. Move pages up or down, reverse 
            order, or reorganize entire document structure.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <FileText className="w-5 h-5 text-red-400" />
            <span>Upload and Reorder</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PDF file</span>
          </button>

          {file && pageOrder.length > 0 && (
            <>
              <div className="mb-4 p-3 rounded-lg bg-theme-secondary border border-theme">
                <div className="text-theme-primary text-sm">{file.name}</div>
                <div className="text-theme-muted text-xs">Total pages: {pageOrder.length}</div>
              </div>

              <div className="flex gap-2 mb-4">
                <button onClick={reverseOrder}
                  className="flex-1 py-2 bg-theme-secondary border border-theme hover:border-red-500/30 rounded-lg text-theme-primary transition text-sm">
                  Reverse All Order
                </button>
                <button onClick={() => setPageOrder(Array.from({ length: pageOrder.length }, (_, i) => i + 1))}
                  className="flex-1 py-2 bg-theme-secondary border border-theme hover:border-red-500/30 rounded-lg text-theme-primary transition text-sm">
                  Reset to Original
                </button>
              </div>

              <div className="mb-4 max-h-96 overflow-y-auto space-y-2">
                {pageOrder.map((pageNum, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-theme-secondary border border-theme">
                    <span className="text-xs text-theme-muted w-8">#{idx + 1}</span>
                    <div className="flex-1 text-theme-primary text-sm">Page {pageNum}</div>
                    <button onClick={() => movePage(idx, "up")} disabled={idx === 0}
                      className="p-1 text-theme-muted hover:text-red-400 disabled:opacity-30">
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button onClick={() => movePage(idx, "down")} disabled={idx === pageOrder.length - 1}
                      className="p-1 text-theme-muted hover:text-red-400 disabled:opacity-30">
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={reorderPages} disabled={processing}
                className="w-full mb-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : "Apply New Order"}
              </button>

              {resultUrl && (
                <button onClick={handleDownload}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Reordered PDF
                </button>
              )}
            </>
          )}
        </div>
</div>
    </div>
  )
}
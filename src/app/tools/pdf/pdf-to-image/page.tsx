"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef, useEffect } from "react"
import { Upload, Download, Image as ImageIcon, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function PdfToImagePage() {
  const [file, setFile] = useState<File | null>(null)
  const [pages, setPages] = useState<string[]>([])
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Preload pdfjs
    if (typeof window !== "undefined") {
      import("pdfjs-dist/legacy/build/pdf.mjs").then((pdfjs) => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`
      }).catch(() => {})
    }
  }, [])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded || uploaded.type !== "application/pdf") return
    setFile(uploaded)
    setPages([])
    setError("")
    convert(uploaded)
  }

  const convert = async (pdfFile: File) => {
    setProcessing(true)
    try {
      const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs")
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
      const newPages: string[] = []

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement("canvas")
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext("2d")
        if (ctx) {
          await page.render({ canvas, canvasContext: ctx, viewport }).promise
          newPages.push(canvas.toDataURL("image/png"))
        }
      }
      setPages(newPages)
    } catch (e: any) {
      setError("Failed to convert: " + e.message)
    }
    setProcessing(false)
  }

  const downloadPage = (url: string, idx: number) => {
    const link = document.createElement("a")
    link.download = `page-${idx + 1}.png`
    link.href = url
    link.click()
  }

  const downloadAll = () => {
    pages.forEach((url, idx) => setTimeout(() => downloadPage(url, idx), idx * 300))
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF to Image" description="Convert PDF pages to high-quality PNG images. Download individual pages or all at once. 100% private processing." keywords="pdf to image, free online tool, pdf-to-image, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF to Image" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF to <span className="gradient-text">Image</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert PDF pages to high-quality PNG images. Download individual pages 
            or all at once. 100% private processing.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <ImageIcon className="w-5 h-5 text-red-400" />
            <span>Upload PDF</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PDF file</span>
          </button>

          {processing && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-red-400 animate-spin mx-auto mb-3" />
              <div className="text-theme-muted">Converting PDF pages to images...</div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {pages.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-theme-muted">Generated {pages.length} images</div>
                <button onClick={downloadAll} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm">
                  Download All
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {pages.map((url, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-theme-secondary border border-theme">
                    <img src={url} alt={`Page ${idx + 1}`} className="w-full rounded mb-2" />
                    <button onClick={() => downloadPage(url, idx)}
                      className="w-full py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center gap-1">
                      <Download className="w-3 h-3" /> Page {idx + 1}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <SEOSections toolSlug="pdf-to-image" toolName="PDF to Image" category="PDF" />
      </div>
    </div>
  )
}
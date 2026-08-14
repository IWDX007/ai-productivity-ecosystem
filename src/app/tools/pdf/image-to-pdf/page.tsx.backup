"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, FileText, X, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function ImageToPdfPage() {
  const [images, setImages] = useState<Array<{ file: File; url: string }>>([])
  const [processing, setProcessing] = useState(false)
  const [pdfUrl, setPdfUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages = files.map(file => ({ file, url: URL.createObjectURL(file) }))
    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx))
  }

  const convert = async () => {
    if (images.length === 0) return
    setProcessing(true)
    try {
      const { PDFDocument } = await import("pdf-lib")
      const pdf = await PDFDocument.create()

      for (const img of images) {
        const bytes = await img.file.arrayBuffer()
        let image
        if (img.file.type === "image/png") {
          image = await pdf.embedPng(bytes)
        } else {
          image = await pdf.embedJpg(bytes)
        }
        const page = pdf.addPage([image.width, image.height])
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height })
      }

      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes as unknown as ArrayBuffer], { type: "application/pdf" })
      setPdfUrl(URL.createObjectURL(blob))
    } catch (e) {
      console.error(e)
    }
    setProcessing(false)
  }

  const handleDownload = () => {
    if (!pdfUrl) return
    const link = document.createElement("a")
    link.download = "images.pdf"
    link.href = pdfUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image to PDF" description="Convert JPG or PNG images to a single PDF file. Combine multiple images into one document for easy sharing." keywords="image to pdf, free online tool, image-to-pdf, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "Image to PDF" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image to <span className="gradient-text">PDF</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert JPG or PNG images to a single PDF file. Combine multiple 
            images into one document for easy sharing.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <FileText className="w-5 h-5 text-red-400" />
            <span>Upload Images</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" multiple onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload JPG or PNG images</span>
          </button>

          {images.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {images.map((img, idx) => (
                  <div key={idx} className="relative p-2 rounded-lg bg-theme-secondary border border-theme">
                    <img src={img.url} alt="" className="w-full h-24 object-cover rounded" />
                    <div className="text-xs text-theme-muted mt-1 truncate">{img.file.name}</div>
                    <button onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full">
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute top-1 left-1 px-2 py-0.5 bg-black/50 text-white text-xs rounded">
                      {idx + 1}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={convert} disabled={processing}
                className="w-full mb-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Converting...</> : `Create PDF from ${images.length} images`}
              </button>

              {pdfUrl && (
                <button onClick={handleDownload}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download PDF
                </button>
              )}
            </>
          )}
        </div>

        <SEOSections toolSlug="image-to-pdf" toolName="Image to PDF" category="PDF" />
      </div>
    </div>
  )
}
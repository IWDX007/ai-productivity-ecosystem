"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, RotateCw, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function PdfRotatorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [angle, setAngle] = useState<90 | 180 | 270>(90)
  const [rotating, setRotating] = useState(false)
  const [rotatedUrl, setRotatedUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded || uploaded.type !== "application/pdf") return
    setFile(uploaded)
    setRotatedUrl("")
  }

  const rotate = async () => {
    if (!file) return
    setRotating(true)
    try {
      const { PDFDocument, degrees } = await import("pdf-lib")
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)

      const pages = pdf.getPages()
      pages.forEach(page => {
        const currentRotation = page.getRotation().angle
        page.setRotation(degrees((currentRotation + angle) % 360))
      })

      const newBytes = await pdf.save()
      const blob = new Blob([newBytes as unknown as ArrayBuffer], { type: "application/pdf" })
      setRotatedUrl(URL.createObjectURL(blob))
    } catch (e) {
      console.error(e)
    }
    setRotating(false)
  }

  const handleDownload = () => {
    if (!rotatedUrl) return
    const link = document.createElement("a")
    link.download = `rotated-${angle}deg-${file?.name || "pdf"}`
    link.href = rotatedUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF Rotator" description="Rotate all pages in a PDF file by 90, 180 or 270 degrees. Perfect for fixing scanned document orientation." keywords="pdf rotator, free online tool, pdf-rotator, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF Rotator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF <span className="gradient-text">Rotator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Rotate all pages in a PDF file by 90, 180 or 270 degrees. 
            Perfect for fixing scanned document orientation.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <RotateCw className="w-5 h-5 text-red-400" />
            <span>Upload and Rotate</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PDF file</span>
          </button>

          {file && (
            <>
              <div className="mb-4 p-3 rounded-lg bg-theme-secondary border border-theme text-sm text-theme-primary">
                {file.name}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {[90, 180, 270].map(deg => (
                  <button key={deg} onClick={() => setAngle(deg as any)}
                    className={`py-3 rounded-lg transition font-semibold ${angle === deg ? "bg-red-500 text-white" : "bg-theme-secondary text-theme-primary border border-theme hover:border-red-500/30"}`}>
                    {deg}Â°
                  </button>
                ))}
              </div>

              <button onClick={rotate} disabled={rotating}
                className="w-full mb-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                {rotating ? <><Loader2 className="w-5 h-5 animate-spin" /> Rotating...</> : `Rotate All Pages ${angle}Â°`}
              </button>

              {rotatedUrl && (
                <button onClick={handleDownload}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Rotated PDF
                </button>
              )}
            </>
          )}
        </div>

        <SEOSections toolSlug="pdf-rotator" toolName="PDF Rotator" category="PDF" />
      </div>
    </div>
  )
}
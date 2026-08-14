"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Type, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function PdfWatermarkPage() {
  const [file, setFile] = useState<File | null>(null)
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL")
  const [fontSize, setFontSize] = useState(50)
  const [opacity, setOpacity] = useState(0.3)
  const [rotation, setRotation] = useState(45)
  const [processing, setProcessing] = useState(false)
  const [resultUrl, setResultUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded || uploaded.type !== "application/pdf") return
    setFile(uploaded)
    setResultUrl("")
  }

  const addWatermark = async () => {
    if (!file || !watermarkText) return
    setProcessing(true)
    try {
      const { PDFDocument, rgb, degrees, StandardFonts } = await import("pdf-lib")
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)
      const font = await pdf.embedFont(StandardFonts.HelveticaBold)

      const pages = pdf.getPages()
      pages.forEach(page => {
        const { width, height } = page.getSize()
        page.drawText(watermarkText, {
          x: width / 2 - (watermarkText.length * fontSize / 4),
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: opacity,
          rotate: degrees(rotation),
        })
      })

      const newBytes = await pdf.save()
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
    link.download = `watermarked-${file?.name || "pdf"}`
    link.href = resultUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF Watermark" description="Add text watermark to all pages of your PDF. Customize size, opacity and rotation for perfect branding or confidentiality marking." keywords="pdf watermark, free online tool, pdf-watermark, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF Watermark" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF <span className="gradient-text">Watermark</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Add text watermark to all pages of your PDF. Customize size, opacity 
            and rotation for perfect branding or confidentiality marking.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Type className="w-5 h-5 text-red-400" />
            <span>Watermark Settings</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PDF file</span>
          </button>

          {file && (
            <>
              <div className="mb-4">
                <label className="text-sm text-theme-muted mb-2 block">Watermark Text</label>
                <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)}
                  className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-xs text-theme-muted mb-1 block">Size: {fontSize}px</label>
                  <input type="range" min="20" max="150" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-red-500" />
                </div>
                <div>
                  <label className="text-xs text-theme-muted mb-1 block">Opacity: {Math.round(opacity * 100)}%</label>
                  <input type="range" min="10" max="100" value={opacity * 100} onChange={(e) => setOpacity(parseInt(e.target.value) / 100)}
                    className="w-full accent-red-500" />
                </div>
                <div>
                  <label className="text-xs text-theme-muted mb-1 block">Rotation: {rotation}Ãƒâ€šÃ‚Â°</label>
                  <input type="range" min="0" max="360" value={rotation} onChange={(e) => setRotation(parseInt(e.target.value))}
                    className="w-full accent-red-500" />
                </div>
              </div>

              <button onClick={addWatermark} disabled={processing}
                className="w-full mb-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Adding...</> : "Add Watermark"}
              </button>

              {resultUrl && (
                <button onClick={handleDownload}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Watermarked PDF
                </button>
              )}
            </>
          )}
        </div>
</div>
    </div>
  )
}
"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Square } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function ImageBorderPage() {
  const [imageUrl, setImageUrl] = useState("")
  const [borderWidth, setBorderWidth] = useState(20)
  const [borderColor, setBorderColor] = useState("#000000")
  const [resultUrl, setResultUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUrl(URL.createObjectURL(file))
    applyBorder(URL.createObjectURL(file))
  }

  const applyBorder = (url: string = imageUrl) => {
    if (!url) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width + borderWidth * 2
      canvas.height = img.height + borderWidth * 2
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = borderColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, borderWidth, borderWidth)
        setResultUrl(canvas.toDataURL("image/png"))
      }
    }
    img.src = url
  }

  const handleDownload = () => {
    if (!resultUrl) return
    const link = document.createElement("a")
    link.download = "bordered.png"
    link.href = resultUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Border" description="Add colored borders to your images. Customize width and color for perfect framing effect." keywords="image border, free online tool, image-border, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Border" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image <span className="gradient-text">Border</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Add colored borders to your images. Customize width and color 
            for perfect framing effect.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Square className="w-5 h-5 text-blue-400" />
            <span>Border Settings</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          {imageUrl && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Border Width: {borderWidth}px</label>
                  <input type="range" min="1" max="100" value={borderWidth} onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                    className="w-full accent-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Border Color</label>
                  <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer" />
                </div>
              </div>

              <button onClick={() => applyBorder()} className="w-full mb-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
                Apply Border
              </button>

              {resultUrl && (
                <>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-4">
                    <img src={resultUrl} alt="Bordered" className="w-full max-h-96 object-contain rounded" />
                  </div>
                  <button onClick={handleDownload}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download Bordered Image
                  </button>
                </>
              )}
            </>
          )}
        </div>

        <SEOSections toolSlug="image-border" toolName="Image Border" category="Image" />
      </div>
    </div>
  )
}
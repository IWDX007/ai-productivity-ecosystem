"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Circle } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function ImageBlurToolPage() {
  const [imageUrl, setImageUrl] = useState("")
  const [blur, setBlur] = useState(5)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUrl(URL.createObjectURL(file))
  }

  const handleDownload = () => {
    if (!imageUrl) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.filter = `blur(${blur}px)`
        ctx.drawImage(img, 0, 0)
        const link = document.createElement("a")
        link.download = `blurred-${blur}px.png`
        link.href = canvas.toDataURL("image/png")
        link.click()
      }
    }
    img.src = imageUrl
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Blur Tool" description="Apply adjustable blur effect to any image. Perfect for backgrounds, privacy protection, or artistic effects." keywords="image blur tool, free online tool, image-blur-tool, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Blur Tool" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image <span className="gradient-text">Blur Tool</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Apply adjustable blur effect to any image. Perfect for backgrounds, 
            privacy protection, or artistic effects.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Circle className="w-5 h-5 text-blue-400" />
            <span>Blur Settings</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          {imageUrl && (
            <>
              <div className="mb-6">
                <label className="text-sm text-theme-muted mb-2 block">Blur Amount: {blur}px</label>
                <input type="range" min="0" max="50" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))}
                  className="w-full accent-blue-500" />
              </div>

              <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <img src={imageUrl} alt="Blurred" style={{ filter: `blur(${blur}px)` }} className="w-full max-h-96 object-contain rounded" />
              </div>

              <button onClick={handleDownload}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download Blurred Image
              </button>
            </>
          )}
        </div>

        <SEOSections toolSlug="image-blur-tool" toolName="Image Blur Tool" category="Image" />
      </div>
    </div>
  )
}
"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Sun, RotateCcw } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface ImageBrightnessContrastPageProps {
  name?: string;
  description?: string;
}

export default function ImageBrightnessContrastPage({ name, description }: ImageBrightnessContrastPageProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUrl(URL.createObjectURL(file))
  }

  const filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`

  const handleReset = () => { setBrightness(100); setContrast(100); setSaturation(100) }

  const handleDownload = () => {
    if (!imageUrl) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.filter = filter
        ctx.drawImage(img, 0, 0)
        const link = document.createElement("a")
        link.download = "adjusted.png"
        link.href = canvas.toDataURL("image/png")
        link.click()
      }
    }
    img.src = imageUrl
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Brightness & Contrast" description="Adjust image brightness, contrast and saturation. Perfect for fixing dark photos and enhancing colors." keywords="brightness & contrast, free online tool, image-brightness-contrast, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Brightness Contrast" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Brightness & <span className="gradient-text">Contrast</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Adjust image brightness, contrast and saturation. Perfect for 
            fixing dark photos and enhancing colors.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Sun className="w-5 h-5 text-blue-400" />
              <span>Adjustments</span>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          {imageUrl && (
            <>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Brightness: {brightness}%</label>
                  <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full accent-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Contrast: {contrast}%</label>
                  <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full accent-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Saturation: {saturation}%</label>
                  <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(parseInt(e.target.value))}
                    className="w-full accent-blue-500" />
                </div>
              </div>

              <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <img src={imageUrl} alt="Adjusted" style={{ filter }} className="w-full max-h-96 object-contain rounded" />
              </div>

              <button onClick={handleDownload}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download Adjusted Image
              </button>
            </>
          )}
        </div>
</div>
    </div>
  )
}
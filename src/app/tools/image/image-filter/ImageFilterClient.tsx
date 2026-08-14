"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Sparkles } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
const FILTERS = [
  { name: "Original", filter: "none" },
  { name: "Grayscale", filter: "grayscale(100%)" },
  { name: "Sepia", filter: "sepia(100%)" },
  { name: "Invert", filter: "invert(100%)" },
  { name: "Blur", filter: "blur(5px)" },
  { name: "Brightness", filter: "brightness(150%)" },
  { name: "Contrast", filter: "contrast(200%)" },
  { name: "Saturate", filter: "saturate(200%)" },
  { name: "Vintage", filter: "sepia(50%) contrast(120%) brightness(90%)" },
  { name: "Cool", filter: "hue-rotate(180deg) saturate(150%)" },
  { name: "Warm", filter: "hue-rotate(-30deg) saturate(120%)" },
  { name: "Dramatic", filter: "contrast(150%) saturate(150%) brightness(90%)" },
]

export default function ImageFilterPage() {
  const [imageUrl, setImageUrl] = useState("")
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUrl(URL.createObjectURL(file))
  }

  const handleDownload = () => {
    if (!imageUrl) return
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.filter = selectedFilter.filter
        ctx.drawImage(img, 0, 0)
        const link = document.createElement("a")
        link.download = `filtered-${selectedFilter.name.toLowerCase()}.png`
        link.href = canvas.toDataURL("image/png")
        link.click()
      }
    }
    img.src = imageUrl
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Filter" description="Apply beautiful filters to your images. Grayscale, Sepia, Blur, Vintage and more Instagram-style effects." keywords="image filter, free online tool, image-filter, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Filter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image <span className="gradient-text">Filter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Apply beautiful filters to your images. Grayscale, Sepia, Blur, 
            Vintage and more Instagram-style effects.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span>Choose Filter</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          {imageUrl && (
            <>
              <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="text-sm text-blue-400 mb-2">Preview ({selectedFilter.name}):</div>
                <img src={imageUrl} alt="Filtered" style={{ filter: selectedFilter.filter }} className="w-full max-h-96 object-contain rounded" />
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-6">
                {FILTERS.map(f => (
                  <button key={f.name} onClick={() => setSelectedFilter(f)}
                    className={`p-2 rounded-lg transition text-sm ${selectedFilter.name === f.name ? "bg-blue-500 text-white" : "bg-theme-secondary text-theme-primary border border-theme hover:border-blue-500/30"}`}>
                    <div className="w-full h-16 bg-theme-primary rounded mb-2 overflow-hidden">
                      <img src={imageUrl} alt={f.name} style={{ filter: f.filter }} className="w-full h-full object-cover" />
                    </div>
                    {f.name}
                  </button>
                ))}
              </div>

              <button onClick={handleDownload}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download Filtered Image
              </button>
            </>
          )}
        </div>
</div>
    </div>
  )
}
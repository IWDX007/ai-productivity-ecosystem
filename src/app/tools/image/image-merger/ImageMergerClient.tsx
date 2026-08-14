"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Layers, X } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function ImageMergerPage() {
  const [images, setImages] = useState<Array<{ file: File; url: string }>>([])
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal")
  const [gap, setGap] = useState(10)
  const [bgColor, setBgColor] = useState("#ffffff")
  const [mergedUrl, setMergedUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages = files.map(file => ({ file, url: URL.createObjectURL(file) }))
    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx))
  }

  const merge = async () => {
    if (images.length < 2) return

    const loadedImages = await Promise.all(images.map(({ url }) => new Promise<HTMLImageElement>((resolve) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.src = url
    })))

    const canvas = document.createElement("canvas")
    if (direction === "horizontal") {
      const totalWidth = loadedImages.reduce((sum, img) => sum + img.width, 0) + gap * (loadedImages.length - 1)
      const maxHeight = Math.max(...loadedImages.map(img => img.height))
      canvas.width = totalWidth
      canvas.height = maxHeight
    } else {
      const maxWidth = Math.max(...loadedImages.map(img => img.width))
      const totalHeight = loadedImages.reduce((sum, img) => sum + img.height, 0) + gap * (loadedImages.length - 1)
      canvas.width = maxWidth
      canvas.height = totalHeight
    }

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      let offset = 0
      loadedImages.forEach(img => {
        if (direction === "horizontal") {
          ctx.drawImage(img, offset, 0)
          offset += img.width + gap
        } else {
          ctx.drawImage(img, 0, offset)
          offset += img.height + gap
        }
      })
      setMergedUrl(canvas.toDataURL("image/png"))
    }
  }

  const handleDownload = () => {
    if (!mergedUrl) return
    const link = document.createElement("a")
    link.download = "merged.png"
    link.href = mergedUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Merger" description="Combine multiple images into one. Merge horizontally or vertically with adjustable spacing. Perfect for collages and comparisons." keywords="image merger, free online tool, image-merger, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Merger" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image <span className="gradient-text">Merger</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Combine multiple images into one. Merge horizontally or vertically 
            with adjustable spacing. Perfect for collages and comparisons.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Layers className="w-5 h-5 text-blue-400" />
            <span>Upload Images (min 2)</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload multiple images</span>
          </button>

          {images.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {images.map((img, idx) => (
                  <div key={idx} className="relative p-2 rounded-lg bg-theme-secondary border border-theme">
                    <img src={img.url} alt="" className="w-full h-24 object-cover rounded" />
                    <button onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Direction</label>
                  <select value={direction} onChange={(e) => setDirection(e.target.value as any)}
                    className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary">
                    <option value="horizontal">Horizontal (side by side)</option>
                    <option value="vertical">Vertical (stacked)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Gap: {gap}px</label>
                  <input type="range" min="0" max="100" value={gap} onChange={(e) => setGap(parseInt(e.target.value))}
                    className="w-full accent-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Background</label>
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer" />
                </div>
              </div>

              <button onClick={merge} disabled={images.length < 2}
                className="w-full mb-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold rounded-lg">
                Merge {images.length} Images
              </button>

              {mergedUrl && (
                <>
                  <div className="mb-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <img src={mergedUrl} alt="Merged" className="w-full max-h-96 object-contain rounded" />
                  </div>
                  <button onClick={handleDownload}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download Merged Image
                  </button>
                </>
              )}
            </>
          )}
        </div>
</div>
    </div>
  )
}
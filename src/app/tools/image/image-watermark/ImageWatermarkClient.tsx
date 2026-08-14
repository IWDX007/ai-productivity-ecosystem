"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Type, Image as ImageIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface ImageWatermarkPageProps {
  name?: string;
  description?: string;
}

export default function ImageWatermarkPage({ name, description }: ImageWatermarkPageProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [watermarkText, setWatermarkText] = useState("Ãƒâ€šÃ‚Â© YourBrand")
  const [fontSize, setFontSize] = useState(48)
  const [opacity, setOpacity] = useState(0.5)
  const [color, setColor] = useState("#ffffff")
  const [position, setPosition] = useState<"tl" | "tr" | "bl" | "br" | "center">("br")
  const [resultUrl, setResultUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    applyWatermark(file)
  }

  const applyWatermark = (file: File = originalFile!) => {
    if (!file) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        ctx.font = `bold ${fontSize}px Arial`
        ctx.fillStyle = color
        ctx.globalAlpha = opacity
        ctx.strokeStyle = "rgba(0,0,0,0.5)"
        ctx.lineWidth = 2

        const metrics = ctx.measureText(watermarkText)
        let x = 20, y = fontSize + 20
        if (position === "tr") { x = canvas.width - metrics.width - 20 }
        if (position === "bl") { y = canvas.height - 20 }
        if (position === "br") { x = canvas.width - metrics.width - 20; y = canvas.height - 20 }
        if (position === "center") { x = (canvas.width - metrics.width) / 2; y = canvas.height / 2 }

        ctx.strokeText(watermarkText, x, y)
        ctx.fillText(watermarkText, x, y)
        setResultUrl(canvas.toDataURL("image/png"))
      }
    }
    img.src = URL.createObjectURL(file)
  }

  const handleDownload = () => {
    if (!resultUrl) return
    const link = document.createElement("a")
    link.download = "watermarked.png"
    link.href = resultUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Watermark" description="Add text watermark to your images. Protect your photos with customizable position, color, size and opacity." keywords="image watermark, free online tool, image-watermark, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Watermark" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image <span className="gradient-text">Watermark</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Add text watermark to your images. Protect your photos with 
            customizable position, color, size and opacity.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Type className="w-5 h-5 text-blue-400" />
            <span>Watermark Settings</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          {originalFile && (
            <>
              <div className="mb-4">
                <label className="text-sm text-theme-muted mb-2 block">Watermark Text</label>
                <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)}
                  className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div>
                  <label className="text-xs text-theme-muted mb-1 block">Font Size: {fontSize}px</label>
                  <input type="range" min="16" max="200" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-theme-muted mb-1 block">Opacity: {Math.round(opacity * 100)}%</label>
                  <input type="range" min="10" max="100" value={opacity * 100} onChange={(e) => setOpacity(parseInt(e.target.value) / 100)}
                    className="w-full accent-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-theme-muted mb-1 block">Color</label>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs text-theme-muted mb-1 block">Position</label>
                  <select value={position} onChange={(e) => setPosition(e.target.value as any)}
                    className="w-full px-2 py-2 bg-theme-secondary border border-theme rounded text-theme-primary text-sm">
                    <option value="tl">Top Left</option>
                    <option value="tr">Top Right</option>
                    <option value="bl">Bottom Left</option>
                    <option value="br">Bottom Right</option>
                    <option value="center">Center</option>
                  </select>
                </div>
              </div>

              <button onClick={() => applyWatermark()} className="w-full mb-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
                Apply Watermark
              </button>

              {resultUrl && (
                <>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-4">
                    <img src={resultUrl} alt="Watermarked" className="w-full max-h-96 object-contain rounded" />
                  </div>
                  <button onClick={handleDownload}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download Watermarked Image
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
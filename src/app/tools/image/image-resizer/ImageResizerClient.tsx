"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Image as ImageIcon, Link2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function ImageResizerPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState("")
  const [resizedUrl, setResizedUrl] = useState("")
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [originalWidth, setOriginalWidth] = useState(0)
  const [originalHeight, setOriginalHeight] = useState(0)
  const [keepAspect, setKeepAspect] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    setOriginalUrl(URL.createObjectURL(file))
    const img = new Image()
    img.onload = () => {
      setOriginalWidth(img.width)
      setOriginalHeight(img.height)
      setWidth(img.width)
      setHeight(img.height)
    }
    img.src = URL.createObjectURL(file)
  }

  const resize = () => {
    if (!originalFile) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height)
        setResizedUrl(canvas.toDataURL("image/png"))
      }
    }
    img.src = URL.createObjectURL(originalFile)
  }

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth)
    if (keepAspect && originalWidth > 0) {
      setHeight(Math.round((newWidth / originalWidth) * originalHeight))
    }
  }

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight)
    if (keepAspect && originalHeight > 0) {
      setWidth(Math.round((newHeight / originalHeight) * originalWidth))
    }
  }

  const handleDownload = () => {
    if (!resizedUrl) return
    const link = document.createElement("a")
    link.download = `resized-${width}x${height}.png`
    link.href = resizedUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Resizer" description="Resize images to any dimensions. Maintain aspect ratio option. 100% private - all processing in your browser." keywords="image resizer, free online tool, image-resizer, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Resizer" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image <span className="gradient-text">Resizer</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Resize images to any dimensions. Maintain aspect ratio option. 
            100% private - all processing in your browser.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <ImageIcon className="w-5 h-5 text-blue-400" />
            <span>Upload Image</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          {originalFile && (
            <>
              <div className="text-sm text-theme-muted mb-3">Original: {originalWidth} x {originalHeight}px</div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Width</label>
                  <input type="number" value={width} onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Height</label>
                  <input type="number" value={height} onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-theme-secondary border border-theme cursor-pointer w-full">
                    <input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)}
                      className="w-4 h-4 accent-blue-500" />
                    <Link2 className="w-4 h-4" />
                    <span className="text-theme-primary text-sm">Lock Ratio</span>
                  </label>
                </div>
              </div>

              <button onClick={resize} className="w-full mb-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
                Resize Image
              </button>

              {resizedUrl && (
                <>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-4">
                    <div className="text-sm text-blue-400 mb-2">Resized: {width} x {height}px</div>
                    <img src={resizedUrl} alt="Resized" className="w-full h-64 object-contain rounded" />
                  </div>

                  <button onClick={handleDownload}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download Resized Image
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
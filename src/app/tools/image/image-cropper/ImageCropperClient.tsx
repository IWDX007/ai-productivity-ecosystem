"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Crop, Image as ImageIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function ImageCropperPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState("")
  const [croppedUrl, setCroppedUrl] = useState("")
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [cropWidth, setCropWidth] = useState(300)
  const [cropHeight, setCropHeight] = useState(300)
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    setOriginalUrl(URL.createObjectURL(file))
    const img = new Image()
    img.onload = () => {
      setImgWidth(img.width)
      setImgHeight(img.height)
      setCropWidth(Math.min(300, img.width))
      setCropHeight(Math.min(300, img.height))
    }
    img.src = URL.createObjectURL(file)
  }

  const crop = () => {
    if (!originalFile) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = cropWidth
      canvas.height = cropHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(img, x, y, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)
        setCroppedUrl(canvas.toDataURL("image/png"))
      }
    }
    img.src = URL.createObjectURL(originalFile)
  }

  const handleDownload = () => {
    if (!croppedUrl) return
    const link = document.createElement("a")
    link.download = "cropped.png"
    link.href = croppedUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Cropper" description="Crop images to specific coordinates and dimensions. Perfect for profile pictures, thumbnails and precise image editing." keywords="image cropper, free online tool, image-cropper, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Cropper" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image <span className="gradient-text">Cropper</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Crop images to specific coordinates and dimensions. Perfect for 
            profile pictures, thumbnails and precise image editing.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Crop className="w-5 h-5 text-blue-400" />
            <span>Upload and Crop</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          {originalFile && (
            <>
              <div className="text-sm text-theme-muted mb-3">Original: {imgWidth} x {imgHeight}px</div>

              {originalUrl && <img src={originalUrl} alt="Original" className="w-full h-64 object-contain rounded mb-4" />}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div>
                  <label className="text-xs text-theme-muted mb-1 block">X Position</label>
                  <input type="number" value={x} onChange={(e) => setX(parseInt(e.target.value) || 0)} max={imgWidth}
                    className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-theme-muted mb-1 block">Y Position</label>
                  <input type="number" value={y} onChange={(e) => setY(parseInt(e.target.value) || 0)} max={imgHeight}
                    className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-theme-muted mb-1 block">Width</label>
                  <input type="number" value={cropWidth} onChange={(e) => setCropWidth(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-theme-muted mb-1 block">Height</label>
                  <input type="number" value={cropHeight} onChange={(e) => setCropHeight(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <button onClick={crop} className="w-full mb-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
                Crop Image
              </button>

              {croppedUrl && (
                <>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-4">
                    <div className="text-sm text-blue-400 mb-2">Cropped Result:</div>
                    <img src={croppedUrl} alt="Cropped" className="w-full max-h-64 object-contain rounded" />
                  </div>

                  <button onClick={handleDownload}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download Cropped Image
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
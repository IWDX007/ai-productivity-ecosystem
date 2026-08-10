"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Image as ImageIcon, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function ImageCompressorPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState("")
  const [compressedUrl, setCompressedUrl] = useState("")
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState<"jpeg" | "webp" | "png">("jpeg")
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    setOriginalSize(file.size)
    setOriginalUrl(URL.createObjectURL(file))
    await compressImage(file, quality, format)
  }

  const compressImage = async (file: File, q: number, fmt: string) => {
    setLoading(true)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const mimeType = `image/${fmt}`
        const dataUrl = canvas.toDataURL(mimeType, q / 100)
        setCompressedUrl(dataUrl)
        // Calculate size
        const base64Length = dataUrl.split(",")[1].length
        setCompressedSize(Math.round(base64Length * 0.75))
      }
      setLoading(false)
    }
    img.src = URL.createObjectURL(file)
  }

  const recompress = () => {
    if (originalFile) compressImage(originalFile, quality, format)
  }

  const handleDownload = () => {
    if (!compressedUrl) return
    const link = document.createElement("a")
    link.download = `compressed.${format}`
    link.href = compressedUrl
    link.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(2)} MB`
  }

  const savings = originalSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Compressor" description="Compress JPG, PNG or WebP images to reduce file size. Adjustable quality, instant preview, 100% private - runs in your browser." keywords="image compressor, free online tool, image-compressor, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Compressor" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image <span className="gradient-text">Compressor</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Compress JPG, PNG or WebP images to reduce file size. Adjustable quality, 
            instant preview, 100% private - runs in your browser.
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
            <span>Click to upload image (JPG, PNG, WebP)</span>
          </button>

          {originalFile && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Quality: {quality}%</label>
                  <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full accent-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Format</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value as any)}
                    className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500">
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WebP</option>
                    <option value="png">PNG</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button onClick={recompress}
                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
                    Apply Changes
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-theme-secondary border border-theme">
                  <div className="text-sm text-theme-muted mb-2">Original</div>
                  {originalUrl && <img src={originalUrl} alt="Original" className="w-full h-48 object-contain rounded mb-2" />}
                  <div className="text-theme-primary font-semibold">{formatSize(originalSize)}</div>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="text-sm text-blue-400 mb-2">Compressed</div>
                  {loading ? (
                    <div className="w-full h-48 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    </div>
                  ) : (
                    compressedUrl && <img src={compressedUrl} alt="Compressed" className="w-full h-48 object-contain rounded mb-2" />
                  )}
                  <div className="text-blue-400 font-semibold">
                    {formatSize(compressedSize)}
                    {savings > 0 && <span className="text-green-400 ml-2 text-sm">({savings}% smaller)</span>}
                  </div>
                </div>
              </div>

              <button onClick={handleDownload}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download Compressed Image
              </button>
            </>
          )}
        </div>

        <SEOSections toolSlug="image-compressor" toolName="Image Compressor" category="Image" />
      </div>
    </div>
  )
}
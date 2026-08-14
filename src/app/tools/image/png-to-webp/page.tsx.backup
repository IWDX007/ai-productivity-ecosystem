"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, ArrowRight, Image as ImageIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function Page() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [convertedUrl, setConvertedUrl] = useState("")
  const [quality, setQuality] = useState(90)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    convert(file)
  }

  const convert = (file: File) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Add white background for JPG (no transparency)
        
        ctx.drawImage(img, 0, 0)
        setConvertedUrl(canvas.toDataURL("image/webp", quality / 100))
      }
    }
    img.src = URL.createObjectURL(file)
  }

  const handleDownload = () => {
    if (!convertedUrl) return
    const link = document.createElement("a")
    link.download = `converted.webp`
    link.href = convertedUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PNG to WEBP" description="Convert PNG images to modern WebP format. 25-35% smaller file size with same quality. Perfect for websites." keywords="png to webp, free online tool, png-to-webp, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "PNG to WebP Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PNG to <span className="gradient-text">WEBP</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert PNG images to modern WebP format. 25-35% smaller file size with same quality. Perfect for websites.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <ImageIcon className="w-5 h-5 text-blue-400" />
            <span>Upload PNG Image</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PNG image</span>
          </button>

          {originalFile && (
            <>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="px-4 py-2 bg-theme-secondary rounded-lg text-theme-primary">PNG</div>
                <ArrowRight className="w-6 h-6 text-blue-400" />
                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">WEBP</div>
              </div>

              {true && (
                <div className="mb-6">
                  <label className="text-sm text-theme-muted mb-2 block">Quality: {quality}%</label>
                  <input type="range" min="10" max="100" value={quality} onChange={(e) => { setQuality(parseInt(e.target.value)); if (originalFile) convert(originalFile) }}
                    className="w-full accent-blue-500" />
                </div>
              )}

              {convertedUrl && (
                <>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-4">
                    <img src={convertedUrl} alt="Converted" className="w-full max-h-96 object-contain rounded" />
                  </div>
                  <button onClick={handleDownload}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download as WEBP
                  </button>
                </>
              )}
            </>
          )}
        </div>

        <SEOSections toolSlug="png-to-webp" toolName="PNG to WebP Converter" category="Image" />
      </div>
    </div>
  )
}
"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Image as ImageIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface FaviconGeneratorPageProps {
  name?: string;
  description?: string;
}

const SIZES = [16, 32, 48, 64, 128, 180, 192, 256, 512]

export default function FaviconGeneratorPage({ name, description }: FaviconGeneratorPageProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [favicons, setFavicons] = useState<Array<{ size: number; url: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    generateFavicons(file)
  }

  const generateFavicons = (file: File) => {
    const img = new Image()
    img.onload = () => {
      const results: Array<{ size: number; url: string }> = []
      SIZES.forEach(size => {
        const canvas = document.createElement("canvas")
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = "high"
          ctx.drawImage(img, 0, 0, size, size)
          results.push({ size, url: canvas.toDataURL("image/png") })
        }
      })
      setFavicons(results)
    }
    img.src = URL.createObjectURL(file)
  }

  const downloadSize = (size: number, url: string) => {
    const link = document.createElement("a")
    link.download = `favicon-${size}x${size}.png`
    link.href = url
    link.click()
  }

  const downloadAll = () => {
    favicons.forEach((f, idx) => {
      setTimeout(() => downloadSize(f.size, f.url), idx * 200)
    })
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Favicon Generator" description="Generate favicons in all common sizes (16x16 to 512x512). Perfect for websites, PWAs and mobile app icons." keywords="favicon generator, free online tool, favicon-generator, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Favicon Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Favicon <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate favicons in all common sizes (16x16 to 512x512). Perfect for 
            websites, PWAs and mobile app icons.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <ImageIcon className="w-5 h-5 text-blue-400" />
            <span>Upload Source Image (square recommended)</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image (512x512 or larger recommended)</span>
          </button>

          {favicons.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-theme-muted">Generated {favicons.length} sizes</div>
                <button onClick={downloadAll} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-sm">
                  Download All
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {favicons.map(f => (
                  <div key={f.size} className="p-3 rounded-lg bg-theme-secondary border border-theme text-center">
                    <img src={f.url} alt={`${f.size}x${f.size}`} className="mx-auto mb-2" style={{ width: Math.min(f.size, 64), height: Math.min(f.size, 64) }} />
                    <div className="text-xs text-theme-muted mb-2">{f.size} x {f.size}</div>
                    <button onClick={() => downloadSize(f.size, f.url)}
                      className="w-full py-1 px-2 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition flex items-center justify-center gap-1">
                      <Download className="w-3 h-3" /> Download
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
</div>
    </div>
  )
}
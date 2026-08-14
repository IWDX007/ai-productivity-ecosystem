"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, FlipHorizontal, FlipVertical } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface ImageFlipperPageProps {
  name?: string;
  description?: string;
}

export default function ImageFlipperPage({ name, description }: ImageFlipperPageProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [flippedUrl, setFlippedUrl] = useState("")
  const [flipMode, setFlipMode] = useState<"horizontal" | "vertical" | "both">("horizontal")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    flip(file, flipMode)
  }

  const flip = (file: File, mode: string) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (ctx) {
        if (mode === "horizontal" || mode === "both") {
          ctx.translate(canvas.width, 0)
          ctx.scale(-1, 1)
        }
        if (mode === "vertical" || mode === "both") {
          ctx.translate(0, canvas.height)
          ctx.scale(1, -1)
        }
        ctx.drawImage(img, 0, 0)
        setFlippedUrl(canvas.toDataURL("image/png"))
      }
    }
    img.src = URL.createObjectURL(file)
  }

  const setMode = (mode: "horizontal" | "vertical" | "both") => {
    setFlipMode(mode)
    if (originalFile) flip(originalFile, mode)
  }

  const handleDownload = () => {
    if (!flippedUrl) return
    const link = document.createElement("a")
    link.download = `flipped-${flipMode}.png`
    link.href = flippedUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Flipper" description="Flip images horizontally, vertically or both. Perfect for creating mirror effects and correcting orientation." keywords="image flipper, free online tool, image-flipper, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Flipper" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image <span className="gradient-text">Flipper</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Flip images horizontally, vertically or both. Perfect for creating 
            mirror effects and correcting orientation.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <FlipHorizontal className="w-5 h-5 text-blue-400" />
            <span>Upload and Flip</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          {originalFile && (
            <>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button onClick={() => setMode("horizontal")}
                  className={`py-3 rounded-lg transition flex items-center justify-center gap-2 ${flipMode === "horizontal" ? "bg-blue-500 text-white" : "bg-theme-secondary text-theme-primary border border-theme"}`}>
                  <FlipHorizontal className="w-4 h-4" /> Horizontal
                </button>
                <button onClick={() => setMode("vertical")}
                  className={`py-3 rounded-lg transition flex items-center justify-center gap-2 ${flipMode === "vertical" ? "bg-blue-500 text-white" : "bg-theme-secondary text-theme-primary border border-theme"}`}>
                  <FlipVertical className="w-4 h-4" /> Vertical
                </button>
                <button onClick={() => setMode("both")}
                  className={`py-3 rounded-lg transition ${flipMode === "both" ? "bg-blue-500 text-white" : "bg-theme-secondary text-theme-primary border border-theme"}`}>
                  Both
                </button>
              </div>

              {flippedUrl && (
                <>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-4">
                    <div className="text-sm text-blue-400 mb-2">Flipped ({flipMode}):</div>
                    <img src={flippedUrl} alt="Flipped" className="w-full max-h-96 object-contain rounded" />
                  </div>

                  <button onClick={handleDownload}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download Flipped Image
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
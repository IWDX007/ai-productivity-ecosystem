"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Copy, Check, Pipette, Image as ImageIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function ImageColorPickerPage() {
  const [imageUrl, setImageUrl] = useState("")
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, hex: "#000000" })
  const [copied, setCopied] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0)
      }
    }
    img.src = url
  }

  const pickColor = (e: React.MouseEvent<HTMLImageElement>) => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img) return
    const rect = img.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY
    const ctx = canvas.getContext("2d")
    if (ctx) {
      const pixel = ctx.getImageData(x, y, 1, 1).data
      const hex = "#" + [pixel[0], pixel[1], pixel[2]].map(c => c.toString(16).padStart(2, "0")).join("")
      setColor({ r: pixel[0], g: pixel[1], b: pixel[2], hex })
    }
  }

  const handleCopy = async (key: string, val: string) => {
    await navigator.clipboard.writeText(val)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Color Picker" description="Pick any color from an image. Click anywhere on the image to get HEX, RGB values. Perfect for designers and developers." keywords="image color picker, free online tool, image-color-picker, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Color Picker" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image Color <span className="gradient-text">Picker</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Pick any color from an image. Click anywhere on the image to get 
            HEX, RGB values. Perfect for designers and developers.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Pipette className="w-5 h-5 text-blue-400" />
            <span>Upload and Pick Color</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          <canvas ref={canvasRef} className="hidden" />

          {imageUrl && (
            <>
              <div className="text-sm text-theme-muted mb-3">Click anywhere on image to pick color:</div>
              <img ref={imgRef} src={imageUrl} alt="Uploaded" onClick={pickColor}
                className="w-full max-h-96 object-contain rounded cursor-crosshair mb-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border-2 flex items-center gap-3" style={{ backgroundColor: color.hex, borderColor: color.hex }}>
                  <div className="w-16 h-16 rounded-lg border-2 border-white/30" style={{ backgroundColor: color.hex }}></div>
                  <div className="text-white text-xl font-mono font-bold mix-blend-difference">Picked Color</div>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-theme-secondary border border-theme flex items-center justify-between">
                    <div>
                      <div className="text-xs text-theme-muted">HEX</div>
                      <div className="text-theme-primary font-mono">{color.hex}</div>
                    </div>
                    <button onClick={() => handleCopy("hex", color.hex)} className="text-theme-muted hover:text-blue-400">
                      {copied === "hex" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-theme-secondary border border-theme flex items-center justify-between">
                    <div>
                      <div className="text-xs text-theme-muted">RGB</div>
                      <div className="text-theme-primary font-mono">rgb({color.r}, {color.g}, {color.b})</div>
                    </div>
                    <button onClick={() => handleCopy("rgb", `rgb(${color.r}, ${color.g}, ${color.b})`)} className="text-theme-muted hover:text-blue-400">
                      {copied === "rgb" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
</div>
    </div>
  )
}
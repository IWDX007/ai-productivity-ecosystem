"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, RotateCw, Image as ImageIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function ImageRotatorPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState("")
  const [rotatedUrl, setRotatedUrl] = useState("")
  const [angle, setAngle] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    setOriginalUrl(URL.createObjectURL(file))
    rotate(file, 0)
  }

  const rotate = (file: File, deg: number) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const rad = (deg * Math.PI) / 180
      const sin = Math.abs(Math.sin(rad))
      const cos = Math.abs(Math.cos(rad))
      canvas.width = img.width * cos + img.height * sin
      canvas.height = img.width * sin + img.height * cos
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(rad)
        ctx.drawImage(img, -img.width / 2, -img.height / 2)
        setRotatedUrl(canvas.toDataURL("image/png"))
      }
    }
    img.src = URL.createObjectURL(file)
  }

  const setRotation = (deg: number) => {
    setAngle(deg)
    if (originalFile) rotate(originalFile, deg)
  }

  const handleDownload = () => {
    if (!rotatedUrl) return
    const link = document.createElement("a")
    link.download = `rotated-${angle}deg.png`
    link.href = rotatedUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Rotator" description="Rotate images 90, 180, 270 degrees or any custom angle. Perfect for fixing sideways photos and creative rotations." keywords="image rotator, free online tool, image-rotator, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Rotator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image <span className="gradient-text">Rotator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Rotate images 90, 180, 270 degrees or any custom angle. 
            Perfect for fixing sideways photos and creative rotations.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <RotateCw className="w-5 h-5 text-blue-400" />
            <span>Upload and Rotate</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          {originalFile && (
            <>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[0, 90, 180, 270].map(deg => (
                  <button key={deg} onClick={() => setRotation(deg)}
                    className={`py-3 rounded-lg transition font-semibold ${angle === deg ? "bg-blue-500 text-white" : "bg-theme-secondary text-theme-primary border border-theme hover:border-blue-500/30"}`}>
                    {deg}Â°
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="text-sm text-theme-muted mb-2 block">Custom Angle: {angle}Â°</label>
                <input type="range" min="0" max="360" value={angle} onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full accent-blue-500" />
              </div>

              {rotatedUrl && (
                <>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-4">
                    <div className="text-sm text-blue-400 mb-2">Rotated {angle}Â°:</div>
                    <img src={rotatedUrl} alt="Rotated" className="w-full max-h-96 object-contain rounded" />
                  </div>

                  <button onClick={handleDownload}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download Rotated Image
                  </button>
                </>
              )}
            </>
          )}
        </div>

        <SEOSections toolSlug="image-rotator" toolName="Image Rotator" category="Image" />
      </div>
    </div>
  )
}
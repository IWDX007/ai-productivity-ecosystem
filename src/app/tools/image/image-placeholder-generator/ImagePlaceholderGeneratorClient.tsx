"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import { Download, Copy, Check, Image as ImageIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface ImagePlaceholderGeneratorPageProps {
  name?: string;
  description?: string;
}

export default function ImagePlaceholderGeneratorPage({ name, description }: ImagePlaceholderGeneratorPageProps) {
  const [width, setWidth] = useState(600)
  const [height, setHeight] = useState(400)
  const [bgColor, setBgColor] = useState("#e2e8f0")
  const [textColor, setTextColor] = useState("#64748b")
  const [text, setText] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    generate()
  }, [width, height, bgColor, textColor, text])

  const generate = () => {
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = textColor
      ctx.font = `bold ${Math.min(width, height) / 10}px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      const displayText = text || `${width} x ${height}`
      ctx.fillText(displayText, width / 2, height / 2)
      setImageUrl(canvas.toDataURL("image/png"))
    }
  }

  const handleDownload = () => {
    if (!imageUrl) return
    const link = document.createElement("a")
    link.download = `placeholder-${width}x${height}.png`
    link.href = imageUrl
    link.click()
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(imageUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Placeholder Generator" description="Generate custom placeholder images for mockups, wireframes and testing. Any size, color and text." keywords="placeholder generator, free online tool, image-placeholder-generator, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Placeholder Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Placeholder <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate custom placeholder images for mockups, wireframes and 
            testing. Any size, color and text.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
              <ImageIcon className="w-5 h-5 text-blue-400" />
              <span>Placeholder Settings</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Width</label>
                <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 100)}
                  className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Height</label>
                <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 100)}
                  className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Background</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer" />
              </div>
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Text Color</label>
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer" />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm text-theme-muted mb-2 block">Custom Text (optional)</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                placeholder={`${width} x ${height}`}
                className="w-full px-4 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
            </div>

            <div className="flex gap-2">
              <button onClick={handleDownload} className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download
              </button>
              <button onClick={handleCopy} className="px-6 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 flex items-center justify-center">
            {imageUrl && <img src={imageUrl} alt="Placeholder" className="max-w-full rounded-lg" />}
          </div>
        </div>
</div>
    </div>
  )
}
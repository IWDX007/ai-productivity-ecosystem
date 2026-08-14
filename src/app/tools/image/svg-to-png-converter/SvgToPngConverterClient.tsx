"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Image as ImageIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface SvgToPngConverterPageProps {
  name?: string;
  description?: string;
}

export default function SvgToPngConverterPage({ name, description }: SvgToPngConverterPageProps) {
  const [svgContent, setSvgContent] = useState("")
  const [pngUrl, setPngUrl] = useState("")
  const [width, setWidth] = useState(1024)
  const [height, setHeight] = useState(1024)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const content = reader.result as string
      setSvgContent(content)
      convert(content, width, height)
    }
    reader.readAsText(file)
  }

  const convert = (svg: string = svgContent, w: number = width, h: number = height) => {
    if (!svg) return
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h)
        setPngUrl(canvas.toDataURL("image/png"))
        URL.revokeObjectURL(url)
      }
    }
    img.src = url
  }

  const handleDownload = () => {
    if (!pngUrl) return
    const link = document.createElement("a")
    link.download = `converted-${width}x${height}.png`
    link.href = pngUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="SVG to PNG" description="Convert SVG vector images to PNG raster format at any size. Perfect for logos, icons and scalable graphics." keywords="svg to png, free online tool, svg-to-png-converter, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "SVG to PNG" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            SVG to <span className="gradient-text">PNG</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert SVG vector images to PNG raster format at any size. 
            Perfect for logos, icons and scalable graphics.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <ImageIcon className="w-5 h-5 text-blue-400" />
            <span>Upload SVG File</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".svg,image/svg+xml" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload SVG file</span>
          </button>

          {svgContent && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Width (px)</label>
                  <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 100)}
                    className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Height (px)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 100)}
                    className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <button onClick={() => convert()} className="w-full mb-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
                Convert to PNG
              </button>

              {pngUrl && (
                <>
                  <div className="mb-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <div className="text-sm text-blue-400 mb-2">Converted PNG ({width}x{height}):</div>
                    <img src={pngUrl} alt="Converted" className="w-full max-h-96 object-contain rounded bg-white p-4" />
                  </div>

                  <button onClick={handleDownload}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download PNG
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
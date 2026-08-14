"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useEffect, useRef, useState } from "react"
import { Download, Copy, Check, Barcode as BarcodeIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function Code128BarcodePage() {
  const [text, setText] = useState("HELLO123")
  const [width, setWidth] = useState(2)
  const [height, setHeight] = useState(100)
  const [displayValue, setDisplayValue] = useState(true)
  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [copied, setCopied] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const generateBarcode = async () => {
      if (!text || !svgRef.current) return
      try {
        const JsBarcode = (await import("jsbarcode")).default
        JsBarcode(svgRef.current, text, {
          format: "CODE128",
          width, height, displayValue,
          lineColor: fgColor,
          background: bgColor,
          margin: 10,
        })
      } catch (e) { console.error(e) }
    }
    generateBarcode()
  }, [text, width, height, displayValue, fgColor, bgColor])

  const handleDownload = () => {
    if (!svgRef.current) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const link = document.createElement("a")
      link.download = `barcode-${text}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    }
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
  }

  const handleCopy = async () => {
    if (!svgRef.current) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    await navigator.clipboard.writeText(svgData)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Code 128 Barcode Generator" description="Generate Code 128 barcodes for any alphanumeric text. Widely used in shipping, logistics and product tracking." keywords="code 128 barcode generator, free online tool, code128-barcode-generator, qr-barcode tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "QR & Barcode", href: "/tools/qr-barcode" },
          { label: "Code 128 Barcode" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            QR & Barcode Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Code 128 <span className="gradient-text">Barcode Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate Code 128 barcodes for any alphanumeric text. Widely used in 
            shipping, logistics and product tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
              <BarcodeIcon className="w-5 h-5 text-orange-400" />
              <span>Barcode Options</span>
            </div>

            <div className="mb-4">
              <label className="text-sm text-theme-muted mb-2 block">Text to Encode</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500 transition"
                placeholder="Enter text or numbers..." />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Width: {width}</label>
                <input type="range" min="1" max="5" value={width} onChange={(e) => setWidth(parseInt(e.target.value))}
                  className="w-full accent-orange-500" />
              </div>
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Height: {height}px</label>
                <input type="range" min="50" max="200" step="10" value={height} onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full accent-orange-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Bar Color</label>
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer bg-theme-secondary border border-theme" />
              </div>
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Background</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer bg-theme-secondary border border-theme" />
              </div>
            </div>

            <label className="flex items-center gap-2 p-3 rounded-lg bg-theme-secondary border border-theme cursor-pointer mb-6">
              <input type="checkbox" checked={displayValue} onChange={(e) => setDisplayValue(e.target.checked)}
                className="w-4 h-4 accent-orange-500" />
              <span className="text-theme-primary text-sm">Show text below barcode</span>
            </label>

            <div className="flex gap-2">
              <button onClick={handleDownload} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download PNG
              </button>
              <button onClick={handleCopy} className="px-6 py-3 bg-theme-secondary border border-theme hover:border-orange-500/30 rounded-lg transition text-theme-primary">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg w-full flex items-center justify-center">
              <svg ref={svgRef} className="max-w-full"></svg>
            </div>
          </div>
        </div>

        <SEOSections toolSlug="code128-barcode-generator" toolName="Code 128 Barcode Generator" category="QR & Barcode" />
      </div>
    </div>
  )
}
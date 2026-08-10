"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useEffect, useRef, useState } from "react"
import { Download, Barcode as BarcodeIcon, AlertCircle } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function UpcaBarcodePage() {
  const [text, setText] = useState("012345678905")
  const [error, setError] = useState("")
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const generateBarcode = async () => {
      if (!svgRef.current) return
      setError("")
      const cleaned = text.replace(/\D/g, "")
      if (cleaned.length !== 11 && cleaned.length !== 12) {
        setError("UPC-A requires exactly 11 or 12 digits")
        svgRef.current.innerHTML = ""
        return
      }
      try {
        const JsBarcode = (await import("jsbarcode")).default
        JsBarcode(svgRef.current, cleaned, {
          format: "UPC",
          width: 2, height: 100, displayValue: true, margin: 10,
        })
      } catch (e: any) {
        setError(e.message || "Invalid UPC-A")
      }
    }
    generateBarcode()
  }, [text])

  const handleDownload = () => {
    if (!svgRef.current || error) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const link = document.createElement("a")
      link.download = `upca-${text}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    }
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="UPC-A Barcode Generator" description="Generate UPC-A barcodes for North American retail products. Universal Product Code used in US and Canada stores." keywords="upc-a barcode generator, free online tool, upca-barcode-generator, qr-barcode tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "QR & Barcode", href: "/tools/qr-barcode" },
          { label: "UPC-A Barcode" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            QR & Barcode Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            UPC-A <span className="gradient-text">Barcode Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate UPC-A barcodes for North American retail products. 
            Universal Product Code used in US and Canada stores.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
              <BarcodeIcon className="w-5 h-5 text-orange-400" />
              <span>Product Code</span>
            </div>

            <div className="mb-6">
              <label className="text-sm text-theme-muted mb-2 block">UPC-A Code (11 or 12 digits)</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg font-mono focus:outline-none focus:border-orange-500 transition"
                placeholder="012345678905" maxLength={12} />
              <div className="text-xs text-theme-muted mt-2">
                Digits: {text.replace(/\D/g, "").length} / 11-12
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <button onClick={handleDownload} disabled={!!error}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download PNG
            </button>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg w-full flex items-center justify-center">
              <svg ref={svgRef} className="max-w-full"></svg>
            </div>
          </div>
        </div>

        <SEOSections toolSlug="upca-barcode-generator" toolName="UPC-A Barcode Generator" category="QR & Barcode" />
      </div>
    </div>
  )
}
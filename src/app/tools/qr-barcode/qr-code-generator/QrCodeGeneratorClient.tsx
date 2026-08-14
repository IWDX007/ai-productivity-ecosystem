"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect, useRef } from "react"
import { Copy, Check, Download, QrCode as QrIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function QrCodeGeneratorPage() {
  const [text, setText] = useState("https://example.com")
  const [size, setSize] = useState(300)
  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M")
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateQR = async () => {
      if (!text) return
      try {
        const QRCode = (await import("qrcode")).default
        const dataUrl = await QRCode.toDataURL(text, {
          width: size,
          margin: 2,
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: errorLevel,
        })
        setQrDataUrl(dataUrl)
      } catch (e) {
        console.error("QR generation error:", e)
      }
    }
    generateQR()
  }, [text, size, fgColor, bgColor, errorLevel])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = qrDataUrl
    link.click()
  }

  const handleCopy = async () => {
    if (!qrDataUrl) return
    try {
      const blob = await (await fetch(qrDataUrl)).blob()
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: copy data URL
      await navigator.clipboard.writeText(qrDataUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="QR Code Generator" description="Generate QR codes for any text or URL instantly. Fully customizable with colors, size and error correction. Download as PNG." keywords="qr code generator, free online tool, qr-code-generator, qr-barcode tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "QR & Barcode", href: "/tools/qr-barcode" },
          { label: "QR Code Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            QR & Barcode Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            QR Code <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate QR codes for any text or URL instantly. Fully customizable 
            with colors, size and error correction. Download as PNG.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
              <QrIcon className="w-5 h-5 text-orange-400" />
              <span>QR Options</span>
            </div>

            <div className="mb-4">
              <label className="text-sm text-theme-muted mb-2 block">Text or URL</label>
              <textarea value={text} onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500 transition min-h-24"
                placeholder="Enter text or URL..." />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Size: {size}px</label>
                <input type="range" min="100" max="800" step="50" value={size} onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full accent-orange-500" />
              </div>
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Error Correction</label>
                <select value={errorLevel} onChange={(e) => setErrorLevel(e.target.value as any)}
                  className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500">
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Foreground Color</label>
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer bg-theme-secondary border border-theme" />
              </div>
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Background Color</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer bg-theme-secondary border border-theme" />
              </div>
            </div>

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
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR Code" className="max-w-full rounded-lg" style={{ backgroundColor: bgColor, padding: "1rem" }} />
            ) : (
              <div className="text-theme-muted">Enter text to generate QR code</div>
            )}
          </div>
        </div>
</div>
    </div>
  )
}
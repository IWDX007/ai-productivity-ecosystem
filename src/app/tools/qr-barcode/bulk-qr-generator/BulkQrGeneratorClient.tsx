"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Download, Layers, RefreshCw } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function BulkQrGeneratorPage() {
  const [input, setInput] = useState("https://example.com/1\nhttps://example.com/2\nhttps://example.com/3")
  const [qrCodes, setQrCodes] = useState<Array<{ text: string; dataUrl: string }>>([])
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    const lines = input.split("\n").map(l => l.trim()).filter(Boolean)
    if (lines.length === 0) return
    setLoading(true)
    try {
      const QRCode = (await import("qrcode")).default
      const results = await Promise.all(
        lines.map(async (text) => ({
          text,
          dataUrl: await QRCode.toDataURL(text, { width: 200, margin: 1 })
        }))
      )
      setQrCodes(results)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const downloadAll = () => {
    qrCodes.forEach((qr, idx) => {
      setTimeout(() => {
        const link = document.createElement("a")
        link.download = `qr-${idx + 1}.png`
        link.href = qr.dataUrl
        link.click()
      }, idx * 100)
    })
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Bulk QR Generator" description="Generate multiple QR codes at once. Perfect for events, product batches, invitation cards or marketing campaigns." keywords="bulk qr generator, free online tool, bulk-qr-generator, qr-barcode tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "QR & Barcode", href: "/tools/qr-barcode" },
          { label: "Bulk QR Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            QR & Barcode Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Bulk QR <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate multiple QR codes at once. Perfect for events, product batches, 
            invitation cards or marketing campaigns.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Layers className="w-5 h-5 text-orange-400" />
            <span>Bulk Input (one per line)</span>
          </div>

          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full mb-4 px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary font-mono text-sm focus:outline-none focus:border-orange-500 min-h-48"
            placeholder="Enter one URL or text per line..." />

          <div className="text-xs text-theme-muted mb-4">
            Lines: {input.split("\n").filter(l => l.trim()).length}
          </div>

          <div className="flex gap-2 mb-6">
            <button onClick={generate} disabled={loading} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Generating..." : "Generate All QR Codes"}
            </button>
            {qrCodes.length > 0 && (
              <button onClick={downloadAll} className="px-6 py-3 bg-theme-secondary border border-theme hover:border-orange-500/30 rounded-lg transition text-theme-primary flex items-center gap-2">
                <Download className="w-5 h-5" /> Download All
              </button>
            )}
          </div>

          {qrCodes.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {qrCodes.map((qr, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-theme-secondary border border-theme">
                  <img src={qr.dataUrl} alt={`QR ${idx + 1}`} className="w-full rounded" />
                  <div className="text-xs text-theme-muted mt-2 truncate" title={qr.text}>{qr.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
</div>
    </div>
  )
}
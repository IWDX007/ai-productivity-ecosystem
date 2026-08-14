"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import { Download, Wifi } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface WifiQrGeneratorPageProps {
  name?: string;
  description?: string;
}

export default function WifiQrGeneratorPage({ name, description }: WifiQrGeneratorPageProps) {
  const [ssid, setSsid] = useState("MyWiFi")
  const [password, setPassword] = useState("")
  const [encryption, setEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA")
  const [hidden, setHidden] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState("")

  useEffect(() => {
    const generateQR = async () => {
      if (!ssid) return
      const wifiString = `WIFI:T:${encryption};S:${ssid};${encryption !== "nopass" ? "P:" + password + ";" : ""}${hidden ? "H:true;" : ""};`
      try {
        const QRCode = (await import("qrcode")).default
        const dataUrl = await QRCode.toDataURL(wifiString, { width: 300, margin: 2 })
        setQrDataUrl(dataUrl)
      } catch (e) { console.error(e) }
    }
    generateQR()
  }, [ssid, password, encryption, hidden])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const link = document.createElement("a")
    link.download = `wifi-${ssid}.png`
    link.href = qrDataUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="WiFi QR Generator" description="Generate QR codes for WiFi networks. Scan with phone camera to connect instantly - no password typing needed!" keywords="wifi qr generator, free online tool, wifi-qr-generator, qr-barcode tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "QR & Barcode", href: "/tools/qr-barcode" },
          { label: "WiFi QR Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            QR & Barcode Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            WiFi QR <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate QR codes for WiFi networks. Scan with phone camera to connect
            instantly - no password typing needed!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
              <Wifi className="w-5 h-5 text-orange-400" />
              <span>WiFi Details</span>
            </div>

            <div className="mb-4">
              <label className="text-sm text-theme-muted mb-2 block">Network Name (SSID)</label>
              <input type="text" value={ssid} onChange={(e) => setSsid(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500 transition"
                placeholder="MyWiFi" />
            </div>

            <div className="mb-4">
              <label className="text-sm text-theme-muted mb-2 block">Encryption Type</label>
              <select value={encryption} onChange={(e) => setEncryption(e.target.value as any)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500">
                <option value="WPA">WPA/WPA2/WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>

            {encryption !== "nopass" && (
              <div className="mb-4">
                <label className="text-sm text-theme-muted mb-2 block">Password</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500 transition"
                  placeholder="WiFi password..." />
              </div>
            )}

            <label className="flex items-center gap-2 p-3 rounded-lg bg-theme-secondary border border-theme cursor-pointer mb-6">
              <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)}
                className="w-4 h-4 accent-orange-500" />
              <span className="text-theme-primary text-sm">Hidden Network</span>
            </label>

            <button onClick={handleDownload} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download QR Code
            </button>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 flex items-center justify-center">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="WiFi QR" className="max-w-full rounded-lg bg-white p-4" />
            ) : (
              <div className="text-theme-muted">Enter WiFi details</div>
            )}
          </div>
        </div>
</div>
    </div>
  )
}
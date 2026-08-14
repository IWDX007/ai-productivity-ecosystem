"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import { Download, Phone } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface PhoneQrGeneratorPageProps {
  name?: string;
  description?: string;
}

export default function PhoneQrGeneratorPage({ name, description }: PhoneQrGeneratorPageProps) {
  const [phone, setPhone] = useState("+1234567890")
  const [qrDataUrl, setQrDataUrl] = useState("")

  useEffect(() => {
    const generateQR = async () => {
      if (!phone) return
      try {
        const QRCode = (await import("qrcode")).default
        const dataUrl = await QRCode.toDataURL(`tel:${phone}`, { width: 300, margin: 2 })
        setQrDataUrl(dataUrl)
      } catch (e) { console.error(e) }
    }
    generateQR()
  }, [phone])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const link = document.createElement("a")
    link.download = "phone-qr.png"
    link.href = qrDataUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Phone QR Generator" description="Generate QR codes for phone numbers. Scan to instantly call - perfect for business cards, restaurants and emergency contacts." keywords="phone qr generator, free online tool, phone-qr-generator, qr-barcode tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "QR & Barcode", href: "/tools/qr-barcode" },
          { label: "Phone QR Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            QR & Barcode Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Phone QR <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate QR codes for phone numbers. Scan to instantly call - perfect 
            for business cards, restaurants and emergency contacts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
              <Phone className="w-5 h-5 text-orange-400" />
              <span>Phone Number</span>
            </div>

            <div className="mb-6">
              <label className="text-sm text-theme-muted mb-2 block">Phone Number (with country code) *</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-xl focus:outline-none focus:border-orange-500"
                placeholder="+1234567890" />
              <div className="text-xs text-theme-muted mt-2">Include country code (e.g., +1 for US, +44 for UK)</div>
            </div>

            <button onClick={handleDownload} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download QR Code
            </button>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 flex items-center justify-center">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Phone QR" className="max-w-full rounded-lg bg-white p-4" />
            ) : (
              <div className="text-theme-muted">Enter phone number</div>
            )}
          </div>
        </div>
</div>
    </div>
  )
}
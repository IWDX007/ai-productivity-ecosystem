"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import { Download, Mail } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function EmailQrGeneratorPage() {
  const [email, setEmail] = useState("hello@example.com")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [qrDataUrl, setQrDataUrl] = useState("")

  useEffect(() => {
    const generateQR = async () => {
      if (!email) return
      const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      try {
        const QRCode = (await import("qrcode")).default
        const dataUrl = await QRCode.toDataURL(mailto, { width: 300, margin: 2 })
        setQrDataUrl(dataUrl)
      } catch (e) { console.error(e) }
    }
    generateQR()
  }, [email, subject, body])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const link = document.createElement("a")
    link.download = "email-qr.png"
    link.href = qrDataUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Email QR Generator" description="Generate QR codes that open pre-filled emails. Include recipient, subject and message body - one scan and email is ready to send." keywords="email qr generator, free online tool, email-qr-generator, qr-barcode tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "QR & Barcode", href: "/tools/qr-barcode" },
          { label: "Email QR Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            QR & Barcode Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Email QR <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate QR codes that open pre-filled emails. Include recipient, subject 
            and message body - one scan and email is ready to send.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
              <Mail className="w-5 h-5 text-orange-400" />
              <span>Email Details</span>
            </div>

            <div className="mb-4">
              <label className="text-sm text-theme-muted mb-2 block">To Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
                placeholder="hello@example.com" />
            </div>

            <div className="mb-4">
              <label className="text-sm text-theme-muted mb-2 block">Subject</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
                placeholder="Email subject..." />
            </div>

            <div className="mb-6">
              <label className="text-sm text-theme-muted mb-2 block">Message Body</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500 min-h-24"
                placeholder="Your message..." />
            </div>

            <button onClick={handleDownload} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download QR Code
            </button>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 flex items-center justify-center">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Email QR" className="max-w-full rounded-lg bg-white p-4" />
            ) : (
              <div className="text-theme-muted">Enter email details</div>
            )}
          </div>
        </div>
</div>
    </div>
  )
}
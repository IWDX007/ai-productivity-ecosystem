"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import { Download, User } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function VcardQrGeneratorPage() {
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [phone, setPhone] = useState("+1234567890")
  const [email, setEmail] = useState("john@example.com")
  const [company, setCompany] = useState("")
  const [title, setTitle] = useState("")
  const [website, setWebsite] = useState("")
  const [address, setAddress] = useState("")
  const [qrDataUrl, setQrDataUrl] = useState("")

  useEffect(() => {
    const generateQR = async () => {
      const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
N:${lastName};${firstName};;;
${phone ? `TEL:${phone}` : ""}
${email ? `EMAIL:${email}` : ""}
${company ? `ORG:${company}` : ""}
${title ? `TITLE:${title}` : ""}
${website ? `URL:${website}` : ""}
${address ? `ADR:;;${address};;;;` : ""}
END:VCARD`
      try {
        const QRCode = (await import("qrcode")).default
        const dataUrl = await QRCode.toDataURL(vcard, { width: 300, margin: 2 })
        setQrDataUrl(dataUrl)
      } catch (e) { console.error(e) }
    }
    generateQR()
  }, [firstName, lastName, phone, email, company, title, website, address])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const link = document.createElement("a")
    link.download = `vcard-${firstName}-${lastName}.png`
    link.href = qrDataUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="vCard QR Generator" description="Generate QR codes for contact info (vCard). Scan to instantly add to phone contacts. Perfect for business cards and networking." keywords="vcard qr generator, free online tool, vcard-qr-generator, qr-barcode tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "QR & Barcode", href: "/tools/qr-barcode" },
          { label: "vCard QR Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            QR & Barcode Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            vCard QR <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate QR codes for contact info (vCard). Scan to instantly add to 
            phone contacts. Perfect for business cards and networking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
              <User className="w-5 h-5 text-orange-400" />
              <span>Contact Details</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
                placeholder="First Name *" />
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
                placeholder="Last Name" />
            </div>

            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-3 px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
              placeholder="Phone" />

            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
              placeholder="Email" />

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                className="px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
                placeholder="Company" />
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
                placeholder="Job Title" />
            </div>

            <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)}
              className="w-full mb-3 px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
              placeholder="Website" />

            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
              className="w-full mb-6 px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
              placeholder="Address" />

            <button onClick={handleDownload} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download QR Code
            </button>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 flex items-center justify-center">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="vCard QR" className="max-w-full rounded-lg bg-white p-4" />
            ) : (
              <div className="text-theme-muted">Enter contact details</div>
            )}
          </div>
        </div>

        <SEOSections toolSlug="vcard-qr-generator" toolName="vCard QR Generator" category="QR & Barcode" />
      </div>
    </div>
  )
}
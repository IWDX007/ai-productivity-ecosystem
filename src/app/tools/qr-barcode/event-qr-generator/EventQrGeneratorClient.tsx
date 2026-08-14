"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import { Download, Calendar } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function EventQrGeneratorPage() {
  const [title, setTitle] = useState("My Event")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [qrDataUrl, setQrDataUrl] = useState("")

  useEffect(() => {
    const now = new Date()
    const later = new Date(now.getTime() + 3600000)
    setStartDate(now.toISOString().slice(0, 16))
    setEndDate(later.toISOString().slice(0, 16))
  }, [])

  useEffect(() => {
    const generateQR = async () => {
      if (!title || !startDate || !endDate) return
      const formatDate = (d: string) => d.replace(/[-:]/g, "").replace(/\.\d+/, "") + "Z"
      const event = `BEGIN:VEVENT
SUMMARY:${title}
LOCATION:${location}
DESCRIPTION:${description}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
END:VEVENT`
      try {
        const QRCode = (await import("qrcode")).default
        const dataUrl = await QRCode.toDataURL(event, { width: 300, margin: 2 })
        setQrDataUrl(dataUrl)
      } catch (e) { console.error(e) }
    }
    generateQR()
  }, [title, location, description, startDate, endDate])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const link = document.createElement("a")
    link.download = "event-qr.png"
    link.href = qrDataUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Event QR Generator" description="Generate QR codes for calendar events. Scan to add event to phone calendar with title, location, date and description." keywords="event qr generator, free online tool, event-qr-generator, qr-barcode tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "QR & Barcode", href: "/tools/qr-barcode" },
          { label: "Event QR Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            QR & Barcode Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Event QR <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate QR codes for calendar events. Scan to add event to phone 
            calendar with title, location, date and description.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
              <Calendar className="w-5 h-5 text-orange-400" />
              <span>Event Details</span>
            </div>

            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
              placeholder="Event Title *" />

            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
              className="w-full mb-3 px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
              placeholder="Location" />

            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-3 px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500 min-h-20"
              placeholder="Description" />

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <label className="text-xs text-theme-muted mb-1 block">Start</label>
                <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="text-xs text-theme-muted mb-1 block">End</label>
                <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500" />
              </div>
            </div>

            <button onClick={handleDownload} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download QR Code
            </button>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 flex items-center justify-center">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Event QR" className="max-w-full rounded-lg bg-white p-4" />
            ) : (
              <div className="text-theme-muted">Enter event details</div>
            )}
          </div>
        </div>
</div>
    </div>
  )
}
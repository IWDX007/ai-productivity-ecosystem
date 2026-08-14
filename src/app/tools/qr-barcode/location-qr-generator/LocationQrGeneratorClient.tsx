"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import { Download, MapPin } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function LocationQrGeneratorPage() {
  const [latitude, setLatitude] = useState("40.7128")
  const [longitude, setLongitude] = useState("-74.0060")
  const [qrDataUrl, setQrDataUrl] = useState("")

  useEffect(() => {
    const generateQR = async () => {
      if (!latitude || !longitude) return
      const geo = `geo:${latitude},${longitude}`
      try {
        const QRCode = (await import("qrcode")).default
        const dataUrl = await QRCode.toDataURL(geo, { width: 300, margin: 2 })
        setQrDataUrl(dataUrl)
      } catch (e) { console.error(e) }
    }
    generateQR()
  }, [latitude, longitude])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const link = document.createElement("a")
    link.download = "location-qr.png"
    link.href = qrDataUrl
    link.click()
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(6))
          setLongitude(pos.coords.longitude.toFixed(6))
        },
        () => alert("Unable to get location")
      )
    }
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Location QR Generator" description="Generate QR codes for GPS coordinates. Scan to open location in Google Maps or Apple Maps. Perfect for events, stores and meeting points." keywords="location qr generator, free online tool, location-qr-generator, qr-barcode tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "QR & Barcode", href: "/tools/qr-barcode" },
          { label: "Location QR Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            QR & Barcode Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Location QR <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate QR codes for GPS coordinates. Scan to open location in Google Maps 
            or Apple Maps. Perfect for events, stores and meeting points.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
              <MapPin className="w-5 h-5 text-orange-400" />
              <span>Location Coordinates</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Latitude *</label>
                <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
                  placeholder="40.7128" />
              </div>
              <div>
                <label className="text-sm text-theme-muted mb-2 block">Longitude *</label>
                <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-orange-500"
                  placeholder="-74.0060" />
              </div>
            </div>

            <button onClick={getCurrentLocation} className="w-full mb-4 py-2 bg-theme-secondary border border-theme hover:border-orange-500/30 rounded-lg text-theme-primary transition">
              Use My Current Location
            </button>

            <button onClick={handleDownload} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download QR Code
            </button>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 flex items-center justify-center">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Location QR" className="max-w-full rounded-lg bg-white p-4" />
            ) : (
              <div className="text-theme-muted">Enter coordinates</div>
            )}
          </div>
        </div>
</div>
    </div>
  )
}
"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Copy, Check, Upload, Camera, ScanLine, X } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function BarcodeReaderPage() {
  const [result, setResult] = useState("")
  const [format, setFormat] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [scanning, setScanning] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const scanImage = async (imageSource: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) => {
    try {
      // @ts-ignore
      if (typeof BarcodeDetector !== "undefined") {
        // @ts-ignore
        const barcodeDetector = new BarcodeDetector({
          formats: ["code_128", "code_39", "ean_13", "ean_8", "upc_a", "upc_e", "codabar", "itf"]
        })
        const barcodes = await barcodeDetector.detect(imageSource)
        if (barcodes.length > 0) {
          setResult(barcodes[0].rawValue)
          setFormat(barcodes[0].format)
          setError("")
          return true
        }
      } else {
        setError("Barcode scanning not supported in this browser. Try Chrome or Edge.")
      }
    } catch (e: any) {
      setError("Scan error: " + e.message)
    }
    return false
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const img = new Image()
    img.onload = async () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const found = await scanImage(canvas)
        if (!found) setError("No barcode found in image")
      }
    }
    img.src = URL.createObjectURL(file)
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setScanning(true)
        const scanLoop = async () => {
          if (videoRef.current && streamRef.current) {
            const found = await scanImage(videoRef.current)
            if (found) stopCamera()
            else requestAnimationFrame(scanLoop)
          }
        }
        setTimeout(scanLoop, 1000)
      }
    } catch (e: any) {
      setError("Camera access denied: " + e.message)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setScanning(false)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Barcode Reader" description="Scan barcodes with your camera or upload images. Supports Code 128, Code 39, EAN-13, UPC-A and 8+ barcode formats." keywords="barcode reader, free online tool, barcode-reader, qr-barcode tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "QR & Barcode", href: "/tools/qr-barcode" },
          { label: "Barcode Reader" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            QR & Barcode Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Barcode <span className="gradient-text">Reader</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Scan barcodes with your camera or upload images. Supports Code 128, 
            Code 39, EAN-13, UPC-A and 8+ barcode formats.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <ScanLine className="w-5 h-5 text-orange-400" />
            <span>Scan Barcode</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button onClick={() => fileInputRef.current?.click()} className="py-3 bg-theme-secondary border border-theme hover:border-orange-500/30 rounded-lg text-theme-primary transition flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" /> Upload Image
            </button>
            <button onClick={scanning ? stopCamera : startCamera} className="py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
              {scanning ? <><X className="w-5 h-5" /> Stop</> : <><Camera className="w-5 h-5" /> Camera</>}
            </button>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          {scanning && (
            <div className="mb-6">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
              <div className="text-center text-sm text-theme-muted mt-2">Point camera at barcode</div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {result && (
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm text-orange-400 font-semibold">Decoded Barcode:</span>
                  {format && <span className="ml-2 text-xs text-theme-muted">({format.toUpperCase()})</span>}
                </div>
                <button onClick={handleCopy} className="text-theme-muted hover:text-orange-400 transition">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-orange-300 font-mono text-lg break-all">{result}</div>
            </div>
          )}
        </div>

        <SEOSections toolSlug="barcode-reader" toolName="Barcode Reader" category="QR & Barcode" />
      </div>
    </div>
  )
}
"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Download, Image as ImageIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function Base64ToImagePage() {
  const [input, setInput] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [error, setError] = useState("")

  const convert = () => {
    if (!input.trim()) {
      setError("Please enter Base64 string")
      return
    }
    try {
      setError("")
      let dataUri = input.trim()
      // Add data URI prefix if missing
      if (!dataUri.startsWith("data:")) {
        dataUri = `data:image/png;base64,${dataUri}`
      }
      setImageUrl(dataUri)
    } catch (e) {
      setError("Invalid Base64 string")
      setImageUrl("")
    }
  }

  const handleDownload = () => {
    if (!imageUrl) return
    const link = document.createElement("a")
    link.download = "decoded-image.png"
    link.href = imageUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Base64 to Image" description="Decode Base64 string back to an image. Preview and download in original format. 100% private client-side conversion." keywords="base64 to image, free online tool, base64-to-image, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Base64 to Image" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Base64 to <span className="gradient-text">Image</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Decode Base64 string back to an image. Preview and download 
            in original format. 100% private client-side conversion.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <ImageIcon className="w-5 h-5 text-blue-400" />
            <span>Paste Base64 String</span>
          </div>

          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full mb-4 px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-sm font-mono focus:outline-none focus:border-blue-500 min-h-40"
            placeholder="Paste Base64 string here (with or without data:image prefix)..." />

          <button onClick={convert}
            className="w-full mb-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
            Convert to Image
          </button>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {imageUrl && (
            <>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-4">
                <div className="text-sm text-blue-400 mb-2">Decoded Image:</div>
                <img src={imageUrl} alt="Decoded" className="w-full max-h-96 object-contain rounded" onError={() => setError("Invalid image data")} />
              </div>

              <button onClick={handleDownload}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download Image
              </button>
            </>
          )}
        </div>
</div>
    </div>
  )
}
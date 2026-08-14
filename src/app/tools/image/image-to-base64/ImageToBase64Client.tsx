"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Copy, Check, Image as ImageIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface ImageToBase64PageProps {
  name?: string;
  description?: string;
}

export default function ImageToBase64Page({ name, description }: ImageToBase64PageProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [base64, setBase64] = useState("")
  const [dataUri, setDataUri] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUrl(URL.createObjectURL(file))
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setDataUri(result)
      setBase64(result.split(",")[1])
    }
    reader.readAsDataURL(file)
  }

  const handleCopy = async (key: string, val: string) => {
    await navigator.clipboard.writeText(val)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image to Base64" description="Convert any image to Base64 string. Perfect for embedding images in HTML, CSS, JSON or database storage." keywords="image to base64, free online tool, image-to-base64, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image to Base64" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image to <span className="gradient-text">Base64</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert any image to Base64 string. Perfect for embedding images 
            in HTML, CSS, JSON or database storage.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <ImageIcon className="w-5 h-5 text-blue-400" />
            <span>Upload Image</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          {imageUrl && (
            <>
              <div className="mb-4 p-4 rounded-lg bg-theme-secondary border border-theme">
                <div className="text-sm text-theme-muted mb-2">Preview:</div>
                <img src={imageUrl} alt="Uploaded" className="max-h-48 object-contain rounded" />
              </div>

              <div className="mb-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-400 font-semibold">Data URI (ready for HTML/CSS):</span>
                  <button onClick={() => handleCopy("uri", dataUri)} className="text-theme-muted hover:text-blue-400">
                    {copied === "uri" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-blue-300 font-mono text-xs break-all max-h-32 overflow-y-auto">{dataUri}</div>
              </div>

              <div className="p-4 rounded-lg bg-theme-secondary border border-theme">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-theme-muted">Base64 Only (without data URI):</span>
                  <button onClick={() => handleCopy("b64", base64)} className="text-theme-muted hover:text-blue-400">
                    {copied === "b64" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-mono text-xs break-all max-h-32 overflow-y-auto">{base64}</div>
              </div>
            </>
          )}
        </div>
</div>
    </div>
  )
}
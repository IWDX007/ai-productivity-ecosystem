"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Info, Image as ImageIcon } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function ImageExifViewerPage() {
  const [imageUrl, setImageUrl] = useState("")
  const [imageInfo, setImageInfo] = useState<Record<string, string>>({})
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setImageUrl(URL.createObjectURL(f))
    extractInfo(f)
  }

  const extractInfo = (file: File) => {
    const info: Record<string, string> = {
      "File Name": file.name,
      "File Size": `${(file.size / 1024).toFixed(2)} KB`,
      "File Type": file.type,
      "Last Modified": new Date(file.lastModified).toLocaleString(),
    }

    const img = new Image()
    img.onload = () => {
      info["Dimensions"] = `${img.width} x ${img.height} pixels`
      info["Aspect Ratio"] = (img.width / img.height).toFixed(2)
      info["Total Pixels"] = (img.width * img.height).toLocaleString()
      info["Megapixels"] = `${(img.width * img.height / 1000000).toFixed(2)} MP`
      setImageInfo({ ...info })
    }
    img.src = URL.createObjectURL(file)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image EXIF Viewer" description="View detailed information about any image including dimensions, file size, format, and technical metadata." keywords="image exif viewer, free online tool, image-exif-viewer, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image EXIF Viewer" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image EXIF <span className="gradient-text">Viewer</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            View detailed information about any image including dimensions, 
            file size, format, and technical metadata.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Info className="w-5 h-5 text-blue-400" />
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
              <div className="mb-6 p-4 rounded-lg bg-theme-secondary border border-theme">
                <img src={imageUrl} alt="Preview" className="w-full max-h-64 object-contain rounded" />
              </div>

              <div className="space-y-2">
                {Object.entries(imageInfo).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-theme-secondary border border-theme">
                    <span className="text-theme-muted text-sm">{key}</span>
                    <span className="text-theme-primary font-semibold text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <SEOSections toolSlug="image-exif-viewer" toolName="Image EXIF Viewer" category="Image" />
      </div>
    </div>
  )
}
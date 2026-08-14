"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Image as ImageIcon, X, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
interface FileItem {
  file: File
  original: number
  compressed: number
  url: string
  status: "pending" | "processing" | "done"
}

export default function BulkImageCompressorPage() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState<"jpeg" | "webp">("jpeg")
  const [processing, setProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || [])
    const newFiles: FileItem[] = uploadedFiles.map(file => ({
      file, original: file.size, compressed: 0, url: "", status: "pending"
    }))
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx))
  }

  const compressAll = async () => {
    setProcessing(true)
    for (let i = 0; i < files.length; i++) {
      if (files[i].status === "done") continue

      setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: "processing" } : f))

      await new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(img, 0, 0)
            const dataUrl = canvas.toDataURL(`image/${format}`, quality / 100)
            const size = Math.round(dataUrl.split(",")[1].length * 0.75)
            setFiles(prev => prev.map((f, idx) => idx === i ? {
              ...f, compressed: size, url: dataUrl, status: "done"
            } : f))
          }
          resolve()
        }
        img.src = URL.createObjectURL(files[i].file)
      })
    }
    setProcessing(false)
  }

  const downloadAll = () => {
    files.filter(f => f.status === "done").forEach((f, idx) => {
      setTimeout(() => {
        const link = document.createElement("a")
        link.download = `compressed-${idx + 1}.${format}`
        link.href = f.url
        link.click()
      }, idx * 200)
    })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)}KB`
    return `${(bytes / 1048576).toFixed(2)}MB`
  }

  const totalOriginal = files.reduce((sum, f) => sum + f.original, 0)
  const totalCompressed = files.filter(f => f.status === "done").reduce((sum, f) => sum + f.compressed, 0)
  const totalSavings = totalOriginal > 0 ? Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100) : 0

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Bulk Image Compressor" description="Compress multiple images at once. Upload many, set quality, and download all compressed in seconds." keywords="bulk image compressor, free online tool, bulk-image-compressor, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Bulk Image Compressor" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Bulk Image <span className="gradient-text">Compressor</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Compress multiple images at once. Upload many, set quality, and 
            download all compressed in seconds.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <ImageIcon className="w-5 h-5 text-blue-400" />
            <span>Upload Multiple Images</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload multiple images</span>
          </button>

          {files.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Quality: {quality}%</label>
                  <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full accent-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Format</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value as any)}
                    className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary">
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <button onClick={compressAll} disabled={processing}
                  className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold rounded-lg">
                  {processing ? "Compressing..." : `Compress All ${files.length} Images`}
                </button>
                {files.some(f => f.status === "done") && (
                  <button onClick={downloadAll} className="px-6 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary flex items-center gap-2">
                    <Download className="w-5 h-5" /> Download All
                  </button>
                )}
              </div>

              {totalCompressed > 0 && (
                <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                  Total: {formatSize(totalOriginal)} ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ {formatSize(totalCompressed)} ({totalSavings}% saved)
                </div>
              )}

              <div className="space-y-2">
                {files.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-theme-secondary border border-theme">
                    <div className="flex-1 min-w-0">
                      <div className="text-theme-primary text-sm truncate">{f.file.name}</div>
                      <div className="text-xs text-theme-muted">
                        {formatSize(f.original)}
                        {f.status === "done" && (
                          <> ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ {formatSize(f.compressed)} <span className="text-green-400">({Math.round(((f.original - f.compressed) / f.original) * 100)}% saved)</span></>
                        )}
                      </div>
                    </div>
                    {f.status === "processing" && <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />}
                    {f.status === "done" && <div className="text-green-400 text-xs">ÃƒÂ¢Ã…â€œÃ¢â‚¬Å“</div>}
                    <button onClick={() => removeFile(idx)} className="text-red-400 hover:text-red-500">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
</div>
    </div>
  )
}
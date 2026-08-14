"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Grid3x3 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function ImageSplitterPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [pieces, setPieces] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    split(file)
  }

  const split = (file: File = originalFile!) => {
    if (!file) return
    const img = new Image()
    img.onload = () => {
      const pieceWidth = Math.floor(img.width / cols)
      const pieceHeight = Math.floor(img.height / rows)
      const newPieces: string[] = []

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const canvas = document.createElement("canvas")
          canvas.width = pieceWidth
          canvas.height = pieceHeight
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(img, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight)
            newPieces.push(canvas.toDataURL("image/png"))
          }
        }
      }
      setPieces(newPieces)
    }
    img.src = URL.createObjectURL(file)
  }

  const downloadPiece = (url: string, idx: number) => {
    const link = document.createElement("a")
    link.download = `piece-${idx + 1}.png`
    link.href = url
    link.click()
  }

  const downloadAll = () => {
    pieces.forEach((url, idx) => {
      setTimeout(() => downloadPiece(url, idx), idx * 200)
    })
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Image Splitter" description="Split image into grid pieces. Perfect for Instagram grid posts, puzzle creation, and social media collages." keywords="image splitter, free online tool, image-splitter, image tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Image Tools", href: "/tools/image" },
          { label: "Image Splitter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            Image Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Image <span className="gradient-text">Splitter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Split image into grid pieces. Perfect for Instagram grid posts, 
            puzzle creation, and social media collages.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Grid3x3 className="w-5 h-5 text-blue-400" />
            <span>Grid Settings</span>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-blue-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload image</span>
          </button>

          {originalFile && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Rows: {rows}</label>
                  <input type="range" min="1" max="10" value={rows} onChange={(e) => setRows(parseInt(e.target.value))}
                    className="w-full accent-blue-500" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-2 block">Columns: {cols}</label>
                  <input type="range" min="1" max="10" value={cols} onChange={(e) => setCols(parseInt(e.target.value))}
                    className="w-full accent-blue-500" />
                </div>
              </div>

              <button onClick={() => split()} className="w-full mb-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
                Split into {rows}x{cols} = {rows * cols} pieces
              </button>

              {pieces.length > 0 && (
                <>
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-theme-muted">Generated {pieces.length} pieces</div>
                    <button onClick={downloadAll} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm">
                      Download All
                    </button>
                  </div>

                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                    {pieces.map((url, idx) => (
                      <div key={idx} className="relative group cursor-pointer" onClick={() => downloadPiece(url, idx)}>
                        <img src={url} alt={`Piece ${idx + 1}`} className="w-full rounded border border-theme hover:border-blue-500 transition" />
                        <div className="absolute inset-0 bg-blue-500/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded">
                          <Download className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
</div>
    </div>
  )
}
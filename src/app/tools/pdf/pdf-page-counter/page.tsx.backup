"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, FileText, Info, Copy, Check } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function PdfPageCounterPage() {
  const [file, setFile] = useState<File | null>(null)
  const [info, setInfo] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded || uploaded.type !== "application/pdf") return
    setFile(uploaded)

    try {
      const { PDFDocument } = await import("pdf-lib")
      const bytes = await uploaded.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)

      const pageCount = pdf.getPageCount()
      const firstPage = pdf.getPage(0)
      const { width, height } = firstPage.getSize()

      const details: Record<string, string> = {
        "File Name": uploaded.name,
        "File Size": `${(uploaded.size / 1024).toFixed(2)} KB (${(uploaded.size / 1048576).toFixed(2)} MB)`,
        "Total Pages": pageCount.toString(),
        "First Page Size": `${width.toFixed(0)} x ${height.toFixed(0)} points`,
        "First Page (inches)": `${(width / 72).toFixed(2)}" x ${(height / 72).toFixed(2)}"`,
        "First Page (mm)": `${(width * 0.3528).toFixed(1)} x ${(height * 0.3528).toFixed(1)} mm`,
        "Title": pdf.getTitle() || "Not set",
        "Author": pdf.getAuthor() || "Not set",
        "Subject": pdf.getSubject() || "Not set",
        "Creator": pdf.getCreator() || "Not set",
        "Producer": pdf.getProducer() || "Not set",
        "Creation Date": pdf.getCreationDate()?.toLocaleString() || "Not set",
        "Modification Date": pdf.getModificationDate()?.toLocaleString() || "Not set",
      }
      setInfo(details)
    } catch (e) {
      console.error(e)
    }
  }

  const handleCopy = async (key: string, val: string) => {
    await navigator.clipboard.writeText(val)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAll = async () => {
    const text = Object.entries(info).map(([k, v]) => `${k}: ${v}`).join("\n")
    await navigator.clipboard.writeText(text)
    setCopied("all")
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF Page Counter" description="Get detailed PDF information - page count, size, dimensions, metadata and more. Instant analysis without uploading files." keywords="pdf page counter, free online tool, pdf-page-counter, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF Page Counter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF Page <span className="gradient-text">Counter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Get detailed PDF information - page count, size, dimensions, metadata 
            and more. Instant analysis without uploading files.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Info className="w-5 h-5 text-red-400" />
            <span>Upload PDF</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PDF file</span>
          </button>

          {Object.keys(info).length > 0 && (
            <>
              {info["Total Pages"] && (
                <div className="mb-6 p-6 rounded-lg bg-red-500/10 border border-red-500/30 text-center">
                  <div className="text-sm text-red-400 mb-2">Total Pages</div>
                  <div className="text-6xl font-bold text-red-400">{info["Total Pages"]}</div>
                </div>
              )}

              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-theme-muted">Detailed Information:</div>
                <button onClick={copyAll} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs flex items-center gap-1">
                  {copied === "all" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  Copy All
                </button>
              </div>

              <div className="space-y-2">
                {Object.entries(info).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-theme-secondary border border-theme">
                    <div className="flex-1">
                      <div className="text-xs text-theme-muted">{key}</div>
                      <div className="text-theme-primary text-sm font-semibold">{value}</div>
                    </div>
                    <button onClick={() => handleCopy(key, value)} className="text-theme-muted hover:text-red-400">
                      {copied === key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <SEOSections toolSlug="pdf-page-counter" toolName="PDF Page Counter" category="PDF" />
      </div>
    </div>
  )
}
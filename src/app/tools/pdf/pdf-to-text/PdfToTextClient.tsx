"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef, useEffect } from "react"
import { Upload, Copy, Check, Download, FileText, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface PdfToTextPageProps {
  name?: string;
  description?: string;
}

export default function PdfToTextPage({ name, description }: PdfToTextPageProps) {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState("")
  const [processing, setProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded || uploaded.type !== "application/pdf") return
    setFile(uploaded)
    setText("")
    setError("")
    extractText(uploaded)
  }

  const extractText = async (pdfFile: File) => {
    setProcessing(true)
    try {
      const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs")
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
      let fullText = ""

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const pageText = content.items.map((item: any) => item.str).join(" ")
        fullText += `--- Page ${i} ---\n${pageText}\n\n`
      }

      setText(fullText.trim())
    } catch (e: any) {
      setError("Failed to extract text: " + e.message)
    }
    setProcessing(false)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = "extracted-text.txt"
    link.href = url
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF to Text" description="Extract text content from any PDF file. Perfect for editing, searching or repurposing PDF content." keywords="pdf to text, free online tool, pdf-to-text, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF to Text" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF to <span className="gradient-text">Text</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Extract text content from any PDF file. Perfect for editing, 
            searching or repurposing PDF content.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <FileText className="w-5 h-5 text-red-400" />
            <span>Upload PDF</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PDF file</span>
          </button>

          {processing && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-red-400 animate-spin mx-auto mb-3" />
              <div className="text-theme-muted">Extracting text...</div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {text && (
            <>
              <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-red-400 font-semibold">Extracted Text ({text.length} chars):</span>
                  <div className="flex gap-2">
                    <button onClick={handleCopy} className="text-theme-muted hover:text-red-400">
                      {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <button onClick={handleDownload} className="text-theme-muted hover:text-red-400">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <textarea value={text} readOnly
                  className="w-full h-96 px-4 py-3 bg-theme-primary border border-theme rounded-lg text-theme-primary text-sm font-mono resize-none" />
              </div>
            </>
          )}
        </div>
</div>
    </div>
  )
}
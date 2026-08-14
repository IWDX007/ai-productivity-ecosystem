"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, FileText, Info, Loader2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface PdfMetadataEditorPageProps {
  name?: string;
  description?: string;
}

export default function PdfMetadataEditorPage({ name, description }: PdfMetadataEditorPageProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [subject, setSubject] = useState("")
  const [keywords, setKeywords] = useState("")
  const [creator, setCreator] = useState("")
  const [processing, setProcessing] = useState(false)
  const [resultUrl, setResultUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded || uploaded.type !== "application/pdf") return
    setFile(uploaded)
    setResultUrl("")

    const { PDFDocument } = await import("pdf-lib")
    const bytes = await uploaded.arrayBuffer()
    const pdf = await PDFDocument.load(bytes)

    setTitle(pdf.getTitle() || "")
    setAuthor(pdf.getAuthor() || "")
    setSubject(pdf.getSubject() || "")
    setKeywords(pdf.getKeywords() || "")
    setCreator(pdf.getCreator() || "")
  }

  const updateMetadata = async () => {
    if (!file) return
    setProcessing(true)
    try {
      const { PDFDocument } = await import("pdf-lib")
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)

      pdf.setTitle(title)
      pdf.setAuthor(author)
      pdf.setSubject(subject)
      pdf.setKeywords(keywords.split(",").map(k => k.trim()).filter(Boolean))
      pdf.setCreator(creator)
      pdf.setModificationDate(new Date())

      const newBytes = await pdf.save()
      const blob = new Blob([newBytes as unknown as ArrayBuffer], { type: "application/pdf" })
      setResultUrl(URL.createObjectURL(blob))
    } catch (e) {
      console.error(e)
    }
    setProcessing(false)
  }

  const handleDownload = () => {
    if (!resultUrl) return
    const link = document.createElement("a")
    link.download = `metadata-${file?.name || "pdf"}`
    link.href = resultUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF Metadata Editor" description="Edit PDF metadata - title, author, subject, keywords. Perfect for SEO, document management and library systems." keywords="pdf metadata editor, free online tool, pdf-metadata-editor, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF Metadata Editor" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF Metadata <span className="gradient-text">Editor</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Edit PDF metadata - title, author, subject, keywords. Perfect for 
            SEO, document management and library systems.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Info className="w-5 h-5 text-red-400" />
            <span>Upload and Edit</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PDF file</span>
          </button>

          {file && (
            <>
              <div className="mb-4 p-3 rounded-lg bg-theme-secondary border border-theme">
                <div className="text-theme-primary text-sm">{file.name}</div>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-sm text-theme-muted mb-1 block">Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500"
                    placeholder="Document title" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-1 block">Author</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500"
                    placeholder="Author name" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-1 block">Subject</label>
                  <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500"
                    placeholder="Document subject" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-1 block">Keywords (comma-separated)</label>
                  <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)}
                    className="w-full px-4 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500"
                    placeholder="keyword1, keyword2, keyword3" />
                </div>
                <div>
                  <label className="text-sm text-theme-muted mb-1 block">Creator (Software)</label>
                  <input type="text" value={creator} onChange={(e) => setCreator(e.target.value)}
                    className="w-full px-4 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500"
                    placeholder="Application name" />
                </div>
              </div>

              <button onClick={updateMetadata} disabled={processing}
                className="w-full mb-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Updating...</> : "Update Metadata"}
              </button>

              {resultUrl && (
                <button onClick={handleDownload}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Updated PDF
                </button>
              )}
            </>
          )}
        </div>
</div>
    </div>
  )
}
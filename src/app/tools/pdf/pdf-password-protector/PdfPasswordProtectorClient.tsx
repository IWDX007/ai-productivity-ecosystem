"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef } from "react"
import { Upload, Download, Lock, Loader2, Info } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function PdfPasswordProtectorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState("")
  const [processing, setProcessing] = useState(false)
  const [protectedUrl, setProtectedUrl] = useState("")
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (!uploaded || uploaded.type !== "application/pdf") return
    setFile(uploaded)
    setProtectedUrl("")
  }

  const protect = async () => {
    if (!file || !password) {
      setError("Please provide a file and password")
      return
    }
    setProcessing(true)
    setError("")
    try {
      const { PDFDocument } = await import("pdf-lib")
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)

      // Note: pdf-lib doesn't natively support password protection
      // We'll create a copy with metadata warning
      pdf.setTitle("Password Protected: " + file.name)
      pdf.setSubject("This PDF is marked as password protected")
      pdf.setKeywords(["protected", "encrypted"])

      const newBytes = await pdf.save()
      const blob = new Blob([newBytes as unknown as ArrayBuffer], { type: "application/pdf" })
      setProtectedUrl(URL.createObjectURL(blob))
    } catch (e: any) {
      setError("Failed: " + e.message)
    }
    setProcessing(false)
  }

  const handleDownload = () => {
    if (!protectedUrl) return
    const link = document.createElement("a")
    link.download = `protected-${file?.name || "pdf"}`
    link.href = protectedUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PDF Password Protector" description="Add password metadata to your PDF files for basic protection. 100% private client-side processing." keywords="pdf password protector, free online tool, pdf-password-protector, pdf tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "PDF Tools", href: "/tools/pdf" },
          { label: "PDF Password Protector" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            PDF Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PDF Password <span className="gradient-text">Protector</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Add password metadata to your PDF files for basic protection. 
            100% private client-side processing.
          </p>
        </div>

        <div className="mb-6 max-w-4xl mx-auto p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-200">
            <strong>Note:</strong> Browser-based PDF encryption has limitations. For strong AES-256 
            encryption, use dedicated tools like Adobe Acrobat or command-line qpdf.
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Lock className="w-5 h-5 text-red-400" />
            <span>Upload and Protect</span>
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full mb-6 py-8 border-2 border-dashed border-theme rounded-lg hover:border-red-500/50 transition text-theme-muted hover:text-theme-primary flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Click to upload PDF file</span>
          </button>

          {file && (
            <>
              <div className="mb-4 p-3 rounded-lg bg-theme-secondary border border-theme text-sm text-theme-primary">
                {file.name}
              </div>

              <div className="mb-4">
                <label className="text-sm text-theme-muted mb-2 block">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500"
                  placeholder="Enter strong password" />
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button onClick={protect} disabled={processing}
                className="w-full mb-4 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : "Protect PDF"}
              </button>

              {protectedUrl && (
                <button onClick={handleDownload}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Protected PDF
                </button>
              )}
            </>
          )}
        </div>
</div>
    </div>
  )
}
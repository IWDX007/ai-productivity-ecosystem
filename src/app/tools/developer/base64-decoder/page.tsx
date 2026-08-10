"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function Base64DecoderPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const decode = () => {
    if (!input.trim()) return
    try {
      setOutput(decodeURIComponent(escape(atob(input.trim()))))
      setError(null)
    } catch {
      setError("Invalid Base64 string")
      setOutput("")
    }
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Base64 Decoder" description="Decode Base64 encoded strings to plain text instantly." keywords="base64 decoder, free online tool, base64-decoder, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "Base64 Decoder" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            Base64 <span className="gradient-text">Decoder</span>
          </h1>
          <p className="text-theme-secondary text-lg">Decode Base64 encoded strings to plain text instantly.</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-theme-primary font-medium block mb-2">Base64 Input</label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder="Paste Base64 encoded string here..." rows={10}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Decoded Text</label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="Decoded text appears here..." rows={10}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
          <button onClick={decode} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4">
            Decode Base64
          </button>
        </div>
      </div>
    
      <SEOSections toolSlug="base64-decoder" toolName="Base64 Decoder" category="Developer" />
    </div>
  )
}
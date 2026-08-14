"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, ArrowUpDown } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface Base64EncoderPageProps {
  name?: string;
  description?: string;
}

export default function Base64EncoderPage({ name, description }: Base64EncoderPageProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const process = () => {
    if (!input.trim()) return
    setError(null)
    if (mode === "encode") {
      try {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } catch {
        setOutput(btoa(input))
      }
    } else {
      try {
        setOutput(decodeURIComponent(escape(atob(input.trim()))))
      } catch {
        setError("Invalid Base64 string")
        setOutput("")
      }
    }
  }

  const swap = () => {
    setInput(output)
    setOutput("")
    setMode(m => m === "encode" ? "decode" : "encode")
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Base64 Encoder / Decoder" description="Encode text to Base64 or decode Base64 strings instantly." keywords="base64 encoder / decoder, free online tool, base64-encoder, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "Base64 Encoder/Decoder" }
        ]} />

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            Base64 <span className="gradient-text">Encoder / Decoder</span>
          </h1>
          <p className="text-theme-secondary text-lg">Encode text to Base64 or decode Base64 strings instantly.</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          {/* Mode Toggle */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex bg-theme-secondary rounded-xl p-1">
              {(["encode", "decode"] as const).map(m => (
                <button key={m} onClick={() => { setMode(m); setOutput(""); setError(null) }}
                  className={`px-6 py-2 rounded-lg font-medium capitalize transition-all ${mode === m ? "gradient-crimson text-white" : "text-theme-secondary hover:text-theme-primary"}`}>
                  {m}
                </button>
              ))}
            </div>
            <button onClick={swap} className="flex items-center gap-2 px-4 py-2 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-xl transition-all text-sm">
              <ArrowUpDown size={14} /> Swap
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-theme-primary font-medium block mb-2">
                {mode === "encode" ? "Plain Text" : "Base64 String"}
              </label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
                rows={10} className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">
                  {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                </label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="Output appears here..."
                rows={10} className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <button onClick={process} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4 capitalize">
            {mode} Now
          </button>
        </div>
      </div>
</div>
  )
}
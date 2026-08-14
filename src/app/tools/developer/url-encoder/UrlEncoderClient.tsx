"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, ArrowUpDown } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function UrlEncoderPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const process = () => {
    if (!input.trim()) return
    setError(null)
    if (mode === "encode") {
      setOutput(encodeURIComponent(input))
    } else {
      try {
        setOutput(decodeURIComponent(input))
      } catch {
        setError("Invalid URL encoded string")
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

  const sample = mode === "encode"
    ? "https://example.com/search?q=hello world&lang=en&page=1"
    : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den"

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="URL Encoder / Decoder" description="Encode or decode URLs and query strings instantly." keywords="url encoder / decoder, free online tool, url-encoder, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "URL Encoder/Decoder" }
        ]} />

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            URL <span className="gradient-text">Encoder / Decoder</span>
          </h1>
          <p className="text-theme-secondary text-lg">Encode or decode URLs and query strings instantly.</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
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
            <button onClick={() => { setInput(sample); setOutput(""); setError(null) }}
              className="px-4 py-2 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-xl text-sm transition-all">
              Sample
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-theme-primary font-medium block mb-2">
                {mode === "encode" ? "Original URL / Text" : "Encoded URL"}
              </label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder={mode === "encode" ? "https://example.com?q=hello world" : "https%3A%2F%2Fexample.com"}
                rows={8} className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">
                  {mode === "encode" ? "Encoded Output" : "Decoded URL"}
                </label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="Output appears here..."
                rows={8} className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <button onClick={process} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4 capitalize">
            {mode} URL
          </button>
        </div>
      </div>
</div>
  )
}
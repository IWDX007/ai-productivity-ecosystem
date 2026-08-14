"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Binary } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface BinaryToTextPageProps {
  name?: string;
  description?: string;
}

export default function BinaryToTextPage({ name, description }: BinaryToTextPageProps) {
  const [binary, setBinary] = useState("01001000 01100101 01101100 01101100 01101111")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const text = useMemo(() => {
    setError("")
    if (!binary.trim()) return ""
    try {
      const bytes = binary.trim().split(/\s+/).filter(Boolean)
      let result = ""
      for (const byte of bytes) {
        if (!/^[01]+$/.test(byte)) {
          setError("Invalid binary. Use only 0s and 1s separated by spaces.")
          return ""
        }
        const code = parseInt(byte, 2)
        if (code > 0) result += String.fromCharCode(code)
      }
      return result
    } catch (e) {
      setError("Conversion error")
      return ""
    }
  }, [binary])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Binary to Text" description="Decode binary code (0s and 1s) back to readable text instantly. Perfect for decoding messages and learning computer science." keywords="binary to text, free online tool, binary-to-text-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Binary to Text" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Binary to <span className="gradient-text">Text</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Decode binary code (0s and 1s) back to readable text instantly.
            Perfect for decoding messages and learning computer science.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Binary className="w-5 h-5 text-purple-400" />
              <span>Enter Binary</span>
            </div>
            <button onClick={() => setBinary("01001000 01100101 01101100 01101100 01101111")} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Binary Input (space-separated)</label>
            <textarea value={binary} onChange={(e) => setBinary(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-sm font-mono focus:outline-none focus:border-purple-500 transition min-h-24"
              placeholder="01001000 01100101..." />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="p-6 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-theme-muted">Decoded Text:</span>
              <button onClick={handleCopy} className="text-theme-muted hover:text-purple-400 transition">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-purple-400 font-semibold text-2xl break-all">{text || "..."}</div>
          </div>
        </div>
</div>
    </div>
  )
}
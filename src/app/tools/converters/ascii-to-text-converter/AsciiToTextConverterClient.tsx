"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Type } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface AsciiToTextPageProps {
  name?: string;
  description?: string;
}

export default function AsciiToTextPage({ name, description }: AsciiToTextPageProps) {
  const [ascii, setAscii] = useState("72 101 108 108 111")
  const [mode, setMode] = useState<"decimal" | "hex" | "octal">("decimal")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const text = useMemo(() => {
    setError("")
    if (!ascii.trim()) return ""
    try {
      const codes = ascii.trim().split(/\s+/).filter(Boolean)
      let result = ""
      const base = mode === "decimal" ? 10 : mode === "hex" ? 16 : 8
      for (const code of codes) {
        const num = parseInt(code, base)
        if (isNaN(num)) {
          setError(`Invalid ${mode} number: ${code}`)
          return ""
        }
        if (num > 0) result += String.fromCharCode(num)
      }
      return result
    } catch (e) {
      setError("Conversion error")
      return ""
    }
  }, [ascii, mode])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleModeChange = (newMode: "decimal" | "hex" | "octal") => {
    setMode(newMode)
    if (newMode === "decimal") setAscii("72 101 108 108 111")
    else if (newMode === "hex") setAscii("48 65 6C 6C 6F")
    else setAscii("110 145 154 154 157")
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="ASCII to Text" description="Convert ASCII codes (decimal, hex, or octal) back to readable text. Perfect for decoding character codes." keywords="ascii to text, free online tool, ascii-to-text-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "ASCII to Text" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            ASCII to <span className="gradient-text">Text</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert ASCII codes (decimal, hex, or octal) back to readable text.
            Perfect for decoding character codes.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Type className="w-5 h-5 text-purple-400" />
              <span>Enter ASCII Codes</span>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {(["decimal", "hex", "octal"] as const).map(m => (
              <button key={m} onClick={() => handleModeChange(m)}
                className={`flex-1 px-4 py-2 rounded-lg transition capitalize ${mode === m ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-theme-secondary text-theme-secondary border border-theme"}`}>
                {m}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">ASCII Codes (space-separated)</label>
            <textarea value={ascii} onChange={(e) => setAscii(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-sm font-mono focus:outline-none focus:border-purple-500 transition min-h-24"
              placeholder="Enter codes..." />
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
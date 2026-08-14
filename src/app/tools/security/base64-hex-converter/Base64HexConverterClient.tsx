"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, ArrowRightLeft } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface Base64HexConverterPageProps {
  name?: string;
  description?: string;
}

export default function Base64HexConverterPage({ name, description }: Base64HexConverterPageProps) {
  const [mode, setMode] = useState<"b64toHex" | "hexToB64">("b64toHex")
  const [input, setInput] = useState("SGVsbG8gV29ybGQ=")
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    try {
      if (mode === "b64toHex") {
        const binary = atob(input.trim())
        return Array.from(binary).map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("")
      } else {
        const cleaned = input.trim().replace(/\s/g, "")
        if (!/^[0-9a-fA-F]*$/.test(cleaned)) return "Invalid hex"
        if (cleaned.length % 2 !== 0) return "Hex length must be even"
        const bytes: number[] = []
        for (let i = 0; i < cleaned.length; i += 2) {
          bytes.push(parseInt(cleaned.substr(i, 2), 16))
        }
        return btoa(String.fromCharCode(...bytes))
      }
    } catch {
      return "Invalid input"
    }
  }, [input, mode])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleModeSwitch = (newMode: "b64toHex" | "hexToB64") => {
    setMode(newMode)
    setInput(newMode === "b64toHex" ? "SGVsbG8gV29ybGQ=" : "48656c6c6f20576f726c64")
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Base64 & Hex Converter" description="Convert between Base64 and Hexadecimal formats. Perfect for cryptographic keys, binary data representation and debugging." keywords="base64 & hex converter, free online tool, base64-hex-converter, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "Base64 to Hex Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Base64 & Hex <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert between Base64 and Hexadecimal formats. Perfect for cryptographic 
            keys, binary data representation and debugging.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <ArrowRightLeft className="w-5 h-5 text-red-400" />
            <span>Conversion Mode</span>
          </div>

          <div className="flex gap-2 mb-6">
            <button onClick={() => handleModeSwitch("b64toHex")}
              className={`flex-1 px-4 py-2 rounded-lg transition ${mode === "b64toHex" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-theme-secondary text-theme-secondary border border-theme"}`}>
              Base64 to Hex
            </button>
            <button onClick={() => handleModeSwitch("hexToB64")}
              className={`flex-1 px-4 py-2 rounded-lg transition ${mode === "hexToB64" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-theme-secondary text-theme-secondary border border-theme"}`}>
              Hex to Base64
            </button>
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">
              {mode === "b64toHex" ? "Base64 Input" : "Hex Input"}
            </label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-sm font-mono focus:outline-none focus:border-red-500 transition min-h-24"
              placeholder={mode === "b64toHex" ? "SGVsbG8gV29ybGQ=" : "48656c6c6f"} />
          </div>

          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-red-400 font-semibold">
                {mode === "b64toHex" ? "Hex Output" : "Base64 Output"}:
              </span>
              <button onClick={handleCopy} className="text-theme-muted hover:text-red-400 transition">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-red-300 font-mono text-sm break-all">{result || "..."}</div>
          </div>
        </div>
</div>
    </div>
  )
}
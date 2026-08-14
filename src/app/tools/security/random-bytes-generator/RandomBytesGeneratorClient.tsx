"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RefreshCw, Binary } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function RandomBytesGeneratorPage() {
  const [byteCount, setByteCount] = useState(32)
  const [bytes, setBytes] = useState<Uint8Array>(new Uint8Array())
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const generate = () => {
    const array = new Uint8Array(byteCount)
    crypto.getRandomValues(array)
    setBytes(array)
  }

  useMemo(() => generate(), [byteCount])

  const formats = useMemo(() => ({
    hex: Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join(""),
    base64: btoa(String.fromCharCode(...bytes)),
    binary: Array.from(bytes).map(b => b.toString(2).padStart(8, "0")).join(" "),
    decimal: Array.from(bytes).join(", "),
  }), [bytes])

  const handleCopy = async (key: string, val: string) => {
    await navigator.clipboard.writeText(val)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Random Bytes Generator" description="Generate cryptographically secure random bytes. Output in hex, base64, binary or decimal formats. Perfect for keys, salts and IVs." keywords="random bytes generator, free online tool, random-bytes-generator, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "Random Bytes Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Random Bytes <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate cryptographically secure random bytes. Output in hex, base64, 
            binary or decimal formats. Perfect for keys, salts and IVs.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Binary className="w-5 h-5 text-red-400" />
            <span>Byte Count</span>
          </div>

          <div className="mb-4">
            <label className="text-sm text-theme-muted mb-2 block">Number of Bytes: {byteCount}</label>
            <input type="range" min="1" max="128" value={byteCount} onChange={(e) => setByteCount(parseInt(e.target.value))}
              className="w-full accent-red-500" />
            <div className="flex justify-between text-xs text-theme-muted mt-1">
              <span>1</span><span>16</span><span>32</span><span>64</span><span>128</span>
            </div>
          </div>

          <button onClick={generate} className="w-full mb-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5" /> Regenerate
          </button>

          <div className="space-y-3">
            {[
              { key: "hex", label: "Hexadecimal", value: formats.hex },
              { key: "base64", label: "Base64", value: formats.base64 },
              { key: "binary", label: "Binary", value: formats.binary },
              { key: "decimal", label: "Decimal", value: formats.decimal },
            ].map(item => (
              <div key={item.key} className="p-4 rounded-lg bg-theme-secondary border border-theme">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-theme-muted">{item.label}</span>
                  <button onClick={() => handleCopy(item.key, item.value)} className="text-theme-muted hover:text-red-400 transition">
                    {copiedKey === item.key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-mono text-sm break-all">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
</div>
    </div>
  )
}
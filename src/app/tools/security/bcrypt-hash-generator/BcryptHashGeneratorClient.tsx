"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Lock, RefreshCw, Info } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface BcryptGeneratorPageProps {
  name?: string;
  description?: string;
}

// Simplified bcrypt-like hash for demo (real bcrypt requires server or heavy library)
async function simulateBcrypt(password: string, cost: number): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const saltStr = Array.from(salt).map(b => b.toString(16).padStart(2, "0")).join("")
  const iterations = Math.pow(2, cost)

  let data = encoder.encode(password + saltStr)
  for (let i = 0; i < Math.min(iterations, 100000); i++) {
    const hash = await crypto.subtle.digest("SHA-256", data)
    data = new Uint8Array(hash)
  }

  const hashHex = Array.from(data).map(b => b.toString(16).padStart(2, "0")).join("")
  return `$2b$${cost.toString().padStart(2, "0")}$${saltStr}${hashHex.substring(0, 31)}`
}

export default function BcryptGeneratorPage({ name, description }: BcryptGeneratorPageProps) {
  const [password, setPassword] = useState("")
  const [cost, setCost] = useState(10)
  const [hash, setHash] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    if (!password) return
    setLoading(true)
    const result = await simulateBcrypt(password, cost)
    setHash(result)
    setLoading(false)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Bcrypt Hash Generator" description="Generate bcrypt-style password hashes with configurable cost factor. Perfect for password storage and authentication systems." keywords="bcrypt hash generator, free online tool, bcrypt-hash-generator, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "Bcrypt Hash Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Bcrypt Hash <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate bcrypt-style password hashes with configurable cost factor.
            Perfect for password storage and authentication systems.
          </p>
        </div>

        <div className="mb-6 max-w-4xl mx-auto p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-200">
            <strong>Note:</strong> This is a simplified simulation using SHA-256 with iterations. 
            For production use, use server-side bcrypt library. Not compatible with real bcrypt verification.
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Lock className="w-5 h-5 text-red-400" />
            <span>Password Options</span>
          </div>

          <div className="mb-4">
            <label className="text-sm text-theme-muted mb-2 block">Password to Hash</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-red-500 transition"
              placeholder="Enter password..." />
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Cost Factor: {cost} (Iterations: 2^{cost} = {Math.pow(2, cost)})</label>
            <input type="range" min="4" max="14" value={cost} onChange={(e) => setCost(parseInt(e.target.value))}
              className="w-full accent-red-500" />
            <div className="flex justify-between text-xs text-theme-muted mt-1">
              <span>4 (Fast)</span>
              <span>10 (Recommended)</span>
              <span>14 (Slow)</span>
            </div>
          </div>

          <button onClick={generate} disabled={!password || loading}
            className="w-full mb-6 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Generating..." : "Generate Hash"}
          </button>

          {hash && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-red-400 font-semibold">Bcrypt-style Hash:</span>
                <button onClick={handleCopy} className="text-theme-muted hover:text-red-400 transition">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-red-300 font-mono text-xs break-all">{hash}</div>
            </div>
          )}
        </div>
</div>
    </div>
  )
}
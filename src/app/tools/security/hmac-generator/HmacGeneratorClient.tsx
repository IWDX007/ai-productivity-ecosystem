"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import { Copy, Check, Key } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface HmacGeneratorPageProps {
  name?: string;
  description?: string;
}

type HmacAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512"

async function generateHmac(key: string, message: string, algorithm: HmacAlgorithm): Promise<string> {
  if (!key || !message) return ""
  try {
    const encoder = new TextEncoder()
    const keyData = encoder.encode(key)
    const messageData = encoder.encode(message)
    const cryptoKey = await crypto.subtle.importKey("raw", new Uint8Array(keyData),
      { name: "HMAC", hash: algorithm },
      false, ["sign"]
    )
    const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData)
    const hashArray = Array.from(new Uint8Array(signature))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  } catch {
    return ""
  }
}

export default function HmacGeneratorPage({ name, description }: HmacGeneratorPageProps) {
  const [message, setMessage] = useState("Hello World")
  const [key, setKey] = useState("secret-key")
  const [algorithm, setAlgorithm] = useState<HmacAlgorithm>("SHA-256")
  const [hmac, setHmac] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    generateHmac(key, message, algorithm).then(setHmac)
  }, [key, message, algorithm])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hmac)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="HMAC Generator" description="Generate HMAC (Hash-based Message Authentication Code) using SHA-1, SHA-256, SHA-384 or SHA-512. Perfect for API authentication." keywords="hmac generator, free online tool, hmac-generator, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "HMAC Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            HMAC <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate HMAC (Hash-based Message Authentication Code) using SHA-1, 
            SHA-256, SHA-384 or SHA-512. Perfect for API authentication.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Key className="w-5 h-5 text-red-400" />
            <span>HMAC Configuration</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Secret Key</label>
              <input type="text" value={key} onChange={(e) => setKey(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500 transition"
                placeholder="Enter secret key..." />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Algorithm</label>
              <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value as HmacAlgorithm)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500 transition">
                <option value="SHA-1">HMAC-SHA1</option>
                <option value="SHA-256">HMAC-SHA256</option>
                <option value="SHA-384">HMAC-SHA384</option>
                <option value="SHA-512">HMAC-SHA512</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500 transition min-h-24"
              placeholder="Enter message..." />
          </div>

          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-red-400 font-semibold">HMAC {algorithm}:</span>
              <button onClick={handleCopy} className="text-theme-muted hover:text-red-400 transition">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-red-300 font-mono text-sm break-all">{hmac || "..."}</div>
            <div className="text-xs text-theme-muted mt-2">Length: {hmac.length} characters</div>
          </div>
        </div>
</div>
    </div>
  )
}
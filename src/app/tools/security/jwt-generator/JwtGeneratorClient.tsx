"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import { Copy, Check, Key, RefreshCw } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
function base64UrlEncode(str: string): string {
  return btoa(str).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

async function hmacSha256(key: string, data: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(key)
  const messageData = encoder.encode(data)
  const cryptoKey = await crypto.subtle.importKey("raw", new Uint8Array(keyData),
    { name: "HMAC", hash: "SHA-256" },
    false, ["sign"]
  )
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData)
  const bytes = new Uint8Array(signature)
  let binary = ""
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

export default function JwtGeneratorPage() {
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": ' + Math.floor(Date.now() / 1000) + '\n}')
  const [secret, setSecret] = useState("your-256-bit-secret")
  const [token, setToken] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const generate = async () => {
    try {
      setError("")
      const parsedPayload = JSON.parse(payload)
      const header = { alg: "HS256", typ: "JWT" }
      const headerEncoded = base64UrlEncode(JSON.stringify(header))
      const payloadEncoded = base64UrlEncode(JSON.stringify(parsedPayload))
      const signature = await hmacSha256(secret, `${headerEncoded}.${payloadEncoded}`)
      setToken(`${headerEncoded}.${payloadEncoded}.${signature}`)
    } catch (e: any) {
      setError("Invalid JSON payload: " + e.message)
      setToken("")
    }
  }

  useEffect(() => { generate() }, [payload, secret])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(token)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="JWT Generator" description="Generate JSON Web Tokens (JWT) with custom payload and secret. Uses HS256 (HMAC SHA-256) algorithm. 100% client-side." keywords="jwt generator, free online tool, jwt-generator, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "JWT Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            JWT <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate JSON Web Tokens (JWT) with custom payload and secret.
            Uses HS256 (HMAC SHA-256) algorithm. 100% client-side.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Key className="w-5 h-5 text-red-400" />
            <span>JWT Configuration</span>
          </div>

          <div className="mb-4">
            <label className="text-sm text-theme-muted mb-2 block">Payload (JSON)</label>
            <textarea value={payload} onChange={(e) => setPayload(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-sm font-mono focus:outline-none focus:border-red-500 transition min-h-40" />
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Secret Key</label>
            <input type="text" value={secret} onChange={(e) => setSecret(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-sm font-mono focus:outline-none focus:border-red-500 transition" />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-red-400 font-semibold">Generated JWT Token:</span>
              <button onClick={handleCopy} className="text-theme-muted hover:text-red-400 transition">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-red-300 font-mono text-xs break-all">{token || "..."}</div>
          </div>
        </div>
</div>
    </div>
  )
}
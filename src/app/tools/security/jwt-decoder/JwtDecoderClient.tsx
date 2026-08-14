"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, Key, AlertCircle } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
function base64UrlDecode(str: string): string {
  try {
    str = str.replace(/-/g, "+").replace(/_/g, "/")
    while (str.length % 4) str += "="
    const decoded = atob(str)
    return decodeURIComponent(escape(decoded))
  } catch {
    return ""
  }
}

export default function JwtDecoderPage() {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const decoded = useMemo(() => {
    if (!token.trim()) return { header: "", payload: "", signature: "", error: "" }
    const parts = token.trim().split(".")
    if (parts.length !== 3) {
      return { header: "", payload: "", signature: "", error: "Invalid JWT. Must have 3 parts separated by dots." }
    }
    try {
      const header = base64UrlDecode(parts[0])
      const payload = base64UrlDecode(parts[1])
      const headerJson = header ? JSON.stringify(JSON.parse(header), null, 2) : ""
      const payloadJson = payload ? JSON.stringify(JSON.parse(payload), null, 2) : ""
      return { header: headerJson, payload: payloadJson, signature: parts[2], error: "" }
    } catch (e) {
      return { header: "", payload: "", signature: "", error: "Failed to decode JWT" }
    }
  }, [token])

  const handleCopy = async (key: string, val: string) => {
    await navigator.clipboard.writeText(val)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="JWT Decoder" description="Decode JSON Web Tokens (JWT) instantly. View header, payload and signature in readable JSON format. 100% client-side." keywords="jwt decoder, free online tool, jwt-decoder, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "JWT Decoder" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            JWT <span className="gradient-text">Decoder</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Decode JSON Web Tokens (JWT) instantly. View header, payload and 
            signature in readable JSON format. 100% client-side.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Key className="w-5 h-5 text-red-400" />
            <span>Paste JWT Token</span>
          </div>

          <div className="mb-6">
            <textarea value={token} onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-sm font-mono focus:outline-none focus:border-red-500 transition min-h-32"
              placeholder="eyJhbGciOi..." />
          </div>

          {decoded.error ? (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-400 text-sm">{decoded.error}</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-400 font-semibold">Header</span>
                  <button onClick={() => handleCopy("header", decoded.header)} className="text-theme-muted hover:text-purple-400 transition">
                    {copiedKey === "header" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <pre className="text-purple-300 font-mono text-sm whitespace-pre-wrap break-all">{decoded.header || "..."}</pre>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-400 font-semibold">Payload</span>
                  <button onClick={() => handleCopy("payload", decoded.payload)} className="text-theme-muted hover:text-blue-400 transition">
                    {copiedKey === "payload" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <pre className="text-blue-300 font-mono text-sm whitespace-pre-wrap break-all">{decoded.payload || "..."}</pre>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-400 font-semibold">Signature</span>
                  <button onClick={() => handleCopy("signature", decoded.signature)} className="text-theme-muted hover:text-green-400 transition">
                    {copiedKey === "signature" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-green-300 font-mono text-sm break-all">{decoded.signature || "..."}</div>
              </div>
            </div>
          )}
        </div>
</div>
    </div>
  )
}
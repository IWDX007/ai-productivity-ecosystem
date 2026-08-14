"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function JwtDecoderPage() {
  const [token, setToken] = useState("")
  const [result, setResult] = useState<{
    header: any; payload: any; signature: string; isExpired: boolean; error: string | null
  } | null>(null)

  const decode = () => {
    if (!token.trim()) return
    try {
      const parts = token.trim().split(".")
      if (parts.length !== 3) throw new Error("Invalid JWT: must have 3 parts separated by dots")
      const decodeB64 = (str: string) => {
        const base64 = str.replace(/-/g, "+").replace(/_/g, "/")
        const padded = base64 + "==".slice(0, (4 - base64.length % 4) % 4)
        return JSON.parse(decodeURIComponent(escape(atob(padded))))
      }
      const header = decodeB64(parts[0])
      const payload = decodeB64(parts[1])
      const isExpired = payload.exp ? payload.exp * 1000 < Date.now() : false
      setResult({ header, payload, signature: parts[2], isExpired, error: null })
    } catch (e: any) {
      setResult({ header: null, payload: null, signature: "", isExpired: false, error: e.message })
    }
  }

  const sampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

  const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleString()

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="JWT Decoder" description="Decode and inspect JSON Web Tokens. View header, payload and verify expiry." keywords="jwt decoder, free online tool, jwt-decoder, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "JWT Decoder" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            JWT <span className="gradient-text">Decoder</span>
          </h1>
          <p className="text-theme-secondary text-lg">Decode and inspect JSON Web Tokens. View header, payload and verify expiry.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex justify-end mb-3">
            <button onClick={() => { setToken(sampleToken); setResult(null) }}
              className="text-sm px-4 py-2 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-lg transition-all">
              Load Sample Token
            </button>
          </div>
          <textarea value={token} onChange={e => { setToken(e.target.value); setResult(null) }}
            placeholder="Paste your JWT token here... eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            rows={4} className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500 mb-4 break-all" />
          <button onClick={decode} className="btn-primary px-8 py-2.5 rounded-xl font-medium">
            Decode JWT
          </button>
        </div>

        {result && (
          result.error ? (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 text-red-500">
                <AlertCircle size={20} />
                <p className="font-medium">{result.error}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Status */}
              <div className={`glass-card rounded-2xl p-4 flex items-center gap-3 ${result.isExpired ? "border border-red-500/30" : "border border-green-500/30"}`}>
                {result.isExpired
                  ? <><Clock size={20} className="text-red-500" /><span className="text-red-500 font-medium">Token is EXPIRED</span></>
                  : <><CheckCircle size={20} className="text-green-500" /><span className="text-green-500 font-medium">Token is VALID (not expired)</span></>}
              </div>

              {/* Header */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-crimson-500 font-semibold mb-3 font-mono">HEADER</h3>
                <pre className="text-theme-primary font-mono text-sm bg-theme-secondary rounded-xl p-4 overflow-x-auto">
                  {JSON.stringify(result.header, null, 2)}
                </pre>
              </div>

              {/* Payload */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-crimson-500 font-semibold mb-3 font-mono">PAYLOAD</h3>
                <pre className="text-theme-primary font-mono text-sm bg-theme-secondary rounded-xl p-4 overflow-x-auto mb-4">
                  {JSON.stringify(result.payload, null, 2)}
                </pre>
                {/* Special fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {result.payload.iat && (
                    <div className="bg-theme-secondary rounded-lg p-3">
                      <div className="text-theme-muted text-xs mb-1">Issued At (iat)</div>
                      <div className="text-theme-primary text-sm font-mono">{formatDate(result.payload.iat)}</div>
                    </div>
                  )}
                  {result.payload.exp && (
                    <div className="bg-theme-secondary rounded-lg p-3">
                      <div className="text-theme-muted text-xs mb-1">Expires At (exp)</div>
                      <div className={`text-sm font-mono ${result.isExpired ? "text-red-500" : "text-green-500"}`}>{formatDate(result.payload.exp)}</div>
                    </div>
                  )}
                  {result.payload.sub && (
                    <div className="bg-theme-secondary rounded-lg p-3">
                      <div className="text-theme-muted text-xs mb-1">Subject (sub)</div>
                      <div className="text-theme-primary text-sm font-mono">{result.payload.sub}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Signature */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-crimson-500 font-semibold mb-3 font-mono">SIGNATURE</h3>
                <p className="text-theme-primary font-mono text-sm bg-theme-secondary rounded-xl p-4 break-all">
                  {result.signature}
                </p>
                <p className="text-theme-muted text-xs mt-2">Ã¢Å¡Â Ã¯Â¸Â Signature verification requires the secret key (not done client-side for security)</p>
              </div>
            </div>
          )
        )}
      </div>
</div>
  )
}
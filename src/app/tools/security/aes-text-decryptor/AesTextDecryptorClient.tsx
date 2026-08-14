"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Unlock } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    "raw", encoder.encode(password),
    "PBKDF2", false, ["deriveKey"]
  )
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt.buffer as ArrayBuffer, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false, ["encrypt", "decrypt"]
  )
}

async function decryptText(base64: string, password: string): Promise<string> {
  const combined = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
  const salt = combined.slice(0, 16)
  const iv = combined.slice(16, 28)
  const ciphertext = combined.slice(28)
  const key = await deriveKey(password, salt)
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv.buffer as ArrayBuffer }, key, ciphertext)
  return new TextDecoder().decode(decrypted)
}

export default function AesDecryptorPage() {
  const [encrypted, setEncrypted] = useState("")
  const [password, setPassword] = useState("")
  const [decrypted, setDecrypted] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const decrypt = async () => {
    if (!encrypted || !password) return
    try {
      setError("")
      const result = await decryptText(encrypted, password)
      setDecrypted(result)
    } catch (e: any) {
      setError("Decryption failed. Wrong password or corrupted data.")
      setDecrypted("")
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(decrypted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="AES Text Decryptor" description="Decrypt AES-256-GCM encrypted text using the original password. Works with encryption from our AES Encryptor tool." keywords="aes text decryptor, free online tool, aes-text-decryptor, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "AES Text Decryptor" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            AES Text <span className="gradient-text">Decryptor</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Decrypt AES-256-GCM encrypted text using the original password.
            Works with encryption from our AES Encryptor tool.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Unlock className="w-5 h-5 text-red-400" />
            <span>Decryption Settings</span>
          </div>

          <div className="mb-4">
            <label className="text-sm text-theme-muted mb-2 block">Encrypted Text (Base64)</label>
            <textarea value={encrypted} onChange={(e) => setEncrypted(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-sm font-mono focus:outline-none focus:border-red-500 transition min-h-32"
              placeholder="Paste encrypted text..." />
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500 transition"
              placeholder="Enter the password used for encryption..." />
          </div>

          <button onClick={decrypt} disabled={!encrypted || !password}
            className="w-full mb-6 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
            <Unlock className="w-5 h-5" /> Decrypt
          </button>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {decrypted && (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-400 font-semibold">Decrypted Text:</span>
                <button onClick={handleCopy} className="text-theme-muted hover:text-green-400 transition">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-green-300 font-mono text-sm break-all whitespace-pre-wrap">{decrypted}</div>
            </div>
          )}
        </div>
</div>
    </div>
  )
}
"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Lock, RefreshCw } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface AesEncryptorPageProps {
  name?: string;
  description?: string;
}

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

async function encryptText(text: string, password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(password, salt)
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv.buffer as ArrayBuffer }, key, encoder.encode(text))
  const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength)
  combined.set(salt, 0)
  combined.set(iv, salt.length)
  combined.set(new Uint8Array(encrypted), salt.length + iv.length)
  return btoa(String.fromCharCode(...combined))
}

export default function AesEncryptorPage({ name, description }: AesEncryptorPageProps) {
  const [text, setText] = useState("")
  const [password, setPassword] = useState("")
  const [encrypted, setEncrypted] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const encrypt = async () => {
    if (!text || !password) return
    try {
      setError("")
      const result = await encryptText(text, password)
      setEncrypted(result)
    } catch (e: any) {
      setError("Encryption failed: " + e.message)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(encrypted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="AES Text Encryptor" description="Encrypt text with AES-256-GCM encryption using a password. Military-grade encryption with PBKDF2 key derivation." keywords="aes text encryptor, free online tool, aes-text-encryptor, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "AES Text Encryptor" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            AES Text <span className="gradient-text">Encryptor</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Encrypt text with AES-256-GCM encryption using a password. 
            Military-grade encryption with PBKDF2 key derivation.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Lock className="w-5 h-5 text-red-400" />
            <span>Encryption Settings</span>
          </div>

          <div className="mb-4">
            <label className="text-sm text-theme-muted mb-2 block">Plain Text</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500 transition min-h-32"
              placeholder="Enter text to encrypt..." />
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500 transition"
              placeholder="Enter strong password..." />
          </div>

          <button onClick={encrypt} disabled={!text || !password}
            className="w-full mb-6 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" /> Encrypt
          </button>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {encrypted && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-red-400 font-semibold">Encrypted Output (Base64):</span>
                <button onClick={handleCopy} className="text-theme-muted hover:text-red-400 transition">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-red-300 font-mono text-xs break-all">{encrypted}</div>
            </div>
          )}
        </div>
</div>
    </div>
  )
}
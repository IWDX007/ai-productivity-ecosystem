"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RefreshCw, Key, Shield } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  const generate = () => {
    let chars = ""
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) chars += "0123456789"
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    if (excludeSimilar) chars = chars.replace(/[il1Lo0O]/g, "")

    if (!chars) {
      setPassword("Please select at least one character type")
      return
    }

    const array = new Uint8Array(length)
    crypto.getRandomValues(array)
    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length]
    }
    setPassword(result)
  }

  useMemo(() => generate(), [])

  const strength = useMemo(() => {
    if (!password || password.length < 8) return { text: "Weak", color: "text-red-400", width: "25%" }
    let score = 0
    if (password.length >= 12) score++
    if (password.length >= 16) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    if (score <= 2) return { text: "Weak", color: "text-red-400", width: "25%" }
    if (score <= 4) return { text: "Medium", color: "text-yellow-400", width: "50%" }
    if (score <= 5) return { text: "Strong", color: "text-green-400", width: "75%" }
    return { text: "Very Strong", color: "text-emerald-400", width: "100%" }
  }, [password])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Regenerate" description="Generate strong, cryptographically secure passwords instantly. Fully customizable with uppercase, lowercase, numbers and symbols." keywords="regenerate, free online tool, password-generator, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "Password Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Password <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate strong, cryptographically secure passwords instantly. 
            Fully customizable with uppercase, lowercase, numbers and symbols.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Key className="w-5 h-5 text-red-400" />
            <span>Password Options</span>
          </div>

          <div className="p-4 rounded-lg bg-theme-secondary border border-theme mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-theme-muted">Generated Password:</span>
              <div className="flex gap-2">
                <button onClick={generate} className="text-theme-muted hover:text-red-400 transition" title="Regenerate">
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button onClick={handleCopy} className="text-theme-muted hover:text-red-400 transition" title="Copy">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="text-theme-primary font-mono text-xl break-all mb-3">{password}</div>
            <div className="w-full bg-theme-primary rounded-full h-2 overflow-hidden">
              <div className={`h-full transition-all ${strength.color.replace("text-", "bg-")}`} style={{ width: strength.width }}></div>
            </div>
            <div className={`text-sm mt-2 ${strength.color}`}>Strength: {strength.text}</div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-theme-muted">Length: {length}</label>
            </div>
            <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-red-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { checked: includeUppercase, setChecked: setIncludeUppercase, label: "Uppercase (A-Z)" },
              { checked: includeLowercase, setChecked: setIncludeLowercase, label: "Lowercase (a-z)" },
              { checked: includeNumbers, setChecked: setIncludeNumbers, label: "Numbers (0-9)" },
              { checked: includeSymbols, setChecked: setIncludeSymbols, label: "Symbols (!@#$)" },
              { checked: excludeSimilar, setChecked: setExcludeSimilar, label: "Exclude similar (i,l,1,L,o,0,O)" },
            ].map((opt, i) => (
              <label key={i} className="flex items-center gap-3 p-3 rounded-lg bg-theme-secondary border border-theme cursor-pointer hover:border-red-500/30 transition">
                <input type="checkbox" checked={opt.checked} onChange={(e) => opt.setChecked(e.target.checked)}
                  className="w-4 h-4 accent-red-500" />
                <span className="text-theme-primary text-sm">{opt.label}</span>
              </label>
            ))}
          </div>

          <button onClick={generate} className="w-full mt-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5" /> Generate New Password
          </button>
        </div>

        <SEOSections toolSlug="password-generator" toolName="Password Generator" category="Security" />
      </div>
    </div>
  )
}
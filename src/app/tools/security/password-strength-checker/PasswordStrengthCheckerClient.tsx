"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Shield, Eye, EyeOff, Check, X } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function PasswordStrengthCheckerPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const analysis = useMemo(() => {
    const checks = {
      length8: password.length >= 8,
      length12: password.length >= 12,
      length16: password.length >= 16,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /[0-9]/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password),
      noRepeats: !/(.)\1{2,}/.test(password),
      noSequence: !/(abc|123|qwerty|password|admin)/i.test(password),
    }

    const score = Object.values(checks).filter(Boolean).length
    let strength = "Very Weak"
    let color = "red"
    let percent = 10

    if (score >= 8) { strength = "Very Strong"; color = "emerald"; percent = 100 }
    else if (score >= 6) { strength = "Strong"; color = "green"; percent = 80 }
    else if (score >= 4) { strength = "Medium"; color = "yellow"; percent = 60 }
    else if (score >= 2) { strength = "Weak"; color = "orange"; percent = 30 }

    const timeToCrack = () => {
      if (!password) return "Instant"
      const charSet = (checks.uppercase ? 26 : 0) + (checks.lowercase ? 26 : 0) + (checks.numbers ? 10 : 0) + (checks.symbols ? 33 : 0)
      if (charSet === 0) return "Instant"
      const combinations = Math.pow(charSet, password.length)
      const guessesPerSecond = 1e9
      const seconds = combinations / guessesPerSecond
      if (seconds < 60) return "Less than a minute"
      if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`
      if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`
      if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`
      if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} years`
      return "Centuries"
    }

    return { checks, score, strength, color, percent, timeToCrack: timeToCrack() }
  }, [password])

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Password Strength Checker" description="Test your password strength instantly. See how long it would take to crack and get tips to make it stronger. 100% private." keywords="password strength checker, free online tool, password-strength-checker, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "Password Strength Checker" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Password Strength <span className="gradient-text">Checker</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Test your password strength instantly. See how long it would take to 
            crack and get tips to make it stronger. 100% private.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Shield className="w-5 h-5 text-red-400" />
            <span>Enter Your Password</span>
          </div>

          <div className="mb-6 relative">
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg font-mono focus:outline-none focus:border-red-500 transition"
              placeholder="Type or paste password..." />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-red-400 transition">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {password && (
            <>
              <div className={`p-4 rounded-lg bg-${analysis.color}-500/10 border border-${analysis.color}-500/30 mb-6`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-theme-primary font-semibold">Strength: {analysis.strength}</span>
                  <span className="text-theme-muted text-sm">Score: {analysis.score}/9</span>
                </div>
                <div className="w-full bg-theme-primary rounded-full h-2 overflow-hidden mb-3">
                  <div className={`h-full bg-${analysis.color}-500 transition-all`} style={{ width: `${analysis.percent}%` }}></div>
                </div>
                <div className="text-sm text-theme-secondary">
                  Time to crack: <span className={`font-semibold text-${analysis.color}-400`}>{analysis.timeToCrack}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { key: "length8", label: "At least 8 characters" },
                  { key: "length12", label: "At least 12 characters (better)" },
                  { key: "length16", label: "At least 16 characters (best)" },
                  { key: "uppercase", label: "Contains uppercase letters" },
                  { key: "lowercase", label: "Contains lowercase letters" },
                  { key: "numbers", label: "Contains numbers" },
                  { key: "symbols", label: "Contains symbols" },
                  { key: "noRepeats", label: "No repeated characters" },
                  { key: "noSequence", label: "No common sequences" },
                ].map(item => (
                  <div key={item.key} className={`flex items-center gap-2 p-2 rounded ${(analysis.checks as any)[item.key] ? "text-green-400" : "text-red-400"}`}>
                    {(analysis.checks as any)[item.key] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
</div>
    </div>
  )
}
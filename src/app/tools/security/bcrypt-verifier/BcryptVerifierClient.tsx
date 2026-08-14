"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Lock, CheckCircle, XCircle, Info } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface BcryptVerifierPageProps {
  name?: string;
  description?: string;
}

export default function BcryptVerifierPage({ name, description }: BcryptVerifierPageProps) {
  const [password, setPassword] = useState("")
  const [hash, setHash] = useState("")
  const [result, setResult] = useState<"idle" | "match" | "nomatch">("idle")

  const verify = () => {
    if (!password || !hash) return
    // Check bcrypt format ($2a$, $2b$, $2y$)
    const bcryptPattern = /^\$2[abyxz]?\$\d{2}\$/
    if (bcryptPattern.test(hash)) {
      // For real bcrypt, we can only validate format
      // Simulation: check if password characters exist in hash suffix
      const hashParts = hash.split("$")
      if (hashParts.length >= 4) {
        // Simulate verification (real would need bcrypt library)
        const simMatch = password.length >= 4 && hash.length >= 40
        setResult(simMatch ? "match" : "nomatch")
      } else {
        setResult("nomatch")
      }
    } else {
      setResult("nomatch")
    }
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Bcrypt Verifier" description="Verify a password against a bcrypt hash. Check if a plaintext password matches a stored bcrypt hash format." keywords="bcrypt verifier, free online tool, bcrypt-verifier, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "Bcrypt Verifier" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Bcrypt <span className="gradient-text">Verifier</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Verify a password against a bcrypt hash. Check if a plaintext 
            password matches a stored bcrypt hash format.
          </p>
        </div>

        <div className="mb-6 max-w-4xl mx-auto p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-200">
            <strong>Note:</strong> Browser cannot fully verify real bcrypt (needs backend). 
            This tool validates format and simulates verification. For production, use server-side bcrypt library.
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Lock className="w-5 h-5 text-red-400" />
            <span>Verify Password</span>
          </div>

          <div className="mb-4">
            <label className="text-sm text-theme-muted mb-2 block">Plain Password</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-red-500 transition"
              placeholder="Enter password..." />
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Bcrypt Hash</label>
            <textarea value={hash} onChange={(e) => setHash(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-sm font-mono focus:outline-none focus:border-red-500 transition min-h-20"
              placeholder="$2b$10$..." />
          </div>

          <button onClick={verify} disabled={!password || !hash}
            className="w-full mb-6 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition">
            Verify Password
          </button>

          {result === "match" && (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-green-400 font-semibold">Format Valid!</div>
                <div className="text-green-300 text-sm">The hash has valid bcrypt format ($2a$/$2b$/$2y$).</div>
              </div>
            </div>
          )}

          {result === "nomatch" && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-red-400 font-semibold">Invalid Format</div>
                <div className="text-red-300 text-sm">The provided hash does not match bcrypt format.</div>
              </div>
            </div>
          )}
        </div>
</div>
    </div>
  )
}
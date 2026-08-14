"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { CheckCircle, XCircle, GitCompare } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function HashComparisonToolPage() {
  const [hash1, setHash1] = useState("")
  const [hash2, setHash2] = useState("")

  const result = useMemo(() => {
    if (!hash1.trim() || !hash2.trim()) return null
    const h1 = hash1.trim().toLowerCase()
    const h2 = hash2.trim().toLowerCase()
    return {
      match: h1 === h2,
      length1: h1.length,
      length2: h2.length,
      lengthMatch: h1.length === h2.length,
      type: h1.length === 32 ? "MD5" : h1.length === 40 ? "SHA-1" : h1.length === 64 ? "SHA-256" : h1.length === 128 ? "SHA-512" : "Unknown",
    }
  }, [hash1, hash2])

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Hash Comparison Tool" description="Compare two hash values instantly. Perfect for verifying file downloads, checksums and detecting data tampering." keywords="hash comparison tool, free online tool, hash-comparison-tool, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "Hash Comparison Tool" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Hash <span className="gradient-text">Comparison Tool</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Compare two hash values instantly. Perfect for verifying file downloads, 
            checksums and detecting data tampering.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <GitCompare className="w-5 h-5 text-red-400" />
            <span>Compare Hashes</span>
          </div>

          <div className="mb-4">
            <label className="text-sm text-theme-muted mb-2 block">Hash 1</label>
            <textarea value={hash1} onChange={(e) => setHash1(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-sm font-mono focus:outline-none focus:border-red-500 transition min-h-20"
              placeholder="Paste first hash..." />
            {hash1 && <div className="text-xs text-theme-muted mt-1">Length: {hash1.trim().length}</div>}
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Hash 2</label>
            <textarea value={hash2} onChange={(e) => setHash2(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-sm font-mono focus:outline-none focus:border-red-500 transition min-h-20"
              placeholder="Paste second hash..." />
            {hash2 && <div className="text-xs text-theme-muted mt-1">Length: {hash2.trim().length}</div>}
          </div>

          {result && (
            <div className={`p-6 rounded-lg ${result.match ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
              <div className="flex items-center gap-3 mb-4">
                {result.match ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400" />
                )}
                <div>
                  <div className={`text-xl font-bold ${result.match ? "text-green-400" : "text-red-400"}`}>
                    {result.match ? "MATCH!" : "NO MATCH"}
                  </div>
                  <div className="text-sm text-theme-muted">
                    {result.match ? "Hashes are identical - data is verified" : "Hashes differ - data may be tampered or corrupted"}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-sm">
                <div className="p-3 rounded bg-theme-secondary">
                  <div className="text-theme-muted">Detected Type</div>
                  <div className="text-theme-primary font-semibold">{result.type}</div>
                </div>
                <div className="p-3 rounded bg-theme-secondary">
                  <div className="text-theme-muted">Length Match</div>
                  <div className={`font-semibold ${result.lengthMatch ? "text-green-400" : "text-red-400"}`}>
                    {result.lengthMatch ? "Yes" : "No"}
                  </div>
                </div>
                <div className="p-3 rounded bg-theme-secondary">
                  <div className="text-theme-muted">Case Insensitive</div>
                  <div className="text-theme-primary font-semibold">Yes</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <SEOSections toolSlug="hash-comparison-tool" toolName="Hash Comparison Tool" category="Security" />
      </div>
    </div>
  )
}
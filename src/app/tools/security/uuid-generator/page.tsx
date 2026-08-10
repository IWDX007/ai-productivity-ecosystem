"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RefreshCw, Fingerprint } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function UuidGeneratorPage() {
  const [count, setCount] = useState(10)
  const [uppercase, setUppercase] = useState(false)
  const [uuids, setUuids] = useState<string[]>([])
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const generate = () => {
    const results: string[] = []
    for (let i = 0; i < count; i++) {
      const uuid = crypto.randomUUID()
      results.push(uppercase ? uuid.toUpperCase() : uuid)
    }
    setUuids(results)
  }

  useMemo(() => generate(), [count, uppercase])

  const handleCopy = async (idx: number, str: string) => {
    await navigator.clipboard.writeText(str)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(uuids.join("\n"))
    setCopiedIdx(-1)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="UUID v4 Generator" description="Generate cryptographically secure UUID v4 identifiers instantly. Perfect for database IDs, session tokens and unique keys." keywords="uuid v4 generator, free online tool, uuid-generator, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "UUID Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            UUID v4 <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate cryptographically secure UUID v4 identifiers instantly.
            Perfect for database IDs, session tokens and unique keys.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Fingerprint className="w-5 h-5 text-red-400" />
            <span>Options</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Count: {count}</label>
              <input type="range" min="1" max="100" value={count} onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full accent-red-500" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 p-3 rounded-lg bg-theme-secondary border border-theme cursor-pointer hover:border-red-500/30 transition w-full">
                <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)}
                  className="w-4 h-4 accent-red-500" />
                <span className="text-theme-primary text-sm">UPPERCASE format</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button onClick={generate} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5" /> Regenerate
            </button>
            <button onClick={handleCopyAll} className="px-6 py-3 bg-theme-secondary border border-theme hover:border-red-500/30 rounded-lg transition text-theme-primary">
              {copiedIdx === -1 ? "Copied!" : "Copy All"}
            </button>
          </div>

          <div className="space-y-2">
            {uuids.map((uuid, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-theme-secondary border border-theme">
                <div className="flex-1 font-mono text-sm text-theme-primary break-all">{uuid}</div>
                <button onClick={() => handleCopy(idx, uuid)} className="text-theme-muted hover:text-red-400 transition flex-shrink-0">
                  {copiedIdx === idx ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        <SEOSections toolSlug="uuid-generator" toolName="UUID Generator" category="Security" />
      </div>
    </div>
  )
}
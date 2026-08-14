"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { randomText } from "@/lib/processing/text/allTextProcessors"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Copy, Check, RefreshCw } from "lucide-react"

export default function Page() {
  const [length, setLength] = useState(50)
  const [type, setType] = useState<"alpha" | "numeric" | "alphanumeric" | "special">("alphanumeric")
  const [seed, setSeed] = useState(0)
  const [copied, setCopied] = useState(false)
  const output = useMemo(() => randomText(length, type), [length, type, seed])

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <ToolPageMeta title="Random Text" description="Free online Random Text tool. Fast, secure, and easy to use. No registration required." keywords="random text, free online tool, random-text, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Random Text" }]} />
      <section className="relative border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">Generator</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">Random Text <span className="gradient-text">Generator</span></h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">Generate random alphanumeric strings for testing, passwords, IDs and more.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Length</label>
            <input type="number" min="1" max="10000" value={length} onChange={(e) => setLength(parseInt(e.target.value) || 1)} className="w-full p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-theme-primary mb-2">Character Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500">
              <option value="alpha">Letters Only (a-z, A-Z)</option>
              <option value="numeric">Numbers Only (0-9)</option>
              <option value="alphanumeric">Alphanumeric (a-z, A-Z, 0-9)</option>
              <option value="special">Special (!@#$%^&*...)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setSeed(s => s + 1)} className="flex items-center gap-2 px-4 py-2 bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded-lg text-theme-primary">
            <RefreshCw className="w-4 h-4" /> Regenerate
          </button>
          <button onClick={copy} className="flex items-center gap-2 px-4 py-2 btn-primary rounded-lg">
            {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
          </button>
        </div>

        <div className="p-6 glass-card border border-theme rounded-xl">
          <p className="text-theme-primary break-all font-mono text-lg">{output}</p>
        </div>
      </section>

      <SEOSections toolSlug="random-text" toolName="Random Text Generator" />
    </>
  )
}
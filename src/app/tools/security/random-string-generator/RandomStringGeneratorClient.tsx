"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RefreshCw, Type } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface RandomStringGeneratorPageProps {
  name?: string;
  description?: string;
}

export default function RandomStringGeneratorPage({ name, description }: RandomStringGeneratorPageProps) {
  const [length, setLength] = useState(20)
  const [count, setCount] = useState(5)
  const [useUpper, setUseUpper] = useState(true)
  const [useLower, setUseLower] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(false)
  const [strings, setStrings] = useState<string[]>([])
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const generate = () => {
    let chars = ""
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz"
    if (useNumbers) chars += "0123456789"
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    if (!chars) return

    const results: string[] = []
    for (let i = 0; i < count; i++) {
      const array = new Uint8Array(length)
      crypto.getRandomValues(array)
      let str = ""
      for (let j = 0; j < length; j++) {
        str += chars[array[j] % chars.length]
      }
      results.push(str)
    }
    setStrings(results)
  }

  useMemo(() => generate(), [])

  const handleCopy = async (idx: number, str: string) => {
    await navigator.clipboard.writeText(str)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(strings.join("\n"))
    setCopiedIdx(-1)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Random String Generator" description="Generate random strings for testing, tokens, API keys or seeds. Fully customizable length and character sets." keywords="random string generator, free online tool, random-string-generator, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "Random String Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Random String <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate random strings for testing, tokens, API keys or seeds.
            Fully customizable length and character sets.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Type className="w-5 h-5 text-red-400" />
            <span>Options</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Length: {length}</label>
              <input type="range" min="4" max="128" value={length} onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-red-500" />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Count: {count}</label>
              <input type="range" min="1" max="50" value={count} onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full accent-red-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {[
              { checked: useUpper, setChecked: setUseUpper, label: "A-Z" },
              { checked: useLower, setChecked: setUseLower, label: "a-z" },
              { checked: useNumbers, setChecked: setUseNumbers, label: "0-9" },
              { checked: useSymbols, setChecked: setUseSymbols, label: "!@#$" },
            ].map((opt, i) => (
              <label key={i} className="flex items-center gap-2 p-3 rounded-lg bg-theme-secondary border border-theme cursor-pointer hover:border-red-500/30 transition">
                <input type="checkbox" checked={opt.checked} onChange={(e) => opt.setChecked(e.target.checked)}
                  className="w-4 h-4 accent-red-500" />
                <span className="text-theme-primary text-sm">{opt.label}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            <button onClick={generate} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5" /> Generate
            </button>
            <button onClick={handleCopyAll} className="px-6 py-3 bg-theme-secondary border border-theme hover:border-red-500/30 rounded-lg transition text-theme-primary">
              {copiedIdx === -1 ? "Copied!" : "Copy All"}
            </button>
          </div>

          <div className="space-y-2">
            {strings.map((str, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-theme-secondary border border-theme">
                <div className="flex-1 font-mono text-sm text-theme-primary break-all">{str}</div>
                <button onClick={() => handleCopy(idx, str)} className="text-theme-muted hover:text-red-400 transition flex-shrink-0">
                  {copiedIdx === idx ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
</div>
    </div>
  )
}
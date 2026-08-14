"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RefreshCw, Lock } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function PinGeneratorPage() {
  const [length, setLength] = useState(4)
  const [count, setCount] = useState(10)
  const [pins, setPins] = useState<string[]>([])
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const generate = () => {
    const results: string[] = []
    for (let i = 0; i < count; i++) {
      const array = new Uint8Array(length)
      crypto.getRandomValues(array)
      let pin = ""
      for (let j = 0; j < length; j++) {
        pin += (array[j] % 10).toString()
      }
      results.push(pin)
    }
    setPins(results)
  }

  useMemo(() => generate(), [length, count])

  const handleCopy = async (idx: number, str: string) => {
    await navigator.clipboard.writeText(str)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="PIN Generator" description="Generate random numeric PINs from 3 to 12 digits. Cryptographically secure PINs for cards, apps, safes and more." keywords="pin generator, free online tool, pin-generator, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "PIN Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            PIN <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate random numeric PINs from 3 to 12 digits. Cryptographically 
            secure PINs for cards, apps, safes and more.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <Lock className="w-5 h-5 text-red-400" />
            <span>Options</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">PIN Length: {length}</label>
              <input type="range" min="3" max="12" value={length} onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-red-500" />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Count: {count}</label>
              <input type="range" min="1" max="50" value={count} onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full accent-red-500" />
            </div>
          </div>

          <button onClick={generate} className="w-full mb-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5" /> Generate PINs
          </button>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {pins.map((pin, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-theme-secondary border border-theme">
                <div className="flex-1 font-mono text-lg font-bold text-red-400 text-center">{pin}</div>
                <button onClick={() => handleCopy(idx, pin)} className="text-theme-muted hover:text-red-400 transition flex-shrink-0">
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
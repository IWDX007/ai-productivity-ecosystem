"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, RefreshCw } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface UuidGeneratorPageProps {
  name?: string;
  description?: string;
}

export default function UuidGeneratorPage({ name, description }: UuidGeneratorPageProps) {
  const [count, setCount] = useState(1)
  const [uuids, setUuids] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const generate = () => {
    const gen = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0
      return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16)
    })
    setUuids(Array.from({length: count}, gen))
  }

  const copy = async (val: string) => {
    await navigator.clipboard.writeText(val)
    setCopied(val)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join("\n"))
    setCopied("all")
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="UUID Generator" description="Generate universally unique identifiers (UUID v4) instantly." keywords="uuid generator, free online tool, uuid-generator, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "UUID Generator" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            UUID <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary text-lg">Generate universally unique identifiers (UUID v4) instantly.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-wrap items-end gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-theme-secondary text-sm block mb-2">How many UUIDs?</label>
              <input type="number" min={1} max={100} value={count} onChange={e => setCount(+e.target.value)}
                className="w-full px-4 py-2 bg-theme-secondary border border-theme rounded-xl text-theme-primary focus:outline-none focus:border-crimson-500" />
            </div>
            <button onClick={generate} className="btn-primary px-6 py-2.5 rounded-xl font-medium flex items-center gap-2">
              <RefreshCw size={16} /> Generate
            </button>
            {uuids.length > 1 && (
              <button onClick={copyAll} className="px-6 py-2.5 bg-theme-secondary text-theme-primary rounded-xl font-medium border border-theme flex items-center gap-2">
                {copied === "all" ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                Copy All
              </button>
            )}
          </div>
        </div>

        {uuids.length > 0 && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-theme-primary font-semibold mb-4">Generated UUIDs ({uuids.length})</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {uuids.map((u, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-theme-secondary rounded-xl group hover:bg-theme-card transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-crimson-500 font-mono text-xs w-8">#{i + 1}</span>
                    <span className="text-theme-primary font-mono text-sm truncate">{u}</span>
                  </div>
                  <button onClick={() => copy(u)} className="text-theme-muted hover:text-crimson-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copied === u ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
</div>
  )
}
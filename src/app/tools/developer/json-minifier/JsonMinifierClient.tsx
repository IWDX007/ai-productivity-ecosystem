"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Trash2, Download } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface JsonMinifierPageProps {
  name?: string;
  description?: string;
}

export default function JsonMinifierPage({ name, description }: JsonMinifierPageProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<{ original: number; minified: number; saved: number } | null>(null)

  const minify = () => {
    if (!input.trim()) { setError("Please enter JSON"); return }
    try {
      const parsed = JSON.parse(input)
      const result = JSON.stringify(parsed)
      setOutput(result)
      setStats({
        original: input.length,
        minified: result.length,
        saved: Math.round((1 - result.length / input.length) * 100)
      })
      setError(null)
    } catch (e: any) {
      setError(e.message)
      setOutput("")
      setStats(null)
    }
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="JSON Minifier" description="Compress and minify JSON data by removing whitespace. Reduce file size instantly." keywords="json minifier, free online tool, json-minifier, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "JSON Minifier" }
        ]} />

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            JSON <span className="gradient-text">Minifier</span>
          </h1>
          <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
            Compress and minify JSON data by removing whitespace. Reduce file size instantly.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          {stats && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Original Size", value: `${stats.original} chars` },
                { label: "Minified Size", value: `${stats.minified} chars` },
                { label: "Size Saved", value: `${stats.saved}%` },
              ].map(s => (
                <div key={s.label} className="bg-theme-secondary rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-theme-muted text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-theme-primary font-medium block mb-2">Input JSON</label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder='{"key": "value"}' rows={14}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Minified Output</label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="Minified JSON here..." rows={14}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-500 text-sm font-medium">Error: {error}</p>
            </div>
          )}

          <button onClick={minify} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4">
            Minify JSON
          </button>
        </div>
      </div>
</div>
  )
}
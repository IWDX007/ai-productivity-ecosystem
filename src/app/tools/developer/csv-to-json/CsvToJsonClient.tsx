"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Download } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface CsvToJsonPageProps {
  name?: string;
  description?: string;
}

export default function CsvToJsonPage({ name, description }: CsvToJsonPageProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [rows, setRows] = useState(0)

  const convert = () => {
    if (!input.trim()) return
    try {
      const lines = input.trim().split("\n")
      if (lines.length < 2) throw new Error("Need at least header + 1 row")
      const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""))
      const result = lines.slice(1).map(line => {
        const values = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""))
        return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]))
      })
      setOutput(JSON.stringify(result, null, 2))
      setRows(result.length)
      setError(null)
    } catch (e: any) {
      setError(e.message)
      setOutput("")
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    const blob = new Blob([output], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "data.json"; a.click()
  }

  const sample = `id,name,email,age
1,John Doe,john@example.com,30
2,Jane Smith,jane@example.com,25
3,Bob Johnson,bob@example.com,35`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="CSV to JSON Converter" description="Convert CSV files to JSON array format instantly." keywords="csv to json converter, free online tool, csv-to-json, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "CSV to JSON" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            CSV to <span className="gradient-text">JSON Converter</span>
          </h1>
          <p className="text-theme-secondary text-lg">Convert CSV files to JSON array format instantly.</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex justify-end mb-3">
            <button onClick={() => { setInput(sample); setOutput(""); setError(null) }}
              className="text-sm px-4 py-2 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-lg transition-all">
              Load Sample
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-theme-primary font-medium block mb-2">CSV Input</label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder="name,age,email..." rows={14}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">JSON Output {rows > 0 && <span className="text-theme-muted text-sm">({rows} rows)</span>}</label>
                <div className="flex gap-2">
                  <button onClick={copy} className="text-theme-muted hover:text-crimson-500">
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                  <button onClick={download} className="text-theme-muted hover:text-crimson-500">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <textarea value={output} readOnly placeholder="JSON output..." rows={14}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-500 text-sm">Error: {error}</p>
            </div>
          )}
          <button onClick={convert} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4">
            Convert to JSON
          </button>
        </div>
      </div>
</div>
  )
}
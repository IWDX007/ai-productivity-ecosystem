"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Download } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface JsonToCsvPageProps {
  name?: string;
  description?: string;
}

export default function JsonToCsvPage({ name, description }: JsonToCsvPageProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [rows, setRows] = useState(0)

  const convert = () => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      const arr = Array.isArray(parsed) ? parsed : [parsed]
      if (arr.length === 0) throw new Error("Empty array")
      const headers = Object.keys(arr[0])
      const csv = [
        headers.join(","),
        ...arr.map(row => headers.map(h => {
          const val = row[h] ?? ""
          const str = typeof val === "object" ? JSON.stringify(val) : String(val)
          return str.includes(",") || str.includes('"') || str.includes("\n")
            ? `"${str.replace(/"/g, '""')}"` : str
        }).join(","))
      ].join("\n")
      setOutput(csv)
      setRows(arr.length)
      setError(null)
    } catch (e: any) {
      setError(e.message)
      setOutput("")
    }
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    if (!output) return
    const blob = new Blob([output], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "data.csv"; a.click()
  }

  const sample = `[
  {"id": 1, "name": "John Doe", "email": "john@example.com", "age": 30},
  {"id": 2, "name": "Jane Smith", "email": "jane@example.com", "age": 25},
  {"id": 3, "name": "Bob Johnson", "email": "bob@example.com", "age": 35}
]`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="JSON to CSV Converter" description="Convert JSON arrays to CSV format instantly. Excel-ready output." keywords="json to csv converter, free online tool, json-to-csv, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "JSON to CSV" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            JSON to <span className="gradient-text">CSV Converter</span>
          </h1>
          <p className="text-theme-secondary text-lg">Convert JSON arrays to CSV format instantly. Excel-ready output.</p>
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
              <label className="text-theme-primary font-medium block mb-2">JSON Input</label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder='[{"key": "value"}]' rows={14}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">CSV Output {rows > 0 && <span className="text-theme-muted text-sm">({rows} rows)</span>}</label>
                <div className="flex gap-2">
                  <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                  <button onClick={download} className="text-theme-muted hover:text-crimson-500 transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <textarea value={output} readOnly placeholder="CSV output appears here..." rows={14}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-500 text-sm">Error: {error}</p>
            </div>
          )}

          <button onClick={convert} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4">
            Convert to CSV
          </button>
        </div>
      </div>
</div>
  )
}
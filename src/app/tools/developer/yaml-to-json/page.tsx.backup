"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function YamlToJsonPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!input.trim()) return
    try {
      const lines = input.split("\n")
      const obj: any = {}
      const stack: { indent: number; obj: any }[] = [{ indent: -1, obj }]
      for (const line of lines) {
        if (!line.trim() || line.trim().startsWith("#")) continue
        const indent = line.search(/\S/)
        const content = line.trim()
        const colonIdx = content.indexOf(":")
        if (colonIdx === -1) continue
        const key = content.slice(0, colonIdx).trim()
        const val = content.slice(colonIdx + 1).trim()
        while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop()
        const current = stack[stack.length - 1].obj
        if (val === "" || val === null) {
          current[key] = {}
          stack.push({ indent, obj: current[key] })
        } else if (val === "true") current[key] = true
        else if (val === "false") current[key] = false
        else if (!isNaN(Number(val))) current[key] = Number(val)
        else current[key] = val.replace(/^['"]|['"]$/g, "")
      }
      setOutput(JSON.stringify(obj, null, 2))
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

  const sample = `name: John Doe
age: 30
email: john@example.com
address:
  street: 123 Main St
  city: New York
  zip: 10001
active: true`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="YAML to JSON Converter" description="Convert YAML configuration to JSON format instantly." keywords="yaml to json converter, free online tool, yaml-to-json, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "YAML to JSON" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            YAML to <span className="gradient-text">JSON Converter</span>
          </h1>
          <p className="text-theme-secondary text-lg">Convert YAML configuration to JSON format instantly.</p>
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
              <label className="text-theme-primary font-medium block mb-2">YAML Input</label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder="key: value..." rows={14}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">JSON Output</label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
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
    
      <SEOSections toolSlug="yaml-to-json" toolName="YAML to JSON Converter" category="Developer" />
    </div>
  )
}
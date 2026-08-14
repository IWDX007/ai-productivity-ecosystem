"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface JsonToYamlPageProps {
  name?: string;
  description?: string;
}

export default function JsonToYamlPage({ name, description }: JsonToYamlPageProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      const toYAML = (obj: any, indent: number = 0): string => {
        const tab = "  ".repeat(indent)
        if (Array.isArray(obj)) {
          return obj.map(item =>
            typeof item === "object"
              ? `${tab}-\n${toYAML(item, indent + 1)}`
              : `${tab}- ${item}`
          ).join("\n")
        }
        if (typeof obj === "object" && obj !== null) {
          return Object.entries(obj).map(([k, v]) => {
            if (typeof v === "object" && v !== null) {
              return `${tab}${k}:\n${toYAML(v, indent + 1)}`
            }
            return `${tab}${k}: ${v}`
          }).join("\n")
        }
        return `${tab}${obj}`
      }
      setOutput(toYAML(parsed))
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

  const sample = `{
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "New York"
  },
  "hobbies": ["reading", "coding"]
}`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="JSON to YAML Converter" description="Convert JSON data to YAML configuration format." keywords="json to yaml converter, free online tool, json-to-yaml, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "JSON to YAML" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            JSON to <span className="gradient-text">YAML Converter</span>
          </h1>
          <p className="text-theme-secondary text-lg">Convert JSON data to YAML configuration format.</p>
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
                placeholder='{"key": "value"}' rows={14}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">YAML Output</label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="YAML output..." rows={14}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-500 text-sm">Error: {error}</p>
            </div>
          )}
          <button onClick={convert} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4">
            Convert to YAML
          </button>
        </div>
      </div>
</div>
  )
}
"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Download } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function JsonToXmlPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      const toXML = (obj: any, tag: string = "root"): string => {
        if (Array.isArray(obj)) {
          return obj.map(item => toXML(item, "item")).join("\n")
        }
        if (typeof obj === "object" && obj !== null) {
          const inner = Object.entries(obj).map(([k, v]) => toXML(v, k)).join("\n")
          return `<${tag}>\n${inner}\n</${tag}>`
        }
        return `<${tag}>${obj}</${tag}>`
      }
      setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n${toXML(parsed)}`)
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
    const blob = new Blob([output], { type: "application/xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "data.xml"; a.click()
  }

  const sample = `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "roles": ["admin", "editor"]
  }
}`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="JSON to XML Converter" description="Convert JSON data to XML format instantly." keywords="json to xml converter, free online tool, json-to-xml, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "JSON to XML" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            JSON to <span className="gradient-text">XML Converter</span>
          </h1>
          <p className="text-theme-secondary text-lg">Convert JSON data to XML format instantly.</p>
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
                <label className="text-theme-primary font-medium">XML Output</label>
                <div className="flex gap-2">
                  <button onClick={copy} className="text-theme-muted hover:text-crimson-500">
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                  <button onClick={download} className="text-theme-muted hover:text-crimson-500">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <textarea value={output} readOnly placeholder="XML output appears here..." rows={14}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-500 text-sm">Error: {error}</p>
            </div>
          )}
          <button onClick={convert} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4">
            Convert to XML
          </button>
        </div>
      </div>
    
      <SEOSections toolSlug="json-to-xml" toolName="JSON to XML Converter" category="Developer" />
    </div>
  )
}
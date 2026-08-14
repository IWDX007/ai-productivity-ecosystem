"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Download } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface XmlToJsonPageProps {
  name?: string;
  description?: string;
}

export default function XmlToJsonPage({ name, description }: XmlToJsonPageProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!input.trim()) return
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(input, "text/xml")
      const err = doc.querySelector("parsererror")
      if (err) throw new Error("Invalid XML")
      const nodeToObj = (node: Element): any => {
        if (node.children.length === 0) return node.textContent
        const obj: any = {}
        Array.from(node.children).forEach(child => {
          const key = child.tagName
          const val = nodeToObj(child)
          if (obj[key]) {
            if (!Array.isArray(obj[key])) obj[key] = [obj[key]]
            obj[key].push(val)
          } else {
            obj[key] = val
          }
        })
        return obj
      }
      const result = { [doc.documentElement.tagName]: nodeToObj(doc.documentElement) }
      setOutput(JSON.stringify(result, null, 2))
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

  const sample = `<?xml version="1.0"?>
<users>
  <user>
    <id>1</id>
    <name>John Doe</name>
    <email>john@example.com</email>
  </user>
  <user>
    <id>2</id>
    <name>Jane Smith</name>
    <email>jane@example.com</email>
  </user>
</users>`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="XML to JSON Converter" description="Convert XML documents to JSON format instantly." keywords="xml to json converter, free online tool, xml-to-json, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "XML to JSON" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            XML to <span className="gradient-text">JSON Converter</span>
          </h1>
          <p className="text-theme-secondary text-lg">Convert XML documents to JSON format instantly.</p>
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
              <label className="text-theme-primary font-medium block mb-2">XML Input</label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder="<root>...</root>" rows={14}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">JSON Output</label>
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
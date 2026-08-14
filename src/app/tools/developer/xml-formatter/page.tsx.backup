"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Trash2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function XmlFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [spaces, setSpaces] = useState(2)

  const format = () => {
    if (!input.trim()) return
    const tab = " ".repeat(spaces)
    let indent = 0
    const result = input
      .replace(/>\s*</g, ">\n<")
      .split("\n")
      .map(line => {
        line = line.trim()
        if (!line) return ""
        if (line.startsWith("</")) indent = Math.max(0, indent - 1)
        const out = tab.repeat(indent) + line
        if (!line.startsWith("</") && !line.endsWith("/>") && line.includes("<") && !line.includes("</")) indent++
        return out
      })
      .filter(Boolean)
      .join("\n")
    setOutput(result)
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sample = `<?xml version="1.0" encoding="UTF-8"?><root><users><user id="1"><name>John Doe</name><email>john@example.com</email><role>admin</role></user><user id="2"><name>Jane Smith</name><email>jane@example.com</email><role>user</role></user></users></root>`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="XML Formatter" description="Format and beautify XML documents with proper indentation. Makes XML human-readable instantly." keywords="xml formatter, free online tool, xml-formatter, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "XML Formatter" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            XML <span className="gradient-text">Formatter</span>
          </h1>
          <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
            Format and beautify XML documents with proper indentation. Makes XML human-readable instantly.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-theme-secondary text-sm">Indent:</label>
              {[2, 4].map(s => (
                <button key={s} onClick={() => setSpaces(s)}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${spaces === s ? "gradient-crimson text-white" : "bg-theme-secondary text-theme-secondary hover:text-theme-primary"}`}>
                  {s} spaces
                </button>
              ))}
            </div>
            <button onClick={() => { setInput(sample); setOutput("") }}
              className="ml-auto text-sm px-4 py-2 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-lg transition-all">
              Load Sample
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Input XML</label>
                <button onClick={() => { setInput(""); setOutput("") }} className="text-theme-muted hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder="Paste XML here..."
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Formatted XML</label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="Formatted XML appears here..."
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>
          <button onClick={format} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4">
            Format XML
          </button>
        </div>
      </div>
    
      <SEOSections toolSlug="xml-formatter" toolName="XML Formatter" category="Developer" />
    </div>
  )
}
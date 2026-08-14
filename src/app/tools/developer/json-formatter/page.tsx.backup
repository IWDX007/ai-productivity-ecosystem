"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, AlertCircle, CheckCircle, Trash2, Download } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function JsonFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [spaces, setSpaces] = useState(2)

  const format = () => {
    if (!input.trim()) { setError("Please enter JSON"); return }
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, spaces))
      setError(null)
    } catch (e: any) {
      setError(e.message)
      setOutput("")
    }
  }

  const minify = () => {
    if (!input.trim()) { setError("Please enter JSON"); return }
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
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
    const blob = new Blob([output], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "formatted.json"; a.click()
  }

  const sample = () => {
    setInput(`{"name":"John Doe","age":30,"email":"john@example.com","address":{"street":"123 Main St","city":"New York","zip":"10001"},"hobbies":["reading","coding","gaming"],"active":true}`)
    setError(null); setOutput("")
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="JSON Formatter and Beautifier" description="Format, beautify and validate your JSON data instantly. Free online JSON formatter with syntax highlighting." keywords="JSON Formatter and Beautifier, free online tool, json-formatter, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "JSON Formatter" }
        ]} />

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            JSON Formatter &{" "}
            <span className="gradient-text">Beautifier</span>
          </h1>
          <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
            Format, beautify and validate your JSON data instantly. Free online JSON formatter with syntax highlighting.
          </p>
        </div>

        {/* Controls */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-theme-secondary text-sm font-medium">Indent Spaces:</label>
              {[2, 4, 8].map(s => (
                <button key={s} onClick={() => setSpaces(s)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${spaces === s ? "gradient-crimson text-white" : "bg-theme-secondary text-theme-secondary hover:text-theme-primary"}`}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={sample} className="ml-auto text-sm px-4 py-2 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-lg transition-all">
              Load Sample
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Input JSON</label>
                <button onClick={() => { setInput(""); setOutput(""); setError(null) }}
                  className="text-theme-muted hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder='{"key": "value", "array": [1, 2, 3]}'
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500 transition-colors"
              />
            </div>

            {/* Output */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Output</label>
                <div className="flex gap-2">
                  <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                  <button onClick={download} className="text-theme-muted hover:text-crimson-500 transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
              <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-500 font-medium text-sm">Invalid JSON</p>
                <p className="text-red-400 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {output && !error && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
              <CheckCircle size={18} className="text-green-500" />
              <p className="text-green-500 text-sm font-medium">Valid JSON - {output.split('\n').length} lines</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button onClick={format} className="btn-primary px-6 py-2.5 rounded-xl font-medium">
              Format / Beautify
            </button>
            <button onClick={minify} className="px-6 py-2.5 bg-theme-secondary text-theme-primary rounded-xl font-medium hover:bg-theme-card transition-all border border-theme">
              Minify
            </button>
          </div>
        </div>
      </div>
    
      <SEOSections toolSlug="json-formatter" toolName="JSON Formatter" category="Developer" />
    </div>
  )
}
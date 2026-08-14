"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Trash2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function HtmlBeautifierPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [spaces, setSpaces] = useState(2)

  const beautify = () => {
    if (!input.trim()) return
    const tab = " ".repeat(spaces)
    const voidTags = ["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]
    let indent = 0
    const result = input
      .replace(/>\s*</g, ">\n<")
      .split("\n")
      .map(line => {
        line = line.trim()
        if (!line) return ""
        if (line.match(/^<\/[^>]+>/)) indent = Math.max(0, indent - 1)
        const out = tab.repeat(indent) + line
        const tagMatch = line.match(/^<([a-zA-Z][a-zA-Z0-9]*)[^>]*>/)
        if (tagMatch && !voidTags.includes(tagMatch[1].toLowerCase()) && !line.match(/\/>/)) {
          if (!line.match(/<\/[^>]+>$/)) indent++
        }
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

  const sample = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Page</title></head><body><div class="container"><h1>Hello World</h1><p>This is a paragraph.</p><ul><li>Item 1</li><li>Item 2</li></ul></div></body></html>`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Hello World" description="This is a paragraph." keywords="hello world, free online tool, html-beautifier, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "HTML Beautifier" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            HTML <span className="gradient-text">Beautifier</span>
          </h1>
          <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
            Format and beautify your HTML code with proper indentation instantly.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-theme-secondary text-sm font-medium">Indent:</label>
              {[2, 4].map(s => (
                <button key={s} onClick={() => setSpaces(s)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${spaces === s ? "gradient-crimson text-white" : "bg-theme-secondary text-theme-secondary hover:text-theme-primary"}`}>
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
                <label className="text-theme-primary font-medium">Input HTML</label>
                <button onClick={() => { setInput(""); setOutput("") }} className="text-theme-muted hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder="Paste minified HTML here..."
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Beautified HTML</label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="Formatted HTML appears here..."
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>

          <button onClick={beautify} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4">
            Beautify HTML
          </button>
        </div>
      </div>
</div>
  )
}
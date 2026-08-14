"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, ArrowUpDown } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function HtmlEntitiesPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [copied, setCopied] = useState(false)

  const process = () => {
    if (!input.trim()) return
    if (mode === "encode") {
      setOutput(input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;"))
    } else {
      setOutput(input
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ")
        .replace(/&copy;/g, "©")
        .replace(/&reg;/g, "®")
        .replace(/&trade;/g, "™")
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))))
    }
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const swap = () => {
    setInput(output)
    setOutput("")
    setMode(m => m === "encode" ? "decode" : "encode")
  }

  const commonEntities = [
    { char: "<", entity: "&lt;" }, { char: ">", entity: "&gt;" },
    { char: "&", entity: "&amp;" }, { char: '"', entity: "&quot;" },
    { char: "©", entity: "&copy;" }, { char: "®", entity: "&reg;" },
    { char: "™", entity: "&trade;" }, { char: " ", entity: "&nbsp;" },
  ]

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="HTML Entities Encoder / Decoder" description="Convert special characters to HTML entities and vice versa." keywords="html entities encoder / decoder, free online tool, html-entities-encoder, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "HTML Entities" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            HTML Entities <span className="gradient-text">Encoder / Decoder</span>
          </h1>
          <p className="text-theme-secondary text-lg">Convert special characters to HTML entities and vice versa.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex bg-theme-secondary rounded-xl p-1">
              {(["encode", "decode"] as const).map(m => (
                <button key={m} onClick={() => { setMode(m); setOutput("") }}
                  className={`px-6 py-2 rounded-lg font-medium capitalize transition-all ${mode === m ? "gradient-crimson text-white" : "text-theme-secondary hover:text-theme-primary"}`}>
                  {m}
                </button>
              ))}
            </div>
            <button onClick={swap} className="flex items-center gap-2 px-4 py-2 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-xl transition-all text-sm">
              <ArrowUpDown size={14} /> Swap
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-theme-primary font-medium block mb-2">
                {mode === "encode" ? "Plain Text / HTML" : "Encoded HTML"}
              </label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder={mode === "encode" ? '<h1>Hello "World" & <more></h1>' : "&lt;h1&gt;Hello &quot;World&quot;&lt;/h1&gt;"}
                rows={10} className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Output</label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="Output appears here..."
                rows={10} className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>

          <button onClick={process} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4 capitalize">
            {mode} Entities
          </button>
        </div>

        {/* Common Entities Reference */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-theme-primary font-semibold mb-4">Common HTML Entities Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {commonEntities.map(e => (
              <div key={e.entity} className="bg-theme-secondary rounded-lg p-3 flex items-center justify-between">
                <span className="text-theme-primary font-mono text-lg">{e.char}</span>
                <span className="text-crimson-500 font-mono text-xs">{e.entity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    
      <SEOSections toolSlug="html-entities-encoder" toolName="HTML Entities Encoder" category="Developer" />
    </div>
  )
}
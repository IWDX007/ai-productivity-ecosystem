"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Trash2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface CssBeautifierPageProps {
  name?: string;
  description?: string;
}

export default function CssBeautifierPage({ name, description }: CssBeautifierPageProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<"beautify" | "minify">("beautify")

  const process = () => {
    if (!input.trim()) return
    if (mode === "beautify") {
      const result = input
        .replace(/\s*{\s*/g, " {\n  ")
        .replace(/;\s*/g, ";\n  ")
        .replace(/\s*}\s*/g, "\n}\n")
        .replace(/,\s*([^\s])/g, ",\n$1")
        .replace(/  \n}/g, "\n}")
        .trim()
      setOutput(result)
    } else {
      const result = input
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*{\s*/g, "{")
        .replace(/\s*}\s*/g, "}")
        .replace(/\s*:\s*/g, ":")
        .replace(/\s*;\s*/g, ";")
        .replace(/\s*,\s*/g, ",")
        .replace(/;}/g, "}")
        .trim()
      setOutput(result)
    }
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sample = `.container{max-width:1200px;margin:0 auto;padding:0 16px}.header{background:#fff;border-bottom:1px solid #eee;padding:16px 0}.nav ul{display:flex;gap:24px;list-style:none}.btn{display:inline-flex;align-items:center;padding:8px 16px;border-radius:8px;font-weight:500}`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="CSS Beautifier & Minifier" description="Format, beautify or minify your CSS code instantly. Clean and readable CSS in one click." keywords="css beautifier & minifier, free online tool, css-beautifier, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "CSS Beautifier" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            CSS <span className="gradient-text">Beautifier & Minifier</span>
          </h1>
          <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
            Format, beautify or minify your CSS code instantly. Clean and readable CSS in one click.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex bg-theme-secondary rounded-xl p-1">
              {(["beautify", "minify"] as const).map(m => (
                <button key={m} onClick={() => { setMode(m); setOutput("") }}
                  className={`px-5 py-2 rounded-lg font-medium capitalize transition-all ${mode === m ? "gradient-crimson text-white" : "text-theme-secondary hover:text-theme-primary"}`}>
                  {m}
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
                <label className="text-theme-primary font-medium">Input CSS</label>
                <button onClick={() => { setInput(""); setOutput("") }} className="text-theme-muted hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder="Paste your CSS here..."
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Output CSS</label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="Output appears here..."
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button onClick={process} className="btn-primary px-8 py-2.5 rounded-xl font-medium capitalize">
              {mode} CSS
            </button>
          </div>
        </div>
      </div>
</div>
  )
}
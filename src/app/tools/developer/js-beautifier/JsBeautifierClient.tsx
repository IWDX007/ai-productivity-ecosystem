"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Trash2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface JsBeautifierPageProps {
  name?: string;
  description?: string;
}

export default function JsBeautifierPage({ name, description }: JsBeautifierPageProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<"beautify" | "minify">("beautify")

  const process = () => {
    if (!input.trim()) return
    if (mode === "beautify") {
      let indent = 0
      const tab = "  "
      let result = ""
      let inString = false
      let stringChar = ""
      for (let i = 0; i < input.length; i++) {
        const ch = input[i]
        if (inString) {
          result += ch
          if (ch === stringChar && input[i - 1] !== "\\") inString = false
        } else if (ch === '"' || ch === "'" || ch === "`") {
          inString = true
          stringChar = ch
          result += ch
        } else if (ch === "{" || ch === "[") {
          result += ch + "\n" + tab.repeat(++indent)
        } else if (ch === "}" || ch === "]") {
          result += "\n" + tab.repeat(--indent) + ch
        } else if (ch === ";") {
          result += ";\n" + tab.repeat(indent)
        } else {
          result += ch
        }
      }
      setOutput(result.replace(/\n\s*\n/g, "\n").trim())
    } else {
      setOutput(input.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*/g, "").replace(/\s+/g, " ").trim())
    }
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sample = `function calculateTotal(items){return items.reduce((sum,item)=>{return sum+item.price*item.quantity},0)}const cart=[{name:"Apple",price:1.5,quantity:3},{name:"Banana",price:0.5,quantity:6}];console.log("Total:",calculateTotal(cart))`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="JavaScript Beautifier" description="Format and beautify JavaScript code with proper indentation. Also minify JS for production." keywords="javascript beautifier, free online tool, js-beautifier, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "JavaScript Beautifier" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            JavaScript <span className="gradient-text">Beautifier</span>
          </h1>
          <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
            Format and beautify JavaScript code with proper indentation. Also minify JS for production.
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
                <label className="text-theme-primary font-medium">Input JavaScript</label>
                <button onClick={() => { setInput(""); setOutput("") }} className="text-theme-muted hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder="Paste JavaScript code here..."
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Output</label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="Formatted JS appears here..."
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>
          <button onClick={process} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4 capitalize">
            {mode} JavaScript
          </button>
        </div>
      </div>
</div>
  )
}
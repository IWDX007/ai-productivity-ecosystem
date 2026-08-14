"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Binary } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface TextToBinaryPageProps {
  name?: string;
  description?: string;
}

export default function TextToBinaryPage({ name, description }: TextToBinaryPageProps) {
  const [text, setText] = useState("Hello")
  const [copied, setCopied] = useState(false)

  const binary = useMemo(() => {
    if (!text) return ""
    return text.split("").map(char =>
      char.charCodeAt(0).toString(2).padStart(8, "0")
    ).join(" ")
  }, [text])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(binary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Text to Binary" description="Convert any text to binary code (0s and 1s) instantly. Perfect for programming, cryptography and computer science." keywords="text to binary, free online tool, text-to-binary-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Text to Binary" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Text to <span className="gradient-text">Binary</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert any text to binary code (0s and 1s) instantly.
            Perfect for programming, cryptography and computer science.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Binary className="w-5 h-5 text-purple-400" />
              <span>Enter Text</span>
            </div>
            <button onClick={() => setText("Hello")} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Input Text</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition min-h-24"
              placeholder="Type your text here..." />
          </div>

          <div className="p-6 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-theme-muted">Binary Output:</span>
              <button onClick={handleCopy} className="text-theme-muted hover:text-purple-400 transition">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-purple-400 font-mono text-sm break-all">{binary}</div>
            <div className="text-xs text-theme-muted mt-3">
              Length: {text.length} chars = {binary.replace(/\s/g, "").length} bits
            </div>
          </div>
        </div>
</div>
    </div>
  )
}
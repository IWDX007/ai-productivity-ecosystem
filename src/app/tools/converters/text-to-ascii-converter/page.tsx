"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Type } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function TextToAsciiPage() {
  const [text, setText] = useState("Hello")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const conversions = useMemo(() => {
    if (!text) return { decimal: "", hex: "", octal: "" }
    return {
      decimal: text.split("").map(c => c.charCodeAt(0)).join(" "),
      hex: text.split("").map(c => c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")).join(" "),
      octal: text.split("").map(c => c.charCodeAt(0).toString(8)).join(" "),
    }
  }, [text])

  const handleCopy = async (key: string, val: string) => {
    await navigator.clipboard.writeText(val)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Text to ASCII" description="Convert any text to ASCII codes in decimal, hexadecimal and octal formats. Perfect for programming and character encoding." keywords="text to ascii, free online tool, text-to-ascii-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Text to ASCII" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Text to <span className="gradient-text">ASCII</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert any text to ASCII codes in decimal, hexadecimal and octal formats.
            Perfect for programming and character encoding.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Type className="w-5 h-5 text-purple-400" />
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

          <div className="grid grid-cols-1 gap-3">
            {[
              { key: "decimal", label: "Decimal ASCII", value: conversions.decimal },
              { key: "hex", label: "Hexadecimal ASCII", value: conversions.hex },
              { key: "octal", label: "Octal ASCII", value: conversions.octal },
            ].map(item => (
              <div key={item.key} className="p-4 rounded-lg bg-theme-secondary border border-theme">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-theme-muted">{item.label}</span>
                  <button onClick={() => handleCopy(item.key, item.value)} className="text-theme-muted hover:text-purple-400 transition">
                    {copiedKey === item.key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-mono text-sm break-all">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <SEOSections toolSlug="text-to-ascii-converter" toolName="Text to ASCII Converter" category="Converter" />
      </div>
    </div>
  )
}
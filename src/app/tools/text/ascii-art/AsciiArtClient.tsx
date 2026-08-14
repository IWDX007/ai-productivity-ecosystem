"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { generateASCII, AVAILABLE_FONTS, type FontName } from "@/lib/processing/text/asciiFonts"
import { Copy, Check, Download, Sparkles, Type } from "lucide-react"

interface AsciiArtClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function AsciiArtClient({ name, description }: AsciiArtClientProps) {
  const [text, setText] = useState("HELLO")
  const [font, setFont] = useState<FontName>("block")
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => generateASCII(text, font), [text, font])

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    if (!output) return
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ascii-art-${font}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <ToolPageMeta title="Ascii Art" description="Free online Ascii Art tool. Fast, secure, and easy to use. No registration required." keywords="ascii art, free online tool, ascii-art, text tools, ai productivity" />
      <Breadcrumbs items={[
        { label: "Tools", href: "/tools" },
        { label: "Text Tools", href: "/tools/text" },
        { label: "ASCII Art Generator" }
      ]} />

      <section className="relative border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" />
            5 Fonts Available
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">
            ASCII Art <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert text to ASCII art with 5 different font styles. Supports A-Z, 0-9 and special characters.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="text-sm font-medium text-theme-primary flex items-center gap-2 mb-2">
                <Type className="w-4 h-4" />
                Enter Text:
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
                maxLength={20}
                className="w-full p-4 bg-theme-card border border-theme rounded-xl text-theme-primary text-lg placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 transition-colors"
              />
              <p className="mt-1 text-xs text-theme-muted">
                {text.length} / 20 characters
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-theme-primary">Output:</label>
                <div className="flex gap-2">
                  <button onClick={copy} disabled={!output} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded-lg transition-colors disabled:opacity-50">
                    {copied ? <><Check className="w-3 h-3 text-green-500" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                  </button>
                  <button onClick={download} disabled={!output} className="flex items-center gap-1 px-3 py-1.5 text-xs btn-primary rounded-lg disabled:opacity-50">
                    <Download className="w-3 h-3" /> Download
                  </button>
                </div>
              </div>
              <div className="glass-card border border-theme rounded-xl p-4 overflow-auto">
                <pre className="text-theme-primary font-mono text-xs md:text-sm leading-tight whitespace-pre">
                  {output || <span className="text-theme-muted italic">ASCII art will appear here...</span>}
                </pre>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card border border-theme rounded-xl p-4">
              <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-crimson-500" />
                Choose Font Style
              </h3>
              <div className="space-y-2">
                {AVAILABLE_FONTS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFont(f.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all border ${
                      font === f.id
                        ? "bg-crimson-500/10 border-crimson-500/30 text-crimson-500"
                        : "bg-theme-secondary border-theme text-theme-primary hover:border-crimson-500/20"
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">{f.name}</div>
                    <div className="text-xs opacity-70">{f.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card border border-theme rounded-xl p-4">
              <h3 className="text-sm font-semibold text-theme-primary mb-2">Quick Try</h3>
              <div className="grid grid-cols-2 gap-2">
                {["HELLO", "HI", "LOVE", "COOL", "WOW", "2024"].map((word) => (
                  <button
                    key={word}
                    onClick={() => setText(word)}
                    className="px-3 py-1.5 text-xs bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded-lg transition-colors text-theme-primary"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
</>
  )
}
"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import * as p from "@/lib/processing/text/allTextProcessors"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Copy, Check, Trash2 } from "lucide-react"

const cases = [
  { name: "UPPERCASE", fn: p.toUpperCase },
  { name: "lowercase", fn: p.toLowerCase },
  { name: "Title Case", fn: p.toTitleCase },
  { name: "Sentence case", fn: p.toSentenceCase },
  { name: "camelCase", fn: p.toCamelCase },
  { name: "snake_case", fn: p.toSnakeCase },
  { name: "kebab-case", fn: p.toKebabCase },
  { name: "PascalCase", fn: p.toPascalCase },
  { name: "aLtErNaTiNg", fn: p.toAlternatingCase },
  { name: "InVeRsE cAsE", fn: p.toInverseCase },
]

export default function Page() {
  const [input, setInput] = useState("")
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const copy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  return (
    <>
      <ToolPageMeta title="Case Converter" description="Free online Case Converter tool. Fast, secure, and easy to use. No registration required." keywords="case converter, free online tool, case-converter, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Case Converter" }]} />
      <section className="relative border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">Text Tool</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">Case <span className="gradient-text">Converter</span></h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">Convert text to 10 different cases including uppercase, lowercase, camelCase, snake_case and more.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between items-center">
          <label className="text-sm font-medium text-theme-primary">Input Text:</label>
          <button onClick={() => setInput("")} disabled={!input} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded-lg transition-colors text-theme-primary disabled:opacity-50">
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full min-h-[200px] p-4 bg-theme-card border border-theme rounded-xl text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 resize-y transition-colors"
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cases.map((c, idx) => {
            const output = input ? c.fn(input) : ""
            return (
              <div key={idx} className="p-4 glass-card border border-theme rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-theme-primary">{c.name}</span>
                  <button onClick={() => copy(output, idx)} disabled={!output} className="flex items-center gap-1 px-2 py-1 text-xs bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded transition-colors disabled:opacity-50">
                    {copiedIdx === idx ? <><Check className="w-3 h-3 text-green-500" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                  </button>
                </div>
                <div className="text-sm text-theme-secondary font-mono break-all min-h-[40px] p-2 rounded bg-theme-secondary">
                  {output || <span className="italic opacity-50">Output will appear here...</span>}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <SEOSections toolSlug="case-converter" toolName="Case Converter" />
    </>
  )
}
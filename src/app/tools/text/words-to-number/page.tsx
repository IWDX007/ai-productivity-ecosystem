"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { wordsToNumber } from "@/lib/processing/text/allTextProcessors"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Copy, Check } from "lucide-react"

export default function Page() {
  const [words, setWords] = useState("")
  const [copied, setCopied] = useState(false)
  const output = words ? wordsToNumber(words) : 0

  const copy = async () => {
    await navigator.clipboard.writeText(output.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <ToolPageMeta title="Words To Number" description="Free online Words To Number tool. Fast, secure, and easy to use. No registration required." keywords="words to number, free online tool, words-to-number, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Words to Number" }]} />
      <section className="relative border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">Converter</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">Words to <span className="gradient-text">Number</span></h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">Convert English words into their numeric value.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-2xl">
        <label className="block text-sm font-medium text-theme-primary mb-2">Enter Words:</label>
        <input type="text" value={words} onChange={(e) => setWords(e.target.value)} placeholder="e.g. one hundred twenty three" className="w-full p-4 bg-theme-card border border-theme rounded-xl text-theme-primary text-lg focus:outline-none focus:border-crimson-500 mb-4" />

        {words && (
          <div className="p-6 glass-card border border-theme rounded-xl">
            <div className="flex justify-between items-start mb-3">
              <label className="text-sm font-medium text-theme-primary">Number:</label>
              <button onClick={copy} className="flex items-center gap-1 px-3 py-1 text-xs btn-primary rounded">
                {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
              </button>
            </div>
            <p className="text-theme-primary text-3xl font-bold">{output.toLocaleString()}</p>
          </div>
        )}
      </section>

      <SEOSections toolSlug="words-to-number" toolName="Words to Number" />
    </>
  )
}
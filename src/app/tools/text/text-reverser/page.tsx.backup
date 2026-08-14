"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import * as p from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function Page() {
  const [mode, setMode] = useState<"chars" | "words" | "lines" | "each">("chars")
  const process = (text: string) => {
    if (mode === "chars") return p.reverseCharacters(text)
    if (mode === "words") return p.reverseWords(text)
    if (mode === "lines") return p.reverseLines(text)
    return p.reverseEachWord(text)
  }
  return (
    <>
      <ToolPageMeta title="Text Reverser" description="Reverse text by characters, words, lines or reverse each word individually. Free online text reversal tool." keywords="text reverser, free online tool, text-reverser, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Text Reverser" }]} />
      <TextToolTemplate
        title="Text Reverser"
        description="Reverse text by characters, words, lines or reverse each word individually. Free online text reversal tool."
        placeholder="Type or paste text to reverse..."
        badge="Text Tool"
        showOutput={true}
        onProcess={process}
        statsPanel={() => (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3">Reverse Mode</h3>
            <div className="space-y-2">
              {[{ v: "chars", l: "Characters" }, { v: "words", l: "Word Order" }, { v: "lines", l: "Line Order" }, { v: "each", l: "Each Word" }].map(o => (
                <button key={o.v} onClick={() => setMode(o.v as any)} className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${mode === o.v ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "text-theme-secondary hover:bg-theme-secondary"}`}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        )}
      />
      <SEOSections toolSlug="text-reverser" toolName="Text Reverser" />
    </>
  )
}
"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import * as p from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface WhitespaceRemoverClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function WhitespaceRemoverClient({ name, description }: WhitespaceRemoverClientProps) {
  const [mode, setMode] = useState<"extra" | "all" | "leading" | "trailing" | "empty">("extra")
  const process = (t: string) => {
    if (mode === "extra") return p.removeExtraWhitespace(t)
    if (mode === "all") return p.removeAllWhitespace(t)
    if (mode === "leading") return p.removeLeadingSpaces(t)
    if (mode === "trailing") return p.removeTrailingSpaces(t)
    return p.removeEmptyLines(t)
  }
  return (
    <>
      <ToolPageMeta title="Whitespace Remover" description="Remove extra spaces, all whitespace, leading/trailing spaces or empty lines from text." keywords="whitespace remover, free online tool, whitespace-remover, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Whitespace Remover" }]} />
      <TextToolTemplate
        title="Whitespace Remover"
        description="Remove extra spaces, all whitespace, leading/trailing spaces or empty lines from text."
        placeholder="Paste text with extra whitespace..."
        badge="Text Tool"
        showOutput={true}
        onProcess={process}
        statsPanel={() => (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3">Remove Mode</h3>
            <div className="space-y-2">
              {[{ v: "extra", l: "Extra Spaces" }, { v: "all", l: "All Whitespace" }, { v: "leading", l: "Leading Spaces" }, { v: "trailing", l: "Trailing Spaces" }, { v: "empty", l: "Empty Lines" }].map(o => (
                <button key={o.v} onClick={() => setMode(o.v as any)} className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${mode === o.v ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "text-theme-secondary hover:bg-theme-secondary"}`}>{o.l}</button>
              ))}
            </div>
          </div>
        )}
      />
</>
  )
}
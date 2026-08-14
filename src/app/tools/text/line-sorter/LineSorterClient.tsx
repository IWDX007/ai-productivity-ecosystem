"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import * as p from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface LineSorterClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function LineSorterClient({ name, description }: LineSorterClientProps) {
  const [mode, setMode] = useState<"asc" | "desc" | "num-asc" | "num-desc" | "shuffle">("asc")
  const process = (text: string) => {
    if (mode === "asc") return p.sortLinesAsc(text)
    if (mode === "desc") return p.sortLinesDesc(text)
    if (mode === "num-asc") return p.sortLinesNumeric(text, false)
    if (mode === "num-desc") return p.sortLinesNumeric(text, true)
    return p.shuffleLines(text)
  }
  return (
    <>
      <ToolPageMeta title="Line Sorter" description="Sort lines alphabetically, numerically, or randomize the order. Ascending or descending." keywords="line sorter, free online tool, line-sorter, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Line Sorter" }]} />
      <TextToolTemplate
        title="Line Sorter"
        description="Sort lines alphabetically, numerically, or randomize the order. Ascending or descending."
        placeholder="Paste lines to sort (one per line)..."
        badge="Text Tool"
        showOutput={true}
        onProcess={process}
        statsPanel={() => (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3">Sort Mode</h3>
            <div className="space-y-2">
              {[{ v: "asc", l: "A -> Z" }, { v: "desc", l: "Z -> A" }, { v: "num-asc", l: "1 -> 9" }, { v: "num-desc", l: "9 -> 1" }, { v: "shuffle", l: "Shuffle" }].map(o => (
                <button key={o.v} onClick={() => setMode(o.v as any)} className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${mode === o.v ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "text-theme-secondary hover:bg-theme-secondary"}`}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        )}
      />
</>
  )
}
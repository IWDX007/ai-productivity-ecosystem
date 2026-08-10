"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { mergeText } from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function Page() {
  const [delim, setDelim] = useState(", ")
  return (
    <>
      <ToolPageMeta title="Text Merger" description="Merge multiple lines of text into one line with a custom separator." keywords="text merger, free online tool, text-merger, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Text Merger" }]} />
      <TextToolTemplate
        title="Text Merger"
        description="Merge multiple lines of text into one line with a custom separator."
        placeholder="Paste multiple lines to merge..."
        badge="Text Tool"
        showOutput={true}
        onProcess={(t) => mergeText(t, delim)}
        statsPanel={() => (
          <div className="p-4 glass-card border border-theme rounded-xl space-y-3">
            <h3 className="text-sm font-semibold text-theme-primary">Join With</h3>
            <input value={delim} onChange={(e) => setDelim(e.target.value)} placeholder="e.g. , or ; " className="w-full p-2 bg-theme-secondary border border-theme rounded text-theme-primary text-sm" />
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setDelim(", ")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">, </button>
              <button onClick={() => setDelim("; ")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">; </button>
              <button onClick={() => setDelim(" ")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">Space</button>
              <button onClick={() => setDelim(" | ")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">|</button>
              <button onClick={() => setDelim("-")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">-</button>
              <button onClick={() => setDelim("")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">None</button>
            </div>
          </div>
        )}
      />
      <SEOSections toolSlug="text-merger" toolName="Text Merger" />
    </>
  )
}
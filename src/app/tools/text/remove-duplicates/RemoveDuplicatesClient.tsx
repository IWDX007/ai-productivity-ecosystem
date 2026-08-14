"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import * as p from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
interface Props { name: string; description: string; }
export default function RemoveDuplicatesClient({ name, description }: Props) {
  const [mode, setMode] = useState<"lines" | "words">("lines")
  const [caseSensitive, setCaseSensitive] = useState(true)
  const process = (text: string) => mode === "lines" ? p.removeDuplicateLines(text, caseSensitive) : p.removeDuplicateWords(text)
  return (
    <>
      <ToolPageMeta title="Remove Duplicates" description="Remove duplicate lines or words from text. Case-sensitive option available for precise filtering." keywords="remove duplicates, free online tool, remove-duplicates, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Remove Duplicates" }]} />
      <TextToolTemplate
        title="Remove Duplicates"
        description="Remove duplicate lines or words from text. Case-sensitive option available for precise filtering."
        placeholder="Paste text with duplicate lines or words..."
        badge="Text Tool"
        showOutput={true}
        onProcess={process}
        statsPanel={() => (
          <div className="p-4 glass-card border border-theme rounded-xl space-y-3">
            <h3 className="text-sm font-semibold text-theme-primary">Options</h3>
            <div>
              <label className="text-xs text-theme-secondary mb-2 block">Remove Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setMode("lines")} className={`p-2 text-xs rounded-lg transition-colors ${mode === "lines" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "bg-theme-secondary text-theme-primary"}`}>Lines</button>
                <button onClick={() => setMode("words")} className={`p-2 text-xs rounded-lg transition-colors ${mode === "words" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "bg-theme-secondary text-theme-primary"}`}>Words</button>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-theme-primary cursor-pointer">
              <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded accent-crimson-500" />
              Case Sensitive
            </label>
          </div>
        )}
      />
</>
  )
}
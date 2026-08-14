"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { splitText } from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
interface Props { name: string; description: string; }
export default function TextSplitterClient({ name, description }: Props) {
  const [delim, setDelim] = useState(",")
  return (
    <>
      <ToolPageMeta title="Text Splitter" description="Split text by any delimiter (comma, space, tab, custom character) into separate lines." keywords="text splitter, free online tool, text-splitter, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Text Splitter" }]} />
      <TextToolTemplate
        title="Text Splitter"
        description="Split text by any delimiter (comma, space, tab, custom character) into separate lines."
        placeholder="Enter text like: apple, banana, cherry"
        badge="Text Tool"
        showOutput={true}
        onProcess={(t) => splitText(t, delim)}
        statsPanel={() => (
          <div className="p-4 glass-card border border-theme rounded-xl space-y-3">
            <h3 className="text-sm font-semibold text-theme-primary">Delimiter</h3>
            <input value={delim} onChange={(e) => setDelim(e.target.value)} placeholder="e.g. , or ;" className="w-full p-2 bg-theme-secondary border border-theme rounded text-theme-primary text-sm" />
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setDelim(",")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">,</button>
              <button onClick={() => setDelim(";")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">;</button>
              <button onClick={() => setDelim(" ")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">Space</button>
              <button onClick={() => setDelim("\t")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">Tab</button>
              <button onClick={() => setDelim("|")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">|</button>
              <button onClick={() => setDelim(":")} className="p-2 text-xs bg-theme-secondary hover:bg-crimson-500/10 rounded text-theme-primary">:</button>
            </div>
          </div>
        )}
      />
</>
  )
}
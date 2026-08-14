"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { repeatText } from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function Page() {
  const [count, setCount] = useState(5)
  const [sep, setSep] = useState("\n")
  return (
    <>
      <ToolPageMeta title="Text Repeater" description="Repeat any text multiple times with custom separator. Great for testing and generating patterns." keywords="text repeater, free online tool, text-repeater, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Text Repeater" }]} />
      <TextToolTemplate
        title="Text Repeater"
        description="Repeat any text multiple times with custom separator. Great for testing and generating patterns."
        placeholder="Enter text to repeat..."
        badge="Text Tool"
        showOutput={true}
        onProcess={(t) => repeatText(t, count, sep)}
        statsPanel={() => (
          <div className="p-4 glass-card border border-theme rounded-xl space-y-3">
            <h3 className="text-sm font-semibold text-theme-primary">Options</h3>
            <div>
              <label className="text-xs text-theme-secondary mb-1 block">Repeat Count</label>
              <input type="number" min="1" max="1000" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} className="w-full p-2 bg-theme-secondary border border-theme rounded text-theme-primary" />
            </div>
            <div>
              <label className="text-xs text-theme-secondary mb-1 block">Separator</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setSep("\n")} className={`p-2 text-xs rounded ${sep === "\n" ? "bg-crimson-500/10 text-crimson-500" : "bg-theme-secondary text-theme-primary"}`}>New Line</button>
                <button onClick={() => setSep(" ")} className={`p-2 text-xs rounded ${sep === " " ? "bg-crimson-500/10 text-crimson-500" : "bg-theme-secondary text-theme-primary"}`}>Space</button>
                <button onClick={() => setSep(", ")} className={`p-2 text-xs rounded ${sep === ", " ? "bg-crimson-500/10 text-crimson-500" : "bg-theme-secondary text-theme-primary"}`}>Comma</button>
                <button onClick={() => setSep("")} className={`p-2 text-xs rounded ${sep === "" ? "bg-crimson-500/10 text-crimson-500" : "bg-theme-secondary text-theme-primary"}`}>None</button>
              </div>
            </div>
          </div>
        )}
      />
      <SEOSections toolSlug="text-repeater" toolName="Text Repeater" />
    </>
  )
}
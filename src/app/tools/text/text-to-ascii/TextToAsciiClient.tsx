"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import * as p from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
interface Props { name: string; description: string; }
export default function TextToAsciiClient({ name, description }: Props) {
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const process = (t: string) => mode === "encode" ? p.textToASCII(t) : p.asciiToText(t)
  return (
    <>
      <ToolPageMeta title="Text to ASCII" description="Convert text to ASCII character codes or convert ASCII codes back to text." keywords="text to ascii, free online tool, text-to-ascii, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Text to ASCII" }]} />
      <TextToolTemplate
        title="Text to ASCII"
        description="Convert text to ASCII character codes or convert ASCII codes back to text."
        placeholder={mode === "encode" ? "Enter text..." : "Enter ASCII codes (space separated: 72 101 108 108 111)"}
        badge="Converter"
        showOutput={true}
        onProcess={process}
        statsPanel={() => (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3">Mode</h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setMode("encode")} className={`p-2 rounded-lg text-sm transition-colors ${mode === "encode" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "bg-theme-secondary text-theme-primary"}`}>Text to ASCII</button>
              <button onClick={() => setMode("decode")} className={`p-2 rounded-lg text-sm transition-colors ${mode === "decode" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "bg-theme-secondary text-theme-primary"}`}>ASCII to Text</button>
            </div>
          </div>
        )}
      />
</>
  )
}
"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import * as p from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function Page() {
  const [mode, setMode] = useState<"url" | "html" | "base64">("url")
  const process = (t: string) => mode === "url" ? p.decodeURL(t) : mode === "html" ? p.decodeHTML(t) : p.decodeBase64(t)
  return (
    <>
      <ToolPageMeta title="Text Decoder" description="Decode URL-encoded, HTML entities or Base64 encoded text back to readable format." keywords="text decoder, free online tool, text-decoder, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Text Decoder" }]} />
      <TextToolTemplate
        title="Text Decoder"
        description="Decode URL-encoded, HTML entities or Base64 encoded text back to readable format."
        placeholder="Paste encoded text to decode..."
        badge="Decoder"
        showOutput={true}
        onProcess={process}
        statsPanel={() => (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3">Decoding Type</h3>
            <div className="space-y-2">
              {[{ v: "url", l: "URL Decode" }, { v: "html", l: "HTML Entities" }, { v: "base64", l: "Base64" }].map(o => (
                <button key={o.v} onClick={() => setMode(o.v as any)} className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${mode === o.v ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "text-theme-secondary hover:bg-theme-secondary"}`}>{o.l}</button>
              ))}
            </div>
          </div>
        )}
      />
      <SEOSections toolSlug="text-decoder" toolName="Text Decoder" />
    </>
  )
}
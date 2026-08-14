"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import * as p from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface TextEncoderClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function TextEncoderClient({ name, description }: TextEncoderClientProps) {
  const [mode, setMode] = useState<"url" | "html" | "base64">("url")
  const process = (t: string) => mode === "url" ? p.encodeURL(t) : mode === "html" ? p.encodeHTML(t) : p.encodeBase64(t)
  return (
    <>
      <ToolPageMeta title="Text Encoder" description="Encode text using URL encoding, HTML entities or Base64 encoding." keywords="text encoder, free online tool, text-encoder, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Text Encoder" }]} />
      <TextToolTemplate
        title="Text Encoder"
        description="Encode text using URL encoding, HTML entities or Base64 encoding."
        placeholder="Enter text to encode..."
        badge="Encoder"
        showOutput={true}
        onProcess={process}
        statsPanel={() => (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3">Encoding Type</h3>
            <div className="space-y-2">
              {[{ v: "url", l: "URL Encode" }, { v: "html", l: "HTML Entities" }, { v: "base64", l: "Base64" }].map(o => (
                <button key={o.v} onClick={() => setMode(o.v as any)} className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${mode === o.v ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "text-theme-secondary hover:bg-theme-secondary"}`}>{o.l}</button>
              ))}
            </div>
          </div>
        )}
      />
</>
  )
}
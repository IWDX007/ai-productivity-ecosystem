"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { slugify } from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface SlugGeneratorClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function SlugGeneratorClient({ name, description }: SlugGeneratorClientProps) {
  const [sep, setSep] = useState("-")
  return (
    <>
      <ToolPageMeta title="Slug Generator" description="Generate SEO-friendly URL slugs from any text. Supports hyphen and underscore separators." keywords="slug generator, free online tool, slug-generator, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Slug Generator" }]} />
      <TextToolTemplate
        title="Slug Generator"
        description="Generate SEO-friendly URL slugs from any text. Supports hyphen and underscore separators."
        placeholder="Enter your title or text..."
        badge="URL Tool"
        showOutput={true}
        onProcess={(t) => slugify(t, sep)}
        statsPanel={() => (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3">Separator</h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setSep("-")} className={`p-3 rounded-lg text-sm transition-colors ${sep === "-" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "bg-theme-secondary text-theme-primary"}`}>Hyphen (-)</button>
              <button onClick={() => setSep("_")} className={`p-3 rounded-lg text-sm transition-colors ${sep === "_" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "bg-theme-secondary text-theme-primary"}`}>Underscore (_)</button>
            </div>
          </div>
        )}
      />
</>
  )
}
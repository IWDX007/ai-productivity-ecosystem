"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { characterCount } from "@/lib/processing/text/allTextProcessors"
import { Hash } from "lucide-react"

export default function Page() {
  return (
    <>
      <ToolPageMeta title="Character Counter" description="Count characters with and without spaces, letters, digits and special characters. Perfect for Twitter, SMS and meta descriptions." keywords="character counter, free online tool, character-counter, text tools, ai productivity" />
      <Breadcrumbs items={[
        { label: "Tools", href: "/tools" },
        { label: "Text Tools", href: "/tools/text" },
        { label: "Character Counter" }
      ]} />
      <TextToolTemplate
        title="Character Counter"
        description="Count characters with and without spaces, letters, digits and special characters. Perfect for Twitter, SMS and meta descriptions."
        placeholder="Type or paste your text to count characters..."
        badge="Text Tool"
        statsPanel={(text) => {
          const s = characterCount(text)
          return (
            <div className="p-4 glass-card border border-theme rounded-xl">
              <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
                <Hash className="w-4 h-4 text-crimson-500" />
                Character Statistics
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Characters:</span><span className="font-bold text-theme-primary">{s.total.toLocaleString()}</span></div>
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Without Spaces:</span><span className="font-bold text-theme-primary">{s.noSpaces.toLocaleString()}</span></div>
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Spaces:</span><span className="font-bold text-theme-primary">{s.spaces.toLocaleString()}</span></div>
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Letters:</span><span className="font-bold text-theme-primary">{s.letters.toLocaleString()}</span></div>
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Digits:</span><span className="font-bold text-theme-primary">{s.digits.toLocaleString()}</span></div>
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Special:</span><span className="font-bold text-theme-primary">{s.special.toLocaleString()}</span></div>
              </div>
            </div>
          )
        }}
      />
      <SEOSections toolSlug="character-counter" toolName="Character Counter" />
    </>
  )
}
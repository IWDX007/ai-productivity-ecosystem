"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { lineStats } from "@/lib/processing/text/allTextProcessors"
import { List } from "lucide-react"

export default function Page() {
  return (
    <>
      <ToolPageMeta title="Line Counter" description="Count total lines, empty lines and analyze line statistics in your text." keywords="line counter, free online tool, line-counter, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Line Counter" }]} />
      <TextToolTemplate
        title="Line Counter"
        description="Count total lines, empty lines and analyze line statistics in your text."
        placeholder="Paste text to count lines..."
        badge="Text Tool"
        statsPanel={(text) => {
          const s = lineStats(text)
          return (
            <div className="p-4 glass-card border border-theme rounded-xl">
              <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
                <List className="w-4 h-4 text-crimson-500" /> Line Statistics
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Lines:</span><span className="font-bold text-theme-primary">{s.total}</span></div>
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Non-Empty:</span><span className="font-bold text-theme-primary">{s.nonEmpty}</span></div>
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Empty Lines:</span><span className="font-bold text-theme-primary">{s.empty}</span></div>
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Avg Length:</span><span className="font-bold text-theme-primary">{s.avgLength} chars</span></div>
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Longest:</span><span className="font-bold text-theme-primary">{s.longest} chars</span></div>
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Shortest:</span><span className="font-bold text-theme-primary">{s.shortest === Infinity ? 0 : s.shortest} chars</span></div>
              </div>
            </div>
          )
        }}
      />
      <SEOSections toolSlug="line-counter" toolName="Line Counter" />
    </>
  )
}
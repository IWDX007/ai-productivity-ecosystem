"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { readabilityScore } from "@/lib/processing/text/allTextProcessors"
import { BookOpen } from "lucide-react"

interface Props { name: string; description: string; }
export default function ReadabilityScoreClient({ name, description }: Props) {
  return (
    <>
      <ToolPageMeta title="Readability Score" description="Analyze text readability using the Flesch Reading Ease formula. Check what grade level your writing is at." keywords="readability score, free online tool, readability-score, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Readability Score" }]} />
      <TextToolTemplate
        title="Readability Score"
        description="Analyze text readability using the Flesch Reading Ease formula. Check what grade level your writing is at."
        placeholder="Paste text to check readability..."
        badge="Analysis"
        statsPanel={(text) => {
          const r = readabilityScore(text)
          const color = r.score >= 70 ? "text-green-500" : r.score >= 50 ? "text-yellow-500" : "text-red-500"
          return (
            <div className="p-4 glass-card border border-theme rounded-xl">
              <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-crimson-500" /> Flesch Reading Ease
              </h3>
              <div className="text-center py-4">
                <div className={`text-5xl font-bold ${color}`}>{r.score}</div>
                <div className="text-xs text-theme-secondary mt-1">Score (0-100)</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Level:</span><span className="font-bold text-theme-primary">{r.level}</span></div>
                <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Grade:</span><span className="font-bold text-theme-primary">{r.grade}</span></div>
              </div>
            </div>
          )
        }}
      />
</>
  )
}
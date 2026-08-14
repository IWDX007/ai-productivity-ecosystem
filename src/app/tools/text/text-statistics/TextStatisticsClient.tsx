"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { textStatistics } from "@/lib/processing/text/allTextProcessors"
import { BarChart3 } from "lucide-react"

interface Props { name: string; description: string; }
export default function TextStatisticsClient({ name, description }: Props) {
  return (
    <>
      <ToolPageMeta title="Text Statistics" description="Get comprehensive statistics about your text including word count, reading time, unique words and more." keywords="text statistics, free online tool, text-statistics, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Text Statistics" }]} />
      <TextToolTemplate
        title="Text Statistics"
        description="Get comprehensive statistics about your text including word count, reading time, unique words and more."
        placeholder="Paste your text for detailed analysis..."
        badge="Analysis"
        statsPanel={(text) => {
          const s = textStatistics(text)
          return (
            <div className="p-4 glass-card border border-theme rounded-xl">
              <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-crimson-500" /> Full Statistics
              </h3>
              <div className="space-y-1.5 text-sm">
                {[
                  ["Characters", s.chars],
                  ["No Spaces", s.charsNoSpaces],
                  ["Words", s.words],
                  ["Unique Words", s.uniqueWords],
                  ["Sentences", s.sentences],
                  ["Paragraphs", s.paragraphs],
                  ["Lines", s.lines],
                  ["Avg Word Length", `${s.avgWordLength} chars`],
                  ["Avg Sentence", `${s.avgSentenceLength} words`],
                  ["Reading Time", `${s.readingMin} min`],
                  ["Speaking Time", `${s.speakingMin} min`],
                ].map(([label, val], i) => (
                  <div key={i} className="flex justify-between p-2 rounded bg-theme-secondary">
                    <span className="text-theme-secondary">{label}:</span>
                    <span className="font-bold text-theme-primary">{typeof val === "number" ? val.toLocaleString() : val}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        }}
      />
</>
  )
}
"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { keywordDensity } from "@/lib/processing/text/allTextProcessors"
import { TrendingUp } from "lucide-react"

interface Props { name: string; description: string; }
export default function KeywordDensityClient({ name, description }: Props) {
  return (
    <>
      <ToolPageMeta title="Keyword Density" description="Analyze keyword frequency and density in your text. Perfect for SEO content optimization." keywords="keyword density, free online tool, keyword-density, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Keyword Density" }]} />
      <TextToolTemplate
        title="Keyword Density"
        description="Analyze keyword frequency and density in your text. Perfect for SEO content optimization."
        placeholder="Paste your content to analyze keywords..."
        badge="SEO Tool"
        extraPanel={(text) => {
          const r = keywordDensity(text)
          if (r.results.length === 0) return null
          const max = r.results[0].count
          return (
            <div className="p-4 glass-card border border-theme rounded-xl">
              <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-crimson-500" /> Top Keywords
              </h3>
              <div className="flex justify-between text-xs text-theme-secondary mb-3">
                <span>Total: <b className="text-theme-primary">{r.total}</b></span>
                <span>Unique: <b className="text-theme-primary">{r.unique}</b></span>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {r.results.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-theme-primary font-mono">{item.word}</span>
                      <span className="text-theme-secondary">{item.count} ({item.density}%)</span>
                    </div>
                    <div className="h-1.5 bg-theme-secondary rounded-full overflow-hidden">
                      <div className="h-full gradient-crimson rounded-full" style={{ width: `${(item.count / max) * 100}%` }} />
                    </div>
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
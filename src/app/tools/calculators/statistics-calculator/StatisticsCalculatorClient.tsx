"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { calculateStats } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { BarChart3 } from "lucide-react"

interface StatisticsCalculatorClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function StatisticsCalculatorClient({ name, description }: StatisticsCalculatorClientProps) {
  const [nums, setNums] = useState("")
  const r = useMemo(() => {
    const arr = nums.split(/[,\s]+/).map(Number).filter(n => !isNaN(n))
    return calculateStats(arr)
  }, [nums])

  return (
    <>
      <ToolPageMeta title="Statistics Calculator" description="Calculate mean, median, mode, range, variance and standard deviation from a set of numbers." keywords="statistics calculator, free online tool, statistics-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Statistics Calculator" }]} />
      <CalculatorTemplate
        title="Statistics Calculator"
        description="Calculate mean, median, mode, range, variance and standard deviation from a set of numbers."
        badge="Math Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-crimson-500" /> Statistics</h3>
            <div className="space-y-1.5 text-sm">
              {[["Count", r.count], ["Sum", r.sum], ["Mean", r.mean], ["Median", r.median], ["Mode", r.mode], ["Min", r.min], ["Max", r.max], ["Range", r.range], ["Variance", r.variance], ["Std Dev", r.stdDev]].map(([label, val], i) => (
                <div key={i} className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">{label}:</span><span className="font-bold text-theme-primary">{val}</span></div>
              ))}
            </div>
          </div>
        )}
      >
        <div><label className="block text-sm font-medium text-theme-primary mb-2">Numbers (comma or space separated)</label><textarea value={nums} onChange={(e) => setNums(e.target.value)} placeholder="10, 20, 30, 40, 50" className="w-full min-h-[150px] p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500 resize-y" /></div>
      </CalculatorTemplate>
</>
  )
}
"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculatePercentage } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Percent } from "lucide-react"

export default function Page() {
  const [op, setOp] = useState("of")
  const [val1, setVal1] = useState("")
  const [val2, setVal2] = useState("")
  const result = calculatePercentage(op, parseFloat(val1), parseFloat(val2))

  const labels: Record<string, [string, string]> = {
    "of": ["What is X% of Y?", "% of"],
    "is-what": ["X is what % of Y?", "is what % of"],
    "increase": ["Increase X by Y%", "increased by %"],
    "decrease": ["Decrease X by Y%", "decreased by %"],
    "change": ["% change from X to Y", "changed to"]
  }

  return (
    <>
      <ToolPageMeta title="Percentage Calculator" description="Calculate percentages, increase, decrease and percentage change with 5 different operations." keywords="percentage calculator, free online tool, percentage-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Percentage Calculator" }]} />
      <CalculatorTemplate
        title="Percentage Calculator"
        description="Calculate percentages, increase, decrease and percentage change with 5 different operations."
        badge="Math Calculator"
        resultPanel={val1 && val2 && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
              <Percent className="w-4 h-4 text-crimson-500" /> Result
            </h3>
            <div className="text-center py-4">
              <div className="text-4xl font-bold gradient-text">{Math.round(result * 100) / 100}{op === "is-what" || op === "change" ? "%" : ""}</div>
              <div className="text-sm text-theme-secondary mt-1">{labels[op][0]}</div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Select Operation</label>
            <select value={op} onChange={(e) => setOp(e.target.value)} className="w-full p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500">
              {Object.entries(labels).map(([k, v]) => <option key={k} value={k}>{v[0]}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 items-end">
            <div>
              <label className="block text-sm font-medium text-theme-primary mb-2">X Value</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} placeholder="20" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-primary mb-2">Y Value</label>
              <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} placeholder="150" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
            </div>
          </div>
        </div>
      </CalculatorTemplate>
      <SEOSections toolSlug="percentage-calculator" toolName="Percentage Calculator" />
    </>
  )
}
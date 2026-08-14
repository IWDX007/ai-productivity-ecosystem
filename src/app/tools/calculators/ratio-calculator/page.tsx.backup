"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { simplifyRatio } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { GitCompare } from "lucide-react"

export default function Page() {
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const r = simplifyRatio(parseFloat(a), parseFloat(b))

  return (
    <>
      <ToolPageMeta title="Ratio Calculator" description="Simplify ratios and convert them to their lowest terms with decimal equivalent." keywords="ratio calculator, free online tool, ratio-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Ratio Calculator" }]} />
      <CalculatorTemplate
        title="Ratio Calculator"
        description="Simplify ratios and convert them to their lowest terms with decimal equivalent."
        badge="Math Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><GitCompare className="w-4 h-4 text-crimson-500" /> Simplified Ratio</h3>
            <div className="text-center py-4">
              <div className="text-5xl font-bold gradient-text">{r.a} : {r.b}</div>
              <div className="text-sm text-theme-secondary mt-2">= {r.decimal}</div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-theme-primary mb-2">First Number</label><input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="24" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
            <div><label className="block text-sm font-medium text-theme-primary mb-2">Second Number</label><input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="36" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          </div>
        </div>
      </CalculatorTemplate>
      <SEOSections toolSlug="ratio-calculator" toolName="Ratio Calculator" />
    </>
  )
}
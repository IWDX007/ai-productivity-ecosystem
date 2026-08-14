"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateProbability } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Dice6 } from "lucide-react"

export default function Page() {
  const [fav, setFav] = useState("")
  const [tot, setTot] = useState("")
  const r = calculateProbability(parseInt(fav), parseInt(tot))

  return (
    <>
      <ToolPageMeta title="Probability Calculator" description="Calculate the probability of an event as percentage, decimal and odds." keywords="probability calculator, free online tool, probability-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Probability Calculator" }]} />
      <CalculatorTemplate
        title="Probability Calculator"
        description="Calculate the probability of an event as percentage, decimal and odds."
        badge="Math Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Dice6 className="w-4 h-4 text-crimson-500" /> Probability</h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-5xl font-bold gradient-text">{r.percentage}%</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Decimal:</span><span className="font-bold text-theme-primary">{r.decimal}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Odds:</span><span className="font-bold text-theme-primary">{r.odds}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Favorable Outcomes</label><input type="number" value={fav} onChange={(e) => setFav(e.target.value)} placeholder="3" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Total Outcomes</label><input type="number" value={tot} onChange={(e) => setTot(e.target.value)} placeholder="10" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
        </div>
      </CalculatorTemplate>
      <SEOSections toolSlug="probability-calculator" toolName="Probability Calculator" />
    </>
  )
}
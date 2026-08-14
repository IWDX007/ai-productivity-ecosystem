"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateSimpleInterest } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { PiggyBank } from "lucide-react"

interface Props { name: string; description: string; }
export default function SimpleInterestClient({ name, description }: Props) {
  const [p, setP] = useState("")
  const [r, setR] = useState("")
  const [t, setT] = useState("")
  const result = calculateSimpleInterest(parseFloat(p), parseFloat(r), parseFloat(t))

  return (
    <>
      <ToolPageMeta title="Simple Interest Calculator" description="Calculate simple interest on your investment or loan quickly and easily." keywords="simple interest calculator, free online tool, simple-interest, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Simple Interest" }]} />
      <CalculatorTemplate
        title="Simple Interest Calculator"
        description="Calculate simple interest on your investment or loan quickly and easily."
        badge="Financial Calculator"
        resultPanel={result && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-crimson-500" /> Interest Details
            </h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">${result.total.toLocaleString()}</div>
              <div className="text-sm text-theme-secondary">Total Amount</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Principal:</span><span className="font-bold text-theme-primary">${result.principal.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-green-500/10"><span className="text-green-500">Interest:</span><span className="font-bold text-green-500">${result.interest.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Rate:</span><span className="font-bold text-theme-primary">{result.rate}% for {result.years} yrs</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Principal ($)</label>
            <input type="number" value={p} onChange={(e) => setP(e.target.value)} placeholder="10000" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Rate (%)</label>
            <input type="number" step="0.1" value={r} onChange={(e) => setR(e.target.value)} placeholder="5" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Time (Years)</label>
            <input type="number" value={t} onChange={(e) => setT(e.target.value)} placeholder="5" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
        </div>
      </CalculatorTemplate>
</>
  )
}
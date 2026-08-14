"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateCompoundInterest } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { TrendingUp } from "lucide-react"

interface CompoundInterestClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function CompoundInterestClient({ name, description }: CompoundInterestClientProps) {
  const [p, setP] = useState("")
  const [r, setR] = useState("")
  const [t, setT] = useState("")
  const [n, setN] = useState("12")
  const result = calculateCompoundInterest(parseFloat(p), parseFloat(r), parseFloat(t), parseInt(n))

  return (
    <>
      <ToolPageMeta title="Compound Interest Calculator" description="Calculate compound interest and see how your investments grow over time with the power of compounding." keywords="compound interest calculator, free online tool, compound-interest, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Compound Interest" }]} />
      <CalculatorTemplate
        title="Compound Interest Calculator"
        description="Calculate compound interest and see how your investments grow over time with the power of compounding."
        badge="Investment Calculator"
        resultPanel={result && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-crimson-500" /> Investment Growth
            </h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">${result.amount.toLocaleString()}</div>
              <div className="text-sm text-theme-secondary">Future Value</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Principal:</span><span className="font-bold text-theme-primary">${result.principal.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-green-500/10"><span className="text-green-500">Interest Earned:</span><span className="font-bold text-green-500">${result.interest.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Rate:</span><span className="font-bold text-theme-primary">{result.rate}%</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Duration:</span><span className="font-bold text-theme-primary">{result.years} years</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Principal Amount ($)</label>
            <input type="number" value={p} onChange={(e) => setP(e.target.value)} placeholder="10000" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Annual Interest Rate (%)</label>
            <input type="number" step="0.1" value={r} onChange={(e) => setR(e.target.value)} placeholder="8" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Time Period (Years)</label>
            <input type="number" value={t} onChange={(e) => setT(e.target.value)} placeholder="10" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Compounded</label>
            <select value={n} onChange={(e) => setN(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500">
              <option value="1">Annually</option>
              <option value="2">Semi-Annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </select>
          </div>
        </div>
      </CalculatorTemplate>
</>
  )
}
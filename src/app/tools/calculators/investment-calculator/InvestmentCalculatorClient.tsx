"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateInvestment } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { TrendingUp } from "lucide-react"

interface InvestmentCalculatorClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function InvestmentCalculatorClient({ name, description }: InvestmentCalculatorClientProps) {
  const [m, setM] = useState("")
  const [y, setY] = useState("")
  const [r, setR] = useState("")
  const result = calculateInvestment(parseFloat(m), parseFloat(y), parseFloat(r))

  return (
    <>
      <ToolPageMeta title="Investment Calculator" description="Calculate future value of your monthly SIP investment with expected returns." keywords="investment calculator, free online tool, investment-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Investment Calculator" }]} />
      <CalculatorTemplate
        title="Investment Calculator"
        description="Calculate future value of your monthly SIP investment with expected returns."
        badge="Investment Calculator"
        resultPanel={result && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-crimson-500" /> Investment Returns</h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">${result.futureValue.toLocaleString()}</div>
              <div className="text-sm text-theme-secondary">Future Value</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Invested:</span><span className="font-bold text-theme-primary">${result.invested.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-green-500/10"><span className="text-green-500">Earnings:</span><span className="font-bold text-green-500">${result.earnings.toLocaleString()}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Monthly Investment ($)</label><input type="number" value={m} onChange={(e) => setM(e.target.value)} placeholder="500" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Duration (Years)</label><input type="number" value={y} onChange={(e) => setY(e.target.value)} placeholder="10" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Expected Return (%)</label><input type="number" step="0.1" value={r} onChange={(e) => setR(e.target.value)} placeholder="12" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
        </div>
      </CalculatorTemplate>
</>
  )
}
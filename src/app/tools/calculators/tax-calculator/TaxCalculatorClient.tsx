"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateTax } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Receipt } from "lucide-react"

interface TaxCalculatorClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function TaxCalculatorClient({ name, description }: TaxCalculatorClientProps) {
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState("")
  const r = calculateTax(parseFloat(amount), parseFloat(rate))

  return (
    <>
      <ToolPageMeta title="Tax Calculator" description="Calculate sales tax, VAT or GST on any amount. Simple and instant tax calculator." keywords="tax calculator, free online tool, tax-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Tax Calculator" }]} />
      <CalculatorTemplate
        title="Tax Calculator"
        description="Calculate sales tax, VAT or GST on any amount. Simple and instant tax calculator."
        badge="Financial Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-crimson-500" /> Tax Breakdown
            </h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">${r.total}</div>
              <div className="text-sm text-theme-secondary">Total (Amount + Tax)</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Original Amount:</span><span className="font-bold text-theme-primary">${r.amount}</span></div>
              <div className="flex justify-between p-2 rounded bg-red-500/10"><span className="text-red-500">Tax ({r.rate}%):</span><span className="font-bold text-red-500">${r.tax}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Amount ($)</label>
            <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Tax Rate (%)</label>
            <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="7.5" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[5, 7.5, 10, 18].map(d => (
                <button key={d} onClick={() => setRate(d.toString())} className="p-2 text-sm bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded text-theme-primary transition-colors">{d}%</button>
              ))}
            </div>
          </div>
        </div>
      </CalculatorTemplate>
</>
  )
}
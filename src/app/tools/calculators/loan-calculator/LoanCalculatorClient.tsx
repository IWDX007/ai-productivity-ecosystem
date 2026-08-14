"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateLoan } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { DollarSign } from "lucide-react"

interface LoanCalculatorClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function LoanCalculatorClient({ name, description }: LoanCalculatorClientProps) {
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("")
  const r = calculateLoan(parseFloat(amount), parseFloat(rate), parseFloat(years))

  return (
    <>
      <ToolPageMeta title="Loan Calculator" description="Calculate loan EMI, total interest and total payment for personal, home, car or education loans." keywords="loan calculator, free online tool, loan-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Loan Calculator" }]} />
      <CalculatorTemplate
        title="Loan Calculator"
        description="Calculate loan EMI, total interest and total payment for personal, home, car or education loans."
        badge="Financial Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-crimson-500" /> Loan Summary
            </h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">${r.emi.toLocaleString()}</div>
              <div className="text-sm text-theme-secondary">Monthly EMI</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Principal:</span><span className="font-bold text-theme-primary">${r.principal.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Interest:</span><span className="font-bold text-red-500">${r.totalInterest.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Payment:</span><span className="font-bold text-green-500">${r.totalPayment.toLocaleString()}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Loan Amount ($)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100000" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Annual Interest Rate (%)</label>
            <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8.5" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Loan Term (Years)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="10" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
        </div>
      </CalculatorTemplate>
</>
  )
}
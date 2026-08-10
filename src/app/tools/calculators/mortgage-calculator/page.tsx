"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateMortgage } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Home } from "lucide-react"

export default function Page() {
  const [price, setPrice] = useState("")
  const [down, setDown] = useState("")
  const [rate, setRate] = useState("")
  const [years, setYears] = useState("30")
  const r = calculateMortgage(parseFloat(price), parseFloat(down), parseFloat(rate), parseFloat(years))

  return (
    <>
      <ToolPageMeta title="Mortgage Calculator" description="Calculate monthly mortgage payments, total interest and payment breakdown for home loans." keywords="mortgage calculator, free online tool, mortgage-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Mortgage Calculator" }]} />
      <CalculatorTemplate
        title="Mortgage Calculator"
        description="Calculate monthly mortgage payments, total interest and payment breakdown for home loans."
        badge="Financial Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
              <Home className="w-4 h-4 text-crimson-500" /> Mortgage Details
            </h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">${r.monthly.toLocaleString()}</div>
              <div className="text-sm text-theme-secondary">Monthly Payment</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Down Payment:</span><span className="font-bold text-theme-primary">${r.downPayment.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Loan Amount:</span><span className="font-bold text-theme-primary">${r.principal.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-red-500/10"><span className="text-red-500">Total Interest:</span><span className="font-bold text-red-500">${r.totalInterest.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Paid:</span><span className="font-bold text-green-500">${r.totalPayment.toLocaleString()}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Home Price ($)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="300000" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Down Payment ($)</label>
            <input type="number" value={down} onChange={(e) => setDown(e.target.value)} placeholder="60000" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Interest Rate (%)</label>
            <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="6.5" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Loan Term (Years)</label>
            <select value={years} onChange={(e) => setYears(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500">
              <option value="10">10 Years</option>
              <option value="15">15 Years</option>
              <option value="20">20 Years</option>
              <option value="25">25 Years</option>
              <option value="30">30 Years</option>
            </select>
          </div>
        </div>
      </CalculatorTemplate>
      <SEOSections toolSlug="mortgage-calculator" toolName="Mortgage Calculator" />
    </>
  )
}
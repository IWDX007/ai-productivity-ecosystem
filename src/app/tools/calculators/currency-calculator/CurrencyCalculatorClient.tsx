"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { convertCurrency, CURRENCIES } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { DollarSign, ArrowRight } from "lucide-react"

interface CurrencyCalculatorClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function CurrencyCalculatorClient({ name, description }: CurrencyCalculatorClientProps) {
  const [amt, setAmt] = useState("100")
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("EUR")
  const result = convertCurrency(parseFloat(amt), from, to)

  return (
    <>
      <ToolPageMeta title="Currency Calculator" description="Convert between major world currencies. Quick conversion with common exchange rates." keywords="currency calculator, free online tool, currency-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Currency Calculator" }]} />
      <CalculatorTemplate
        title="Currency Calculator"
        description="Convert between major world currencies. Quick conversion with common exchange rates."
        badge="Currency Tool"
        resultPanel={result > 0 && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><DollarSign className="w-4 h-4 text-crimson-500" /> Converted Amount</h3>
            <div className="text-center py-4">
              <div className="text-3xl font-bold gradient-text">{result.toLocaleString()} {to}</div>
              <div className="text-sm text-theme-secondary mt-2 flex items-center justify-center gap-2">{amt} {from} <ArrowRight className="w-3 h-3" /> {result} {to}</div>
            </div>
            <p className="text-xs text-theme-muted mt-4 p-2 bg-theme-secondary rounded">Note: Static rates for reference. Check bank/forex for live rates.</p>
          </div>
        )}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Amount</label><input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-theme-primary mb-2">From</label><select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500">{CURRENCIES.map(c => <option key={c}>{c}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-theme-primary mb-2">To</label><select value={to} onChange={(e) => setTo(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500">{CURRENCIES.map(c => <option key={c}>{c}</option>)}</select></div>
          </div>
        </div>
      </CalculatorTemplate>
</>
  )
}
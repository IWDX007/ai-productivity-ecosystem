"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateRetirement } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Umbrella } from "lucide-react"

export default function Page() {
  const [age, setAge] = useState("")
  const [retire, setRetire] = useState("65")
  const [savings, setSavings] = useState("")
  const [monthly, setMonthly] = useState("")
  const [ret, setRet] = useState("7")
  const r = calculateRetirement(parseInt(age), parseInt(retire), parseFloat(savings) || 0, parseFloat(monthly) || 0, parseFloat(ret))

  return (
    <>
      <ToolPageMeta title="Retirement Calculator" description="Plan your retirement and see how much you will have saved by your target retirement age." keywords="retirement calculator, free online tool, retirement-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Retirement Calculator" }]} />
      <CalculatorTemplate
        title="Retirement Calculator"
        description="Plan your retirement and see how much you will have saved by your target retirement age."
        badge="Retirement Planning"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Umbrella className="w-4 h-4 text-crimson-500" /> Retirement Fund</h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">${r.totalSavings.toLocaleString()}</div>
              <div className="text-sm text-theme-secondary">In {r.yearsUntilRetirement} years</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">From Contributions:</span><span className="font-bold text-theme-primary">${r.fromContributions.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">From Growth:</span><span className="font-bold text-green-500">${r.fromInitialSavings.toLocaleString()}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-theme-primary mb-2">Current Age</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="30" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
            <div><label className="block text-sm font-medium text-theme-primary mb-2">Retire At</label><input type="number" value={retire} onChange={(e) => setRetire(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          </div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Current Savings ($)</label><input type="number" value={savings} onChange={(e) => setSavings(e.target.value)} placeholder="20000" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Monthly Contribution ($)</label><input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} placeholder="500" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Expected Annual Return (%)</label><input type="number" step="0.1" value={ret} onChange={(e) => setRet(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
        </div>
      </CalculatorTemplate>
      <SEOSections toolSlug="retirement-calculator" toolName="Retirement Calculator" />
    </>
  )
}
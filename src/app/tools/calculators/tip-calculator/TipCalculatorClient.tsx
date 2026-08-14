"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateTip } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Users } from "lucide-react"

interface Props { name: string; description: string; }
export default function TipCalculatorClient({ name, description }: Props) {
  const [bill, setBill] = useState("")
  const [tip, setTip] = useState(15)
  const [people, setPeople] = useState(1)
  const r = calculateTip(parseFloat(bill), tip, people)

  return (
    <>
      <ToolPageMeta title="Tip Calculator" description="Calculate tip amount and split bills easily. Perfect for restaurants, cafes and group dining." keywords="tip calculator, free online tool, tip-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Tip Calculator" }]} />
      <CalculatorTemplate
        title="Tip Calculator"
        description="Calculate tip amount and split bills easily. Perfect for restaurants, cafes and group dining."
        badge="Bill Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-crimson-500" /> Bill Split
            </h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">${r.total}</div>
              <div className="text-sm text-theme-secondary">Total Bill (Bill + Tip)</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Tip Amount:</span><span className="font-bold text-theme-primary">${r.tip}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Per Person:</span><span className="font-bold text-crimson-500">${r.perPerson}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Tip Per Person:</span><span className="font-bold text-theme-primary">${r.tipPerPerson}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Bill Amount ($)</label>
            <input type="number" step="0.01" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="50.00" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Tip Percentage: {tip}%</label>
            <input type="range" min="0" max="30" value={tip} onChange={(e) => setTip(parseInt(e.target.value))} className="w-full accent-crimson-500" />
            <div className="grid grid-cols-5 gap-2 mt-2">
              {[10, 15, 18, 20, 25].map(t => (
                <button key={t} onClick={() => setTip(t)} className={`p-2 text-sm rounded transition-colors ${tip === t ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/30" : "bg-theme-secondary text-theme-primary border border-theme"}`}>{t}%</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Number of People</label>
            <input type="number" min="1" value={people} onChange={(e) => setPeople(parseInt(e.target.value) || 1)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
        </div>
      </CalculatorTemplate>
</>
  )
}
"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateWaterIntake } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Droplet } from "lucide-react"

interface Props { name: string; description: string; }
export default function WaterIntakeClient({ name, description }: Props) {
  const [w, setW] = useState("")
  const [act, setAct] = useState("30")
  const r = calculateWaterIntake(parseFloat(w), parseFloat(act) || 0)

  return (
    <>
      <ToolPageMeta title="Water Intake Calculator" description="Calculate your daily water intake needs based on weight and activity level." keywords="water intake calculator, free online tool, water-intake, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Water Intake" }]} />
      <CalculatorTemplate
        title="Water Intake Calculator"
        description="Calculate your daily water intake needs based on weight and activity level."
        badge="Health Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Droplet className="w-4 h-4 text-crimson-500" /> Daily Water Needs</h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-4xl font-bold gradient-text">{r.liters}L</div>
              <div className="text-sm text-theme-secondary">{r.ml} ml per day</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Glasses (250ml):</span><span className="font-bold text-theme-primary">{r.glasses}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Bottles (500ml):</span><span className="font-bold text-theme-primary">{r.bottles}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Weight (kg)</label><input type="number" value={w} onChange={(e) => setW(e.target.value)} placeholder="70" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Exercise Minutes/Day</label><input type="number" value={act} onChange={(e) => setAct(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
        </div>
      </CalculatorTemplate>
</>
  )
}
"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateCalories } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Flame } from "lucide-react"

interface Props { name: string; description: string; }
export default function CalorieCalculatorClient({ name, description }: Props) {
  const [w, setW] = useState("")
  const [h, setH] = useState("")
  const [a, setA] = useState("")
  const [g, setG] = useState<"male" | "female">("male")
  const [act, setAct] = useState(1.55)
  const r = calculateCalories(parseFloat(w), parseFloat(h), parseFloat(a), g, act)

  return (
    <>
      <ToolPageMeta title="Calorie Calculator" description="Calculate your daily calorie needs based on age, gender, weight and activity level." keywords="calorie calculator, free online tool, calorie-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Calorie Calculator" }]} />
      <CalculatorTemplate
        title="Calorie Calculator"
        description="Calculate your daily calorie needs based on age, gender, weight and activity level."
        badge="Health Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Flame className="w-4 h-4 text-crimson-500" /> Daily Calories</h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">{r.tdee}</div>
              <div className="text-sm text-theme-secondary">Maintain Weight (kcal/day)</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">BMR:</span><span className="font-bold text-theme-primary">{r.bmr} kcal</span></div>
              <div className="flex justify-between p-2 rounded bg-red-500/10"><span className="text-red-500">Lose Weight:</span><span className="font-bold text-red-500">{r.loseWeight} kcal</span></div>
              <div className="flex justify-between p-2 rounded bg-green-500/10"><span className="text-green-500">Gain Weight:</span><span className="font-bold text-green-500">{r.gainWeight} kcal</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Gender</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setG("male")} className={`p-3 rounded-lg text-sm ${g === "male" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/30" : "bg-theme-secondary text-theme-primary border border-theme"}`}>Male</button>
              <button onClick={() => setG("female")} className={`p-3 rounded-lg text-sm ${g === "female" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/30" : "bg-theme-secondary text-theme-primary border border-theme"}`}>Female</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="block text-sm font-medium text-theme-primary mb-2">Age</label><input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="25" className="w-full p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500" /></div>
            <div><label className="block text-sm font-medium text-theme-primary mb-2">Weight (kg)</label><input type="number" value={w} onChange={(e) => setW(e.target.value)} placeholder="70" className="w-full p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500" /></div>
            <div><label className="block text-sm font-medium text-theme-primary mb-2">Height (cm)</label><input type="number" value={h} onChange={(e) => setH(e.target.value)} placeholder="170" className="w-full p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500" /></div>
          </div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Activity Level</label>
            <select value={act} onChange={(e) => setAct(parseFloat(e.target.value))} className="w-full p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500">
              <option value="1.2">Sedentary (no exercise)</option>
              <option value="1.375">Light (1-3 days/week)</option>
              <option value="1.55">Moderate (3-5 days/week)</option>
              <option value="1.725">Active (6-7 days/week)</option>
              <option value="1.9">Very Active (athletic)</option>
            </select>
          </div>
        </div>
      </CalculatorTemplate>
</>
  )
}
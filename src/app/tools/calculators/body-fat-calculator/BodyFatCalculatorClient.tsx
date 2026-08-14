"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateBodyFat } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Activity } from "lucide-react"

interface Props { name: string; description: string; }
export default function BodyFatCalculatorClient({ name, description }: Props) {
  const [g, setG] = useState<"male" | "female">("male")
  const [h, setH] = useState("")
  const [w, setW] = useState("")
  const [n, setN] = useState("")
  const [hip, setHip] = useState("")
  const r = calculateBodyFat(g, parseFloat(h), parseFloat(w), parseFloat(n), parseFloat(hip))

  return (
    <>
      <ToolPageMeta title="Body Fat Calculator" description="Calculate your body fat percentage using the US Navy method with measurements." keywords="body fat calculator, free online tool, body-fat-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Body Fat Calculator" }]} />
      <CalculatorTemplate
        title="Body Fat Calculator"
        description="Calculate your body fat percentage using the US Navy method with measurements."
        badge="Health Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-crimson-500" /> Body Fat</h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-5xl font-bold gradient-text">{r.bodyFat}%</div>
              <div className="text-sm text-theme-secondary mt-1">{r.category}</div>
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
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Height (cm)</label><input type="number" value={h} onChange={(e) => setH(e.target.value)} placeholder="170" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Waist (cm)</label><input type="number" value={w} onChange={(e) => setW(e.target.value)} placeholder="80" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Neck (cm)</label><input type="number" value={n} onChange={(e) => setN(e.target.value)} placeholder="40" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          {g === "female" && <div><label className="block text-sm font-medium text-theme-primary mb-2">Hip (cm)</label><input type="number" value={hip} onChange={(e) => setHip(e.target.value)} placeholder="95" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>}
        </div>
      </CalculatorTemplate>
</>
  )
}
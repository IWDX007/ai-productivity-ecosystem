"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateTimeDifference } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Clock } from "lucide-react"

interface Props { name: string; description: string; }
export default function TimeCalculatorClient({ name, description }: Props) {
  const [t1, setT1] = useState("")
  const [t2, setT2] = useState("")
  const r = calculateTimeDifference(t1, t2)

  return (
    <>
      <ToolPageMeta title="Time Calculator" description="Calculate the duration between two times in hours, minutes and seconds." keywords="time calculator, free online tool, time-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Time Calculator" }]} />
      <CalculatorTemplate
        title="Time Calculator"
        description="Calculate the duration between two times in hours, minutes and seconds."
        badge="Time Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-crimson-500" /> Time Duration</h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">{r.hours}h {r.minutes}m</div>
              <div className="text-sm text-theme-secondary">Total Duration</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Minutes:</span><span className="font-bold text-theme-primary">{r.totalMinutes}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Seconds:</span><span className="font-bold text-theme-primary">{r.totalSeconds.toLocaleString()}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Start Time</label><input type="time" value={t1} onChange={(e) => setT1(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">End Time</label><input type="time" value={t2} onChange={(e) => setT2(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
        </div>
      </CalculatorTemplate>
</>
  )
}
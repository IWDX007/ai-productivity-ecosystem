"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateAge } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Calendar } from "lucide-react"

interface AgeCalculatorClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function AgeCalculatorClient({ name, description }: AgeCalculatorClientProps) {
  const [birth, setBirth] = useState("")
  const r = calculateAge(birth)

  return (
    <>
      <ToolPageMeta title="Age Calculator" description="Calculate your exact age in years, months, days, hours and minutes from your birthdate." keywords="age calculator, free online tool, age-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Age Calculator" }]} />
      <CalculatorTemplate
        title="Age Calculator"
        description="Calculate your exact age in years, months, days, hours and minutes from your birthdate."
        badge="Date Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-crimson-500" /> Your Age
            </h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-4xl font-bold gradient-text">{r.years}</div>
              <div className="text-sm text-theme-secondary">Years {r.months} months {r.days} days</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Months:</span><span className="font-bold text-theme-primary">{r.totalMonths.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Weeks:</span><span className="font-bold text-theme-primary">{r.totalWeeks.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Days:</span><span className="font-bold text-theme-primary">{r.totalDays.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Hours:</span><span className="font-bold text-theme-primary">{r.totalHours.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Minutes:</span><span className="font-bold text-theme-primary">{r.totalMinutes.toLocaleString()}</span></div>
            </div>
          </div>
        )}
      >
        <div>
          <label className="block text-sm font-medium text-theme-primary mb-2">Your Birthdate</label>
          <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} max={new Date().toISOString().split("T")[0]} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
        </div>
      </CalculatorTemplate>
</>
  )
}
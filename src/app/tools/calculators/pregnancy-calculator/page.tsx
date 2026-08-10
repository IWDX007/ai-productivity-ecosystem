"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculatePregnancy } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Baby } from "lucide-react"

export default function Page() {
  const [lmp, setLmp] = useState("")
  const r = calculatePregnancy(lmp)

  return (
    <>
      <ToolPageMeta title="Pregnancy Calculator" description="Calculate your due date and pregnancy progress from last menstrual period (LMP)." keywords="pregnancy calculator, free online tool, pregnancy-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Pregnancy Calculator" }]} />
      <CalculatorTemplate
        title="Pregnancy Calculator"
        description="Calculate your due date and pregnancy progress from last menstrual period (LMP)."
        badge="Health Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Baby className="w-4 h-4 text-crimson-500" /> Pregnancy Info</h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">{r.weeks} weeks {r.days} days</div>
              <div className="text-sm text-theme-secondary">Trimester {r.trimester}</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-crimson-500/10"><span className="text-crimson-500">Due Date:</span><span className="font-bold text-crimson-500">{r.dueDate}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Days Pregnant:</span><span className="font-bold text-theme-primary">{r.daysPregnant}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Days Remaining:</span><span className="font-bold text-theme-primary">{r.daysRemaining}</span></div>
            </div>
          </div>
        )}
      >
        <div><label className="block text-sm font-medium text-theme-primary mb-2">First Day of Last Period (LMP)</label><input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} max={new Date().toISOString().split("T")[0]} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
      </CalculatorTemplate>
      <SEOSections toolSlug="pregnancy-calculator" toolName="Pregnancy Calculator" />
    </>
  )
}
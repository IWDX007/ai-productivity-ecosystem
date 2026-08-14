"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateDateDifference } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Calendar } from "lucide-react"

export default function Page() {
  const [d1, setD1] = useState("")
  const [d2, setD2] = useState("")
  const r = calculateDateDifference(d1, d2)

  return (
    <>
      <ToolPageMeta title="Date Calculator" description="Calculate the difference between two dates in years, months, weeks, days, hours and minutes." keywords="date calculator, free online tool, date-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Date Calculator" }]} />
      <CalculatorTemplate
        title="Date Calculator"
        description="Calculate the difference between two dates in years, months, weeks, days, hours and minutes."
        badge="Date Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-crimson-500" /> Difference</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-3 rounded bg-crimson-500/10"><span className="text-crimson-500">Years:</span><span className="font-bold text-crimson-500 text-lg">{r.years}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Months:</span><span className="font-bold text-theme-primary">{r.months}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Weeks:</span><span className="font-bold text-theme-primary">{r.weeks.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Days:</span><span className="font-bold text-theme-primary">{r.days.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Hours:</span><span className="font-bold text-theme-primary">{r.hours.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Minutes:</span><span className="font-bold text-theme-primary">{r.minutes.toLocaleString()}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-theme-primary mb-2">From Date</label><input type="date" value={d1} onChange={(e) => setD1(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">To Date</label><input type="date" value={d2} onChange={(e) => setD2(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
        </div>
      </CalculatorTemplate>
      <SEOSections toolSlug="date-calculator" toolName="Date Calculator" />
    </>
  )
}
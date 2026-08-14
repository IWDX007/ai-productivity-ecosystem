"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateSalary } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Briefcase } from "lucide-react"

interface Props { name: string; description: string; }
export default function SalaryCalculatorClient({ name, description }: Props) {
  const [salary, setSalary] = useState("")
  const [hours, setHours] = useState("40")
  const r = calculateSalary(parseFloat(salary), parseFloat(hours))

  return (
    <>
      <ToolPageMeta title="Salary Calculator" description="Convert annual salary to monthly, weekly, daily and hourly rates instantly." keywords="salary calculator, free online tool, salary-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Salary Calculator" }]} />
      <CalculatorTemplate
        title="Salary Calculator"
        description="Convert annual salary to monthly, weekly, daily and hourly rates instantly."
        badge="Career Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4 text-crimson-500" /> Salary Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-3 rounded bg-crimson-500/10 border border-crimson-500/20"><span className="text-theme-secondary">Annual:</span><span className="font-bold text-crimson-500 text-lg">${r.annual.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Monthly:</span><span className="font-bold text-theme-primary">${r.monthly.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Weekly:</span><span className="font-bold text-theme-primary">${r.weekly.toLocaleString()}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Daily:</span><span className="font-bold text-theme-primary">${r.daily}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Hourly:</span><span className="font-bold text-theme-primary">${r.hourly}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Annual Salary ($)</label><input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="60000" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Hours Per Week</label><input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
        </div>
      </CalculatorTemplate>
</>
  )
}
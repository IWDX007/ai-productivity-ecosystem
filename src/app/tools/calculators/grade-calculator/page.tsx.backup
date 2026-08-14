"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateGrade } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Award } from "lucide-react"

export default function Page() {
  const [score, setScore] = useState("")
  const [total, setTotal] = useState("100")
  const r = calculateGrade(parseFloat(score), parseFloat(total))

  return (
    <>
      <ToolPageMeta title="Grade Calculator" description="Calculate your letter grade and GPA from test scores or assignment marks." keywords="grade calculator, free online tool, grade-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Grade Calculator" }]} />
      <CalculatorTemplate
        title="Grade Calculator"
        description="Calculate your letter grade and GPA from test scores or assignment marks."
        badge="Academic Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-crimson-500" /> Your Grade</h3>
            <div className="text-center py-4">
              <div className="text-6xl font-bold gradient-text mb-2">{r.grade}</div>
              <div className="text-3xl font-bold text-theme-primary">{r.percentage}%</div>
              <div className="text-sm text-theme-secondary mt-1">GPA: {r.gpa}</div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Your Score</label><input type="number" value={score} onChange={(e) => setScore(e.target.value)} placeholder="85" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Total Marks</label><input type="number" value={total} onChange={(e) => setTotal(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
        </div>
      </CalculatorTemplate>
      <SEOSections toolSlug="grade-calculator" toolName="Grade Calculator" />
    </>
  )
}
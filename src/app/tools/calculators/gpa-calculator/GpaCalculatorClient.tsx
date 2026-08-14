"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateGPA } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { GraduationCap, Trash2, Plus } from "lucide-react"

interface Props { name: string; description: string; }
export default function GpaCalculatorClient({ name, description }: Props) {
  const [rows, setRows] = useState([{ grade: "A", credits: 3 }])
  const gpa = calculateGPA(rows)

  const add = () => setRows([...rows, { grade: "A", credits: 3 }])
  const remove = (i: number) => setRows(rows.filter((_, idx) => idx !== i))
  const update = (i: number, field: string, val: any) => {
    const newRows = [...rows]
    newRows[i] = { ...newRows[i], [field]: field === "credits" ? parseFloat(val) || 0 : val }
    setRows(newRows)
  }

  return (
    <>
      <ToolPageMeta title="GPA Calculator" description="Calculate your Grade Point Average by entering course grades and credit hours." keywords="gpa calculator, free online tool, gpa-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "GPA Calculator" }]} />
      <CalculatorTemplate
        title="GPA Calculator"
        description="Calculate your Grade Point Average by entering course grades and credit hours."
        badge="Academic Calculator"
        resultPanel={gpa && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-crimson-500" /> Your GPA</h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-5xl font-bold gradient-text">{gpa.gpa}</div>
              <div className="text-sm text-theme-secondary">out of 4.0</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Total Credits:</span><span className="font-bold text-theme-primary">{gpa.totalCredits}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Grade Points:</span><span className="font-bold text-theme-primary">{gpa.totalPoints}</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-theme-primary">Course Grades</label>
            <button onClick={add} className="flex items-center gap-1 px-3 py-1.5 text-xs btn-primary rounded-lg"><Plus className="w-3 h-3" /> Add Course</button>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="flex gap-2">
              <select value={r.grade} onChange={(e) => update(i, "grade", e.target.value)} className="flex-1 p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500">
                {["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"].map(g => <option key={g}>{g}</option>)}
              </select>
              <input type="number" value={r.credits} onChange={(e) => update(i, "credits", e.target.value)} placeholder="Credits" className="w-24 p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500" />
              {rows.length > 1 && <button onClick={() => remove(i)} className="px-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"><Trash2 className="w-4 h-4" /></button>}
            </div>
          ))}
        </div>
      </CalculatorTemplate>
</>
  )
}
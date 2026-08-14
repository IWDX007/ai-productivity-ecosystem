"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { fractionOperation } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Divide } from "lucide-react"

interface Props { name: string; description: string; }
export default function FractionCalculatorClient({ name, description }: Props) {
  const [n1, setN1] = useState("1")
  const [d1, setD1] = useState("2")
  const [n2, setN2] = useState("1")
  const [d2, setD2] = useState("3")
  const [op, setOp] = useState("+")
  const r = fractionOperation(op, [parseInt(n1), parseInt(d1)], [parseInt(n2), parseInt(d2)])

  return (
    <>
      <ToolPageMeta title="Fraction Calculator" description="Add, subtract, multiply and divide fractions with automatic simplification." keywords="fraction calculator, free online tool, fraction-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Fraction Calculator" }]} />
      <CalculatorTemplate
        title="Fraction Calculator"
        description="Add, subtract, multiply and divide fractions with automatic simplification."
        badge="Math Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Divide className="w-4 h-4 text-crimson-500" /> Result</h3>
            <div className="text-center py-4">
              <div className="text-5xl font-bold gradient-text">{r[0]}/{r[1]}</div>
              <div className="text-sm text-theme-secondary mt-2">= {(r[0] / r[1]).toFixed(4)}</div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 justify-center">
            <div className="text-center">
              <input type="number" value={n1} onChange={(e) => setN1(e.target.value)} className="w-20 p-3 bg-theme-card border border-theme rounded-lg text-theme-primary text-center text-2xl font-bold" />
              <div className="h-0.5 bg-theme-primary my-1"></div>
              <input type="number" value={d1} onChange={(e) => setD1(e.target.value)} className="w-20 p-3 bg-theme-card border border-theme rounded-lg text-theme-primary text-center text-2xl font-bold" />
            </div>
            <select value={op} onChange={(e) => setOp(e.target.value)} className="p-3 bg-theme-card border border-theme rounded-lg text-theme-primary text-2xl font-bold focus:outline-none">
              <option value="+">+</option>
              <option value="-">ÃƒÆ’Ã‚Â¢Ãƒâ€¹Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢</option>
              <option value="*">ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â</option>
              <option value="/">ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â·</option>
            </select>
            <div className="text-center">
              <input type="number" value={n2} onChange={(e) => setN2(e.target.value)} className="w-20 p-3 bg-theme-card border border-theme rounded-lg text-theme-primary text-center text-2xl font-bold" />
              <div className="h-0.5 bg-theme-primary my-1"></div>
              <input type="number" value={d2} onChange={(e) => setD2(e.target.value)} className="w-20 p-3 bg-theme-card border border-theme rounded-lg text-theme-primary text-center text-2xl font-bold" />
            </div>
          </div>
        </div>
      </CalculatorTemplate>
</>
  )
}
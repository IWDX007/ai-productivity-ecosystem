"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { evaluateExpression } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Calculator } from "lucide-react"

interface ScientificCalculatorClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function ScientificCalculatorClient({ name, description }: ScientificCalculatorClientProps) {
  const [expr, setExpr] = useState("")
  const result = evaluateExpression(expr)

  const btn = (val: string) => setExpr(expr + val)
  const clear = () => setExpr("")
  const back = () => setExpr(expr.slice(0, -1))

  return (
    <>
      <ToolPageMeta title="Scientific Calculator" description="Perform basic and advanced mathematical calculations with a clean calculator interface." keywords="scientific calculator, free online tool, scientific-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Scientific Calculator" }]} />
      <CalculatorTemplate
        title="Scientific Calculator"
        description="Perform basic and advanced mathematical calculations with a clean calculator interface."
        badge="Math Calculator"
      >
        <div className="space-y-4">
          <input type="text" value={expr} onChange={(e) => setExpr(e.target.value)} placeholder="Enter expression (e.g. 2*3+5)" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg font-mono focus:outline-none focus:border-crimson-500" />
          {result !== null && (
            <div className="p-6 glass-card border border-crimson-500/30 rounded-xl text-center">
              <div className="text-sm text-theme-secondary mb-1">Result</div>
              <div className="text-4xl font-bold gradient-text">{result.toLocaleString()}</div>
            </div>
          )}
          <div className="grid grid-cols-4 gap-2">
            {["7", "8", "9", "/"].map(k => <button key={k} onClick={() => btn(k)} className="p-4 bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 rounded-lg text-lg font-bold text-theme-primary transition-colors">{k}</button>)}
            {["4", "5", "6", "*"].map(k => <button key={k} onClick={() => btn(k)} className="p-4 bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 rounded-lg text-lg font-bold text-theme-primary transition-colors">{k}</button>)}
            {["1", "2", "3", "-"].map(k => <button key={k} onClick={() => btn(k)} className="p-4 bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 rounded-lg text-lg font-bold text-theme-primary transition-colors">{k}</button>)}
            {["0", ".", "(", "+"].map(k => <button key={k} onClick={() => btn(k)} className="p-4 bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 rounded-lg text-lg font-bold text-theme-primary transition-colors">{k}</button>)}
            <button onClick={() => btn(")")} className="p-4 bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 rounded-lg text-lg font-bold text-theme-primary transition-colors">)</button>
            <button onClick={back} className="p-4 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-lg text-lg font-bold text-yellow-500 transition-colors col-span-1">ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Ãƒâ€šÃ‚Â</button>
            <button onClick={clear} className="p-4 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-lg font-bold text-red-500 transition-colors col-span-2">Clear</button>
          </div>
        </div>
      </CalculatorTemplate>
</>
  )
}
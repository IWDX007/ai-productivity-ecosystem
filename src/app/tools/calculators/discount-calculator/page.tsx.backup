"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateDiscount } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Tag } from "lucide-react"

export default function Page() {
  const [price, setPrice] = useState("")
  const [disc, setDisc] = useState("")
  const r = calculateDiscount(parseFloat(price), parseFloat(disc))

  return (
    <>
      <ToolPageMeta title="Discount Calculator" description="Calculate the final price after discount and how much you save. Perfect for shopping deals." keywords="discount calculator, free online tool, discount-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Discount Calculator" }]} />
      <CalculatorTemplate
        title="Discount Calculator"
        description="Calculate the final price after discount and how much you save. Perfect for shopping deals."
        badge="Shopping Calculator"
        resultPanel={r && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-crimson-500" /> Savings
            </h3>
            <div className="text-center py-4 border-b border-theme mb-3">
              <div className="text-3xl font-bold gradient-text">${r.final}</div>
              <div className="text-sm text-theme-secondary">Final Price</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Original Price:</span><span className="font-bold text-theme-primary line-through">${r.original}</span></div>
              <div className="flex justify-between p-2 rounded bg-green-500/10"><span className="text-green-500">You Save:</span><span className="font-bold text-green-500">${r.saved}</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-theme-secondary">Discount:</span><span className="font-bold text-theme-primary">{r.discountPercent}%</span></div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Original Price ($)</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="100" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Discount (%)</label>
            <input type="number" value={disc} onChange={(e) => setDisc(e.target.value)} placeholder="20" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[10, 25, 50, 75].map(d => (
                <button key={d} onClick={() => setDisc(d.toString())} className="p-2 text-sm bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded text-theme-primary transition-colors">{d}% OFF</button>
              ))}
            </div>
          </div>
        </div>
      </CalculatorTemplate>
      <SEOSections toolSlug="discount-calculator" toolName="Discount Calculator" />
    </>
  )
}
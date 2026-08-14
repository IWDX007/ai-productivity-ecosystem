"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { randomNumber } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Shuffle, RefreshCw } from "lucide-react"

interface RandomNumberClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function RandomNumberClient({ name, description }: RandomNumberClientProps) {
  const [min, setMin] = useState("1")
  const [max, setMax] = useState("100")
  const [count, setCount] = useState("1")
  const [nums, setNums] = useState<number[]>([])

  const generate = () => {
    const result = randomNumber(parseInt(min) || 0, parseInt(max) || 100, parseInt(count) || 1)
    setNums(result)
  }

  return (
    <>
      <ToolPageMeta title="Random Number Generator" description="Generate random numbers within a range. Perfect for lotteries, games and random selection." keywords="random number generator, free online tool, random-number, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Random Number" }]} />
      <CalculatorTemplate
        title="Random Number Generator"
        description="Generate random numbers within a range. Perfect for lotteries, games and random selection."
        badge="Generator"
        resultPanel={nums.length > 0 && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Shuffle className="w-4 h-4 text-crimson-500" /> Random Numbers</h3>
            <div className="flex flex-wrap gap-2">
              {nums.map((n, i) => (
                <div key={i} className="px-4 py-3 gradient-crimson text-white rounded-lg font-bold text-xl">{n}</div>
              ))}
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div><label className="block text-sm font-medium text-theme-primary mb-2">Min</label><input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
            <div><label className="block text-sm font-medium text-theme-primary mb-2">Max</label><input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
            <div><label className="block text-sm font-medium text-theme-primary mb-2">Count</label><input type="number" value={count} onChange={(e) => setCount(e.target.value)} min="1" max="20" className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" /></div>
          </div>
          <button onClick={generate} className="w-full flex items-center justify-center gap-2 p-4 btn-primary rounded-lg font-bold text-lg"><RefreshCw className="w-5 h-5" /> Generate</button>
        </div>
      </CalculatorTemplate>
</>
  )
}
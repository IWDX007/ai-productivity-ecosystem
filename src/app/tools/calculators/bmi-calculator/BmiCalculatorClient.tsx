"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateBMI } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Activity } from "lucide-react"

interface BmiCalculatorClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function BmiCalculatorClient({ name, description }: BmiCalculatorClientProps) {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const result = calculateBMI(parseFloat(weight), parseFloat(height), unit)

  return (
    <>
      <ToolPageMeta title="BMI Calculator" description="Calculate your Body Mass Index (BMI) instantly. Check if your weight is healthy for your height." keywords="bmi calculator, free online tool, bmi-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "BMI Calculator" }]} />
      <CalculatorTemplate
        title="BMI Calculator"
        description="Calculate your Body Mass Index (BMI) instantly. Check if your weight is healthy for your height."
        badge="Health Calculator"
        resultPanel={result && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-crimson-500" /> Your Result
            </h3>
            <div className="text-center py-4">
              <div className="text-5xl font-bold gradient-text">{result.bmi}</div>
              <div className="text-sm text-theme-secondary mt-1">BMI Value</div>
            </div>
            <div className={`p-3 rounded-lg text-center font-bold ${result.color === "green" ? "bg-green-500/10 text-green-500" : result.color === "yellow" ? "bg-yellow-500/10 text-yellow-500" : result.color === "red" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"}`}>
              {result.category}
            </div>
          </div>
        )}
        infoPanel={
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3">BMI Categories</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-blue-500 font-semibold">Underweight</span><span className="text-theme-secondary">Below 18.5</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-green-500 font-semibold">Normal</span><span className="text-theme-secondary">18.5 - 24.9</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-yellow-500 font-semibold">Overweight</span><span className="text-theme-secondary">25 - 29.9</span></div>
              <div className="flex justify-between p-2 rounded bg-theme-secondary"><span className="text-red-500 font-semibold">Obese</span><span className="text-theme-secondary">30 and above</span></div>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Unit System</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setUnit("metric")} className={`p-3 rounded-lg text-sm transition-colors ${unit === "metric" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/30" : "bg-theme-secondary text-theme-primary border border-theme"}`}>Metric (kg/cm)</button>
              <button onClick={() => setUnit("imperial")} className={`p-3 rounded-lg text-sm transition-colors ${unit === "imperial" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/30" : "bg-theme-secondary text-theme-primary border border-theme"}`}>Imperial (lb/in)</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Weight ({unit === "metric" ? "kg" : "lbs"})</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={unit === "metric" ? "70" : "154"} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Height ({unit === "metric" ? "cm" : "inches"})</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder={unit === "metric" ? "170" : "67"} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
          </div>
        </div>
      </CalculatorTemplate>
</>
  )
}
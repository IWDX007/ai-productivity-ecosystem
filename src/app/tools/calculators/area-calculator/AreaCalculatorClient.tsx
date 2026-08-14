"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateArea } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Square } from "lucide-react"

interface AreaCalculatorClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function AreaCalculatorClient({ name, description }: AreaCalculatorClientProps) {
  const [shape, setShape] = useState("rectangle")
  const [dims, setDims] = useState<Record<string, number>>({})
  const area = calculateArea(shape, dims)

  const setD = (key: string, val: string) => setDims({ ...dims, [key]: parseFloat(val) || 0 })

  const fields: Record<string, string[]> = {
    rectangle: ["length", "width"],
    square: ["side"],
    circle: ["radius"],
    triangle: ["base", "height"],
    trapezoid: ["a", "b", "height"],
    parallelogram: ["base", "height"]
  }

  return (
    <>
      <ToolPageMeta title="Area Calculator" description="Calculate area of rectangles, squares, circles, triangles and other geometric shapes." keywords="area calculator, free online tool, area-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Area Calculator" }]} />
      <CalculatorTemplate
        title="Area Calculator"
        description="Calculate area of rectangles, squares, circles, triangles and other geometric shapes."
        badge="Geometry Calculator"
        resultPanel={area > 0 && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Square className="w-4 h-4 text-crimson-500" /> Area</h3>
            <div className="text-center py-4">
              <div className="text-4xl font-bold gradient-text">{Math.round(area * 100) / 100}</div>
              <div className="text-sm text-theme-secondary mt-1">square units</div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Shape</label>
            <select value={shape} onChange={(e) => { setShape(e.target.value); setDims({}) }} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500">
              <option value="rectangle">Rectangle</option>
              <option value="square">Square</option>
              <option value="circle">Circle</option>
              <option value="triangle">Triangle</option>
              <option value="trapezoid">Trapezoid</option>
              <option value="parallelogram">Parallelogram</option>
            </select>
          </div>
          {fields[shape].map(f => (
            <div key={f}>
              <label className="block text-sm font-medium text-theme-primary mb-2 capitalize">{f}</label>
              <input type="number" value={dims[f] || ""} onChange={(e) => setD(f, e.target.value)} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500" />
            </div>
          ))}
        </div>
      </CalculatorTemplate>
</>
  )
}
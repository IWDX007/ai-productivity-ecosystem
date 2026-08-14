"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { calculateVolume } from "@/lib/processing/calculators/allCalculators"
import CalculatorTemplate from "@/components/tools/templates/CalculatorTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Box } from "lucide-react"

interface VolumeCalculatorClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function VolumeCalculatorClient({ name, description }: VolumeCalculatorClientProps) {
  const [shape, setShape] = useState("cube")
  const [dims, setDims] = useState<Record<string, number>>({})
  const vol = calculateVolume(shape, dims)

  const setD = (key: string, val: string) => setDims({ ...dims, [key]: parseFloat(val) || 0 })

  const fields: Record<string, string[]> = {
    cube: ["side"],
    cuboid: ["length", "width", "height"],
    sphere: ["radius"],
    cylinder: ["radius", "height"],
    cone: ["radius", "height"],
    pyramid: ["base", "height"]
  }

  return (
    <>
      <ToolPageMeta title="Volume Calculator" description="Calculate volume of cubes, spheres, cylinders, cones and other 3D shapes." keywords="volume calculator, free online tool, volume-calculator, calculators tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Calculators", href: "/tools/calculators" }, { label: "Volume Calculator" }]} />
      <CalculatorTemplate
        title="Volume Calculator"
        description="Calculate volume of cubes, spheres, cylinders, cones and other 3D shapes."
        badge="Geometry Calculator"
        resultPanel={vol > 0 && (
          <div className="p-4 glass-card border border-theme rounded-xl">
            <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2"><Box className="w-4 h-4 text-crimson-500" /> Volume</h3>
            <div className="text-center py-4">
              <div className="text-4xl font-bold gradient-text">{Math.round(vol * 100) / 100}</div>
              <div className="text-sm text-theme-secondary mt-1">cubic units</div>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-theme-primary mb-2">Shape</label>
            <select value={shape} onChange={(e) => { setShape(e.target.value); setDims({}) }} className="w-full p-4 bg-theme-card border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-crimson-500">
              <option value="cube">Cube</option>
              <option value="cuboid">Cuboid</option>
              <option value="sphere">Sphere</option>
              <option value="cylinder">Cylinder</option>
              <option value="cone">Cone</option>
              <option value="pyramid">Pyramid</option>
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
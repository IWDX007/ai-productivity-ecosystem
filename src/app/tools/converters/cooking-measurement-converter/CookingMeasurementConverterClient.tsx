"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, ChefHat } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface CookingMeasurementConverterPageProps {
  name?: string;
  description?: string;
}

const UNITS: Record<string, { name: string; symbol: string; toMl: number }> = {
  teaspoon:    { name: "Teaspoon",         symbol: "tsp",  toMl: 4.92892 },
  tablespoon:  { name: "Tablespoon",       symbol: "tbsp", toMl: 14.7868 },
  cup:         { name: "US Cup",           symbol: "cup",  toMl: 240 },
  metricCup:   { name: "Metric Cup",       symbol: "cup",  toMl: 250 },
  fluidOz:     { name: "Fluid Ounce",      symbol: "floz", toMl: 29.5735 },
  pint:        { name: "US Pint",          symbol: "pt",   toMl: 473.176 },
  quart:       { name: "US Quart",         symbol: "qt",   toMl: 946.353 },
  gallon:      { name: "US Gallon",        symbol: "gal",  toMl: 3785.41 },
  milliliter:  { name: "Milliliter",       symbol: "mL",   toMl: 1 },
  liter:       { name: "Liter",            symbol: "L",    toMl: 1000 },
  dropUS:      { name: "Drop",             symbol: "drop", toMl: 0.05 },
  dashUS:      { name: "Dash",             symbol: "dash", toMl: 0.616 },
  pinch:       { name: "Pinch",            symbol: "pinch",toMl: 0.308 },
  smidgen:     { name: "Smidgen",          symbol: "smi",  toMl: 0.115 },
}

function formatNumber(num: number): string {
  if (num === 0) return "0"
  const abs = Math.abs(num)
  if (abs < 0.001) return num.toExponential(3)
  if (abs < 1) return num.toPrecision(4).replace(/\.?0+$/, "")
  return num.toLocaleString(undefined, { maximumFractionDigits: 4 })
}

export default function CookingMeasurementConverterPage({ name, description }: CookingMeasurementConverterPageProps) {
  const [value, setValue] = useState("1")
  const [fromUnit, setFromUnit] = useState("cup")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const numericValue = parseFloat(value) || 0

  const conversions = useMemo(() => {
    const fromFactor = UNITS[fromUnit].toMl
    const valueInMl = numericValue * fromFactor
    return Object.entries(UNITS).map(([key, unit]) => ({
      key, name: unit.name, symbol: unit.symbol,
      value: valueInMl / unit.toMl,
    }))
  }, [numericValue, fromUnit])

  const handleCopy = async (key: string, val: number) => {
    await navigator.clipboard.writeText(formatNumber(val))
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleReset = () => { setValue("1"); setFromUnit("cup") }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Cooking Measurement Converter" description="Convert cups, tablespoons, teaspoons, ounces, milliliters, drops, dashes and more. Perfect for recipes from around the world." keywords="cooking measurement converter, free online tool, cooking-measurement-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Cooking Measurement Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Cooking Measurement <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert cups, tablespoons, teaspoons, ounces, milliliters, drops, dashes 
            and more. Perfect for recipes from around the world.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <ChefHat className="w-5 h-5 text-purple-400" />
              <span>Enter Amount</span>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Amount</label>
              <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition"
                placeholder="Enter number" />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">From Unit</label>
              <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition">
                {Object.entries(UNITS).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-theme-muted mb-3">All Conversions:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {conversions.map(({ key, name, symbol, value: cv }) => (
              <div key={key} className={`p-4 rounded-lg border transition ${key === fromUnit ? "bg-purple-500/10 border-purple-500/30" : "bg-theme-secondary border-theme hover:border-purple-500/30"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-theme-muted">{name}</span>
                  <button onClick={() => handleCopy(key, cv)} className="text-theme-muted hover:text-purple-400 transition">
                    {copiedKey === key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-semibold text-lg break-all">{formatNumber(cv)}</div>
                <div className="text-xs text-theme-muted mt-1">{symbol}</div>
              </div>
            ))}
          </div>
        </div>
</div>
    </div>
  )
}
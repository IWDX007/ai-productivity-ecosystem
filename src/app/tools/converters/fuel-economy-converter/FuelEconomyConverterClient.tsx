"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Fuel } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface FuelEconomyConverterPageProps {
  name?: string;
  description?: string;
}

// Fuel economy has special conversion (some units are inverse)
const UNITS: Record<string, { name: string; symbol: string; isInverse: boolean }> = {
  kmPerLiter:  { name: "Km per Liter",   symbol: "km/L",  isInverse: false },
  mpgUS:       { name: "MPG (US)",       symbol: "mpg",   isInverse: false },
  mpgUK:       { name: "MPG (UK)",       symbol: "mpg",   isInverse: false },
  literPer100: { name: "L per 100km",    symbol: "L/100km", isInverse: true },
  milePerLiter:{ name: "Mile per Liter", symbol: "mi/L",  isInverse: false },
  kmPerGallon: { name: "Km per Gallon",  symbol: "km/gal", isInverse: false },
}

// Convert everything to km/L (base)
function toKmPerLiter(value: number, unit: string): number {
  switch(unit) {
    case "kmPerLiter": return value
    case "mpgUS": return value * 0.425144
    case "mpgUK": return value * 0.354006
    case "literPer100": return value === 0 ? 0 : 100 / value
    case "milePerLiter": return value * 1.60934
    case "kmPerGallon": return value * 0.264172
    default: return value
  }
}

// Convert from km/L to any unit
function fromKmPerLiter(kmpl: number, unit: string): number {
  switch(unit) {
    case "kmPerLiter": return kmpl
    case "mpgUS": return kmpl / 0.425144
    case "mpgUK": return kmpl / 0.354006
    case "literPer100": return kmpl === 0 ? 0 : 100 / kmpl
    case "milePerLiter": return kmpl / 1.60934
    case "kmPerGallon": return kmpl / 0.264172
    default: return kmpl
  }
}

function formatNumber(num: number): string {
  if (num === 0) return "0"
  const abs = Math.abs(num)
  if (abs < 0.0001 || abs > 1e15) return num.toExponential(6)
  if (abs < 1) return num.toPrecision(6).replace(/\.?0+$/, "")
  return num.toLocaleString(undefined, { maximumFractionDigits: 4 })
}

export default function FuelEconomyConverterPage({ name, description }: FuelEconomyConverterPageProps) {
  const [value, setValue] = useState("10")
  const [fromUnit, setFromUnit] = useState("kmPerLiter")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const numericValue = parseFloat(value) || 0

  const conversions = useMemo(() => {
    const kmpl = toKmPerLiter(numericValue, fromUnit)
    return Object.entries(UNITS).map(([key, unit]) => ({
      key, name: unit.name, symbol: unit.symbol,
      value: fromKmPerLiter(kmpl, key),
    }))
  }, [numericValue, fromUnit])

  const handleCopy = async (key: string, val: number) => {
    await navigator.clipboard.writeText(formatNumber(val))
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleReset = () => { setValue("10"); setFromUnit("kmPerLiter") }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Fuel Economy Converter" description="Convert between MPG, km/L, L/100km and more fuel economy units. Perfect for comparing vehicle efficiency across regions." keywords="fuel economy converter, free online tool, fuel-economy-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Fuel Economy Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Fuel Economy <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert between MPG, km/L, L/100km and more fuel economy units. Perfect for
            comparing vehicle efficiency across regions.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Fuel className="w-5 h-5 text-purple-400" />
              <span>Enter Fuel Economy</span>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Value</label>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
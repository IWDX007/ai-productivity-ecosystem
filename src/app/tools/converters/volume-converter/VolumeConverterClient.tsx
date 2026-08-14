"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Beaker } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface VolumeConverterPageProps {
  name?: string;
  description?: string;
}

const UNITS: Record<string, { name: string; symbol: string; toLiters: number }> = {
  milliliter:  { name: "Milliliter",   symbol: "mL",  toLiters: 0.001 },
  liter:       { name: "Liter",        symbol: "L",   toLiters: 1 },
  cubicMeter:  { name: "Cubic Meter",  symbol: "mÃ‚Â³",  toLiters: 1000 },
  cubicCm:     { name: "Cubic cm",     symbol: "cmÃ‚Â³", toLiters: 0.001 },
  cubicInch:   { name: "Cubic Inch",   symbol: "inÃ‚Â³", toLiters: 0.0163871 },
  cubicFoot:   { name: "Cubic Foot",   symbol: "ftÃ‚Â³", toLiters: 28.3168 },
  usGallon:    { name: "US Gallon",    symbol: "gal", toLiters: 3.78541 },
  ukGallon:    { name: "UK Gallon",    symbol: "gal", toLiters: 4.54609 },
  usQuart:     { name: "US Quart",     symbol: "qt",  toLiters: 0.946353 },
  usPint:      { name: "US Pint",      symbol: "pt",  toLiters: 0.473176 },
  usCup:       { name: "US Cup",       symbol: "cup", toLiters: 0.24 },
  usFluidOz:   { name: "US Fluid Oz",  symbol: "floz",toLiters: 0.0295735 },
  tablespoon:  { name: "Tablespoon",   symbol: "tbsp",toLiters: 0.0147868 },
  teaspoon:    { name: "Teaspoon",     symbol: "tsp", toLiters: 0.00492892 },
}

function formatNumber(num: number): string {
  if (num === 0) return "0"
  const abs = Math.abs(num)
  if (abs < 0.0001 || abs > 1e15) return num.toExponential(6)
  if (abs < 1) return num.toPrecision(6).replace(/\.?0+$/, "")
  return num.toLocaleString(undefined, { maximumFractionDigits: 10 })
}

export default function VolumeConverterPage({ name, description }: VolumeConverterPageProps) {
  const [value, setValue] = useState("1")
  const [fromUnit, setFromUnit] = useState("liter")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const numericValue = parseFloat(value) || 0

  const conversions = useMemo(() => {
    const fromFactor = UNITS[fromUnit].toLiters
    const valueInLiters = numericValue * fromFactor
    return Object.entries(UNITS).map(([key, unit]) => ({
      key, name: unit.name, symbol: unit.symbol,
      value: valueInLiters / unit.toLiters,
    }))
  }, [numericValue, fromUnit])

  const handleCopy = async (key: string, val: number) => {
    await navigator.clipboard.writeText(formatNumber(val))
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleReset = () => { setValue("1"); setFromUnit("liter") }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Volume Converter" description="Convert liters, gallons, cups, milliliters, cubic feet and more volume units. Perfect for cooking, science and engineering." keywords="volume converter, free online tool, volume-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Volume Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Volume <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert liters, gallons, cups, milliliters, cubic feet and more volume
            units. Perfect for cooking, science and engineering.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Beaker className="w-5 h-5 text-purple-400" />
              <span>Enter Volume</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {conversions.map(({ key, name, symbol, value: convertedValue }) => (
              <div key={key} className={`p-4 rounded-lg border transition ${key === fromUnit ? "bg-purple-500/10 border-purple-500/30" : "bg-theme-secondary border-theme hover:border-purple-500/30"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-theme-muted">{name}</span>
                  <button onClick={() => handleCopy(key, convertedValue)} className="text-theme-muted hover:text-purple-400 transition">
                    {copiedKey === key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-semibold text-lg break-all">{formatNumber(convertedValue)}</div>
                <div className="text-xs text-theme-muted mt-1">{symbol}</div>
              </div>
            ))}
          </div>
        </div>
</div>
    </div>
  )
}
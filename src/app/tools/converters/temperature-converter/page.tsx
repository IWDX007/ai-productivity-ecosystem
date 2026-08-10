"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Thermometer } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

type TempUnit = "celsius" | "fahrenheit" | "kelvin" | "rankine"

const UNIT_INFO: Record<TempUnit, { name: string; symbol: string }> = {
  celsius:    { name: "Celsius",    symbol: "°C" },
  fahrenheit: { name: "Fahrenheit", symbol: "°F" },
  kelvin:     { name: "Kelvin",     symbol: "K" },
  rankine:    { name: "Rankine",    symbol: "°R" },
}

function toCelsius(value: number, from: TempUnit): number {
  switch (from) {
    case "celsius": return value
    case "fahrenheit": return (value - 32) * 5 / 9
    case "kelvin": return value - 273.15
    case "rankine": return (value - 491.67) * 5 / 9
  }
}

function fromCelsius(celsius: number, to: TempUnit): number {
  switch (to) {
    case "celsius": return celsius
    case "fahrenheit": return celsius * 9 / 5 + 32
    case "kelvin": return celsius + 273.15
    case "rankine": return (celsius + 273.15) * 9 / 5
  }
}

function formatNumber(num: number): string {
  if (Math.abs(num) < 0.0001 && num !== 0) return num.toExponential(4)
  return num.toLocaleString(undefined, { maximumFractionDigits: 4 })
}

export default function TemperatureConverterPage() {
  const [value, setValue] = useState("0")
  const [fromUnit, setFromUnit] = useState<TempUnit>("celsius")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const numericValue = parseFloat(value) || 0

  const conversions = useMemo(() => {
    const celsius = toCelsius(numericValue, fromUnit)
    return (Object.keys(UNIT_INFO) as TempUnit[]).map(unit => ({
      key: unit,
      name: UNIT_INFO[unit].name,
      symbol: UNIT_INFO[unit].symbol,
      value: fromCelsius(celsius, unit),
    }))
  }, [numericValue, fromUnit])

  const handleCopy = async (key: string, val: number) => {
    await navigator.clipboard.writeText(formatNumber(val))
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleReset = () => { setValue("0"); setFromUnit("celsius") }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Temperature Converter" description="Convert between Celsius, Fahrenheit, Kelvin and Rankine temperature scales. Instant results with high precision." keywords="temperature converter, free online tool, temperature-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Temperature Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Temperature <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert between Celsius, Fahrenheit, Kelvin and Rankine temperature scales.
            Instant results with high precision.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Thermometer className="w-5 h-5 text-purple-400" />
              <span>Enter Temperature</span>
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
                placeholder="Enter temperature" />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">From Unit</label>
              <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value as TempUnit)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition">
                {(Object.keys(UNIT_INFO) as TempUnit[]).map(unit => (
                  <option key={unit} value={unit}>{UNIT_INFO[unit].name} ({UNIT_INFO[unit].symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-theme-muted mb-3">All Conversions:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conversions.map(({ key, name, symbol, value: convertedValue }) => (
              <div key={key} className={`p-4 rounded-lg border transition ${key === fromUnit ? "bg-purple-500/10 border-purple-500/30" : "bg-theme-secondary border-theme hover:border-purple-500/30"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-theme-muted">{name}</span>
                  <button onClick={() => handleCopy(key, convertedValue)} className="text-theme-muted hover:text-purple-400 transition">
                    {copiedKey === key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-semibold text-lg break-all">{formatNumber(convertedValue)} {symbol}</div>
              </div>
            ))}
          </div>
        </div>

        <SEOSections toolSlug="temperature-converter" toolName="Temperature Converter" category="Converter" />
      </div>
    </div>
  )
}
"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Ruler } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface LengthConverterPageProps {
  name?: string;
  description?: string;
}

// Conversion factors to meters (base unit)
const UNITS: Record<string, { name: string; symbol: string; toMeters: number }> = {
  nanometer:   { name: "Nanometer",   symbol: "nm",  toMeters: 1e-9 },
  micrometer:  { name: "Micrometer",  symbol: "Ã‚Âµm",  toMeters: 1e-6 },
  millimeter:  { name: "Millimeter",  symbol: "mm",  toMeters: 0.001 },
  centimeter:  { name: "Centimeter",  symbol: "cm",  toMeters: 0.01 },
  meter:       { name: "Meter",       symbol: "m",   toMeters: 1 },
  kilometer:   { name: "Kilometer",   symbol: "km",  toMeters: 1000 },
  inch:        { name: "Inch",        symbol: "in",  toMeters: 0.0254 },
  foot:        { name: "Foot",        symbol: "ft",  toMeters: 0.3048 },
  yard:        { name: "Yard",        symbol: "yd",  toMeters: 0.9144 },
  mile:        { name: "Mile",        symbol: "mi",  toMeters: 1609.344 },
  nauticalMile:{ name: "Nautical Mile", symbol: "nmi", toMeters: 1852 },
  lightYear:   { name: "Light Year",  symbol: "ly",  toMeters: 9.461e15 },
}

function formatNumber(num: number): string {
  if (num === 0) return "0"
  const abs = Math.abs(num)
  if (abs < 0.0001 || abs > 1e15) return num.toExponential(6)
  if (abs < 1) return num.toPrecision(6).replace(/\.?0+$/, "")
  return num.toLocaleString(undefined, { maximumFractionDigits: 10 })
}

export default function LengthConverterPage({ name, description }: LengthConverterPageProps) {
  const [value, setValue] = useState<string>("1")
  const [fromUnit, setFromUnit] = useState<string>("meter")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const numericValue = parseFloat(value) || 0

  const conversions = useMemo(() => {
    const fromFactor = UNITS[fromUnit].toMeters
    const valueInMeters = numericValue * fromFactor
    return Object.entries(UNITS).map(([key, unit]) => ({
      key,
      name: unit.name,
      symbol: unit.symbol,
      value: valueInMeters / unit.toMeters,
    }))
  }, [numericValue, fromUnit])

  const handleCopy = async (key: string, val: number) => {
    await navigator.clipboard.writeText(formatNumber(val))
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleReset = () => {
    setValue("1")
    setFromUnit("meter")
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Copy value" description="Convert between meters, kilometers, feet, inches, miles, yards and more units instantly. Free online tool with no login required." keywords="copy value, free online tool, length-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Length Converter" }
        ]} />

        {/* Hero */}
        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Length <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert between meters, kilometers, feet, inches, miles, yards and 
            more units instantly. Free online tool with no login required.
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Ruler className="w-5 h-5 text-purple-400" />
              <span>Enter Value</span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Value</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition"
                placeholder="Enter number"
              />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">From Unit</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition"
              >
                {Object.entries(UNITS).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Grid */}
          <div className="text-sm text-theme-muted mb-3">All Conversions:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {conversions.map(({ key, name, symbol, value: convertedValue }) => (
              <div
                key={key}
                className={`p-4 rounded-lg border transition ${
                  key === fromUnit
                    ? "bg-purple-500/10 border-purple-500/30"
                    : "bg-theme-secondary border-theme hover:border-purple-500/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-theme-muted">{name}</span>
                  <button
                    onClick={() => handleCopy(key, convertedValue)}
                    className="text-theme-muted hover:text-purple-400 transition"
                    title="Copy value"
                  >
                    {copiedKey === key ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="text-theme-primary font-semibold text-lg break-all">
                  {formatNumber(convertedValue)}
                </div>
                <div className="text-xs text-theme-muted mt-1">{symbol}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Sections */}
</div>
    </div>
  )
}
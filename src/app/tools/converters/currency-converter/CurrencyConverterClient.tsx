"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, DollarSign, Info } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
// Static exchange rates (relative to USD) - Update periodically
const RATES: Record<string, { name: string; symbol: string; rate: number }> = {
  USD: { name: "US Dollar",         symbol: "$",   rate: 1 },
  EUR: { name: "Euro",              symbol: "Ã¢â€šÂ¬",   rate: 0.92 },
  GBP: { name: "British Pound",     symbol: "Ã‚Â£",   rate: 0.79 },
  INR: { name: "Indian Rupee",      symbol: "Ã¢â€šÂ¹",   rate: 83.2 },
  PKR: { name: "Pakistani Rupee",   symbol: "Ã¢â€šÂ¨",   rate: 278.5 },
  JPY: { name: "Japanese Yen",      symbol: "Ã‚Â¥",   rate: 149.5 },
  CNY: { name: "Chinese Yuan",      symbol: "Ã‚Â¥",   rate: 7.24 },
  AUD: { name: "Australian Dollar", symbol: "A$",  rate: 1.52 },
  CAD: { name: "Canadian Dollar",   symbol: "C$",  rate: 1.36 },
  CHF: { name: "Swiss Franc",       symbol: "Fr",  rate: 0.88 },
  AED: { name: "UAE Dirham",        symbol: "Ã˜Â¯.Ã˜Â¥", rate: 3.67 },
  SAR: { name: "Saudi Riyal",       symbol: "Ã¯Â·Â¼",   rate: 3.75 },
  SGD: { name: "Singapore Dollar",  symbol: "S$",  rate: 1.34 },
  KRW: { name: "South Korean Won",  symbol: "Ã¢â€šÂ©",   rate: 1330 },
  BRL: { name: "Brazilian Real",    symbol: "R$",  rate: 4.95 },
  ZAR: { name: "South African Rand",symbol: "R",   rate: 18.4 },
}

function formatNumber(num: number): string {
  if (num === 0) return "0"
  return num.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
}

export default function CurrencyConverterPage() {
  const [value, setValue] = useState("100")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const numericValue = parseFloat(value) || 0

  const conversions = useMemo(() => {
    const fromRate = RATES[fromCurrency].rate
    const valueInUSD = numericValue / fromRate
    return Object.entries(RATES).map(([code, curr]) => ({
      code, name: curr.name, symbol: curr.symbol,
      value: valueInUSD * curr.rate,
    }))
  }, [numericValue, fromCurrency])

  const handleCopy = async (key: string, val: number) => {
    await navigator.clipboard.writeText(formatNumber(val))
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleReset = () => { setValue("100"); setFromCurrency("USD") }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Currency Converter" description="Convert between 16 major world currencies including USD, EUR, GBP, INR, PKR and more. Instant conversion using latest rates." keywords="currency converter, free online tool, currency-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Currency Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Currency <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert between 16 major world currencies including USD, EUR, GBP, 
            INR, PKR and more. Instant conversion using latest rates.
          </p>
        </div>

        <div className="mb-6 max-w-4xl mx-auto p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-200">
            <strong>Note:</strong> Rates are approximate for reference. For live rates, 
            check your bank or forex service. Rates updated periodically.
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <DollarSign className="w-5 h-5 text-purple-400" />
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
                placeholder="Enter amount" />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">From Currency</label>
              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition">
                {Object.entries(RATES).map(([code, curr]) => (
                  <option key={code} value={code}>{code} - {curr.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-theme-muted mb-3">All Currencies:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {conversions.map(({ code, name, symbol, value: cv }) => (
              <div key={code} className={`p-4 rounded-lg border transition ${code === fromCurrency ? "bg-purple-500/10 border-purple-500/30" : "bg-theme-secondary border-theme hover:border-purple-500/30"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-theme-muted">{code} - {name}</span>
                  <button onClick={() => handleCopy(code, cv)} className="text-theme-muted hover:text-purple-400 transition">
                    {copiedKey === code ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-semibold text-lg break-all">
                  {symbol} {formatNumber(cv)}
                </div>
              </div>
            ))}
          </div>
        </div>
</div>
    </div>
  )
}
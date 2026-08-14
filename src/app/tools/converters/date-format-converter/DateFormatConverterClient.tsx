"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, RotateCcw, Calendar } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function DateFormatConverterPage() {
  const [dateInput, setDateInput] = useState<string>(new Date().toISOString().slice(0, 10))
  const [copied, setCopied] = useState<string | null>(null)

  const date = new Date(dateInput || Date.now())

  const formats = [
    { key: "iso", name: "ISO 8601", value: isNaN(date.getTime()) ? "Invalid" : date.toISOString() },
    { key: "usDate", name: "US (MM/DD/YYYY)", value: isNaN(date.getTime()) ? "Invalid" : `${(date.getUTCMonth() + 1).toString().padStart(2, "0")}/${date.getUTCDate().toString().padStart(2, "0")}/${date.getUTCFullYear()}` },
    { key: "ukDate", name: "UK (DD/MM/YYYY)", value: isNaN(date.getTime()) ? "Invalid" : `${date.getUTCDate().toString().padStart(2, "0")}/${(date.getUTCMonth() + 1).toString().padStart(2, "0")}/${date.getUTCFullYear()}` },
    { key: "long", name: "Long Format", value: isNaN(date.getTime()) ? "Invalid" : date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
    { key: "short", name: "Short Format", value: isNaN(date.getTime()) ? "Invalid" : date.toLocaleDateString("en-US", { year: "2-digit", month: "short", day: "numeric" }) },
    { key: "dashed", name: "Dashed (YYYY-MM-DD)", value: isNaN(date.getTime()) ? "Invalid" : date.toISOString().slice(0, 10) },
    { key: "dotted", name: "Dotted (DD.MM.YYYY)", value: isNaN(date.getTime()) ? "Invalid" : `${date.getUTCDate().toString().padStart(2, "0")}.${(date.getUTCMonth() + 1).toString().padStart(2, "0")}.${date.getUTCFullYear()}` },
    { key: "unix", name: "Unix Timestamp", value: isNaN(date.getTime()) ? "Invalid" : Math.floor(date.getTime() / 1000).toString() },
    { key: "rfc", name: "RFC 2822", value: isNaN(date.getTime()) ? "Invalid" : date.toUTCString() },
    { key: "chinese", name: "Chinese Format", value: isNaN(date.getTime()) ? "Invalid" : `${date.getUTCFullYear()}Ã¥Â¹Â´${(date.getUTCMonth() + 1)}Ã¦Å“Ë†${date.getUTCDate()}Ã¦â€”Â¥` },
  ]

  const handleCopy = async (key: string, val: string) => {
    await navigator.clipboard.writeText(val)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleReset = () => setDateInput(new Date().toISOString().slice(0, 10))

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Date Format Converter" description="Convert dates between ISO 8601, US, UK, RFC 2822, Unix timestamp and more formats. Perfect for developers and international teams." keywords="date format converter, free online tool, date-format-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Date Format Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Date Format <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert dates between ISO 8601, US, UK, RFC 2822, Unix timestamp and 
            more formats. Perfect for developers and international teams.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>Select Date</span>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Today
            </button>
          </div>

          <div className="mb-8">
            <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition" />
          </div>

          <div className="text-sm text-theme-muted mb-3">All Date Formats:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formats.map(({ key, name, value }) => (
              <div key={key} className="p-4 rounded-lg bg-theme-secondary border border-theme hover:border-purple-500/30 transition">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-theme-muted">{name}</span>
                  <button onClick={() => handleCopy(key, value)} className="text-theme-muted hover:text-purple-400 transition">
                    {copied === key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-semibold text-sm break-all">{value}</div>
              </div>
            ))}
          </div>
        </div>
</div>
    </div>
  )
}
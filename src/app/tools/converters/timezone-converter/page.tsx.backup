"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import { Copy, Check, RotateCcw, Globe } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

const TIMEZONES = [
  { key: "UTC", name: "UTC", offset: 0 },
  { key: "America/New_York", name: "New York (EST)", offset: -5 },
  { key: "America/Los_Angeles", name: "Los Angeles (PST)", offset: -8 },
  { key: "America/Chicago", name: "Chicago (CST)", offset: -6 },
  { key: "Europe/London", name: "London (GMT)", offset: 0 },
  { key: "Europe/Paris", name: "Paris (CET)", offset: 1 },
  { key: "Europe/Moscow", name: "Moscow (MSK)", offset: 3 },
  { key: "Asia/Dubai", name: "Dubai (GST)", offset: 4 },
  { key: "Asia/Karachi", name: "Karachi (PKT)", offset: 5 },
  { key: "Asia/Kolkata", name: "India (IST)", offset: 5.5 },
  { key: "Asia/Shanghai", name: "China (CST)", offset: 8 },
  { key: "Asia/Tokyo", name: "Tokyo (JST)", offset: 9 },
  { key: "Australia/Sydney", name: "Sydney (AEST)", offset: 10 },
  { key: "Pacific/Auckland", name: "New Zealand (NZST)", offset: 12 },
]

export default function TimezoneConverterPage() {
  const [dateTime, setDateTime] = useState<string>("")
  const [fromTz, setFromTz] = useState("UTC")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  useEffect(() => {
    const now = new Date()
    setDateTime(now.toISOString().slice(0, 16))
  }, [])

  const conversions = TIMEZONES.map(tz => {
    if (!dateTime) return { ...tz, formatted: "" }
    try {
      const date = new Date(dateTime)
      const formatted = date.toLocaleString("en-US", { 
        timeZone: tz.key, 
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: true
      })
      return { ...tz, formatted }
    } catch (e) {
      return { ...tz, formatted: "Invalid" }
    }
  })

  const handleCopy = async (key: string, val: string) => {
    await navigator.clipboard.writeText(val)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleReset = () => {
    const now = new Date()
    setDateTime(now.toISOString().slice(0, 16))
    setFromTz("UTC")
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Timezone Converter" description="Convert time between different timezones instantly. See what time it is in New York, London, Tokyo and 10+ major cities." keywords="timezone converter, free online tool, timezone-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Timezone Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Timezone <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert time between different timezones instantly. See what time it is
            in New York, London, Tokyo and 10+ major cities.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Globe className="w-5 h-5 text-purple-400" />
              <span>Enter Date & Time</span>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Now
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Date & Time</label>
              <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition" />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">From Timezone (Reference)</label>
              <select value={fromTz} onChange={(e) => setFromTz(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition">
                {TIMEZONES.map(tz => (
                  <option key={tz.key} value={tz.key}>{tz.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-theme-muted mb-3">Time in All Timezones:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {conversions.map(({ key, name, formatted }) => (
              <div key={key} className={`p-4 rounded-lg border transition ${key === fromTz ? "bg-purple-500/10 border-purple-500/30" : "bg-theme-secondary border-theme hover:border-purple-500/30"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-theme-muted">{name}</span>
                  <button onClick={() => handleCopy(key, formatted)} className="text-theme-muted hover:text-purple-400 transition">
                    {copiedKey === key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-semibold text-sm break-all">{formatted}</div>
              </div>
            ))}
          </div>
        </div>

        <SEOSections toolSlug="timezone-converter" toolName="Timezone Converter" category="Converter" />
      </div>
    </div>
  )
}
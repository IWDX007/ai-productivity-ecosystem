"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function CronGeneratorPage() {
  const [minute, setMinute] = useState("*")
  const [hour, setHour] = useState("*")
  const [day, setDay] = useState("*")
  const [month, setMonth] = useState("*")
  const [weekday, setWeekday] = useState("*")
  const [copied, setCopied] = useState(false)

  const expression = `${minute} ${hour} ${day} ${month} ${weekday}`

  const describe = () => {
    const parts = []
    if (minute === "*" && hour === "*") parts.push("Every minute")
    else if (minute === "0" && hour === "*") parts.push("Every hour")
    else if (minute === "0" && hour === "0") parts.push("Every day at midnight")
    else if (hour === "*") parts.push(`At minute ${minute} of every hour`)
    else parts.push(`At ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`)
    if (day !== "*") parts.push(`on day ${day} of the month`)
    if (month !== "*") parts.push(`in month ${month}`)
    if (weekday !== "*") {
      const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
      parts.push(`on ${days[+weekday] || "day " + weekday}`)
    }
    return parts.join(", ")
  }

  const copy = async () => {
    await navigator.clipboard.writeText(expression)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const presets = [
    { label: "Every minute", cron: "* * * * *" },
    { label: "Every 5 minutes", cron: "*/5 * * * *" },
    { label: "Every hour", cron: "0 * * * *" },
    { label: "Every day at midnight", cron: "0 0 * * *" },
    { label: "Every day at 9 AM", cron: "0 9 * * *" },
    { label: "Every Monday at 9 AM", cron: "0 9 * * 1" },
    { label: "Every Sunday at midnight", cron: "0 0 * * 0" },
    { label: "First day of month", cron: "0 0 1 * *" },
  ]

  const applyPreset = (cron: string) => {
    const [m, h, d, mo, w] = cron.split(" ")
    setMinute(m); setHour(h); setDay(d); setMonth(mo); setWeekday(w)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Cron Expression Generator" description="Build cron expressions visually. Get instant descriptions." keywords="cron expression generator, free online tool, cron-generator, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "Cron Generator" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            Cron Expression <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary text-lg">Build cron expressions visually. Get instant descriptions.</p>
        </div>

        {/* Expression Display */}
        <div className="glass-card rounded-2xl p-6 mb-6 text-center">
          <div className="text-theme-muted text-sm mb-2">Cron Expression</div>
          <div className="flex items-center justify-center gap-3">
            <code className="text-3xl md:text-4xl font-mono gradient-text font-bold">{expression}</code>
            <button onClick={copy} className="text-theme-muted hover:text-crimson-500">
              {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </button>
          </div>
          <div className="text-theme-secondary text-sm mt-4">{describe()}</div>
        </div>

        {/* Fields */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { label: "Minute", value: minute, set: setMinute, hint: "0-59" },
              { label: "Hour", value: hour, set: setHour, hint: "0-23" },
              { label: "Day", value: day, set: setDay, hint: "1-31" },
              { label: "Month", value: month, set: setMonth, hint: "1-12" },
              { label: "Weekday", value: weekday, set: setWeekday, hint: "0-6" },
            ].map(f => (
              <div key={f.label}>
                <label className="text-theme-primary text-sm font-medium block mb-2">
                  {f.label} <span className="text-theme-muted text-xs">({f.hint})</span>
                </label>
                <input value={f.value} onChange={e => f.set(e.target.value)}
                  className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary font-mono text-center focus:outline-none focus:border-crimson-500" />
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-theme-muted">
            Use <code className="text-crimson-500">*</code> for any value, <code className="text-crimson-500">*/5</code> for every 5, <code className="text-crimson-500">1-5</code> for range, <code className="text-crimson-500">1,3,5</code> for list
          </div>
        </div>

        {/* Presets */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-theme-primary font-semibold mb-4">Common Presets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {presets.map(p => (
              <button key={p.label} onClick={() => applyPreset(p.cron)}
                className="text-left p-3 bg-theme-secondary hover:bg-theme-card rounded-xl transition-all group">
                <div className="text-theme-primary font-medium text-sm group-hover:text-crimson-500">{p.label}</div>
                <div className="text-theme-muted font-mono text-xs mt-1">{p.cron}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
</div>
  )
}
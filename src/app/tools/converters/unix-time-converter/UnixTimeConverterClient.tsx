"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import { Copy, Check, RotateCcw, Clock } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function UnixTimeConverterPage() {
  const [unixTime, setUnixTime] = useState<string>("")
  const [humanDate, setHumanDate] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<number>(0)

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000)
    setUnixTime(now.toString())
    setCurrentTime(now)
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (unixTime) {
      try {
        const ts = parseInt(unixTime)
        if (!isNaN(ts)) {
          const date = new Date(ts * 1000)
          setHumanDate(date.toLocaleString("en-US", {
            year: "numeric", month: "long", day: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            timeZoneName: "short"
          }))
        }
      } catch (e) {}
    }
  }, [unixTime])

  const handleDateChange = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      const ts = Math.floor(date.getTime() / 1000)
      setUnixTime(ts.toString())
    } catch (e) {}
  }

  const handleCopy = async (key: string, val: string) => {
    await navigator.clipboard.writeText(val)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleReset = () => {
    const now = Math.floor(Date.now() / 1000)
    setUnixTime(now.toString())
  }

  const ts = parseInt(unixTime) || 0
  const date = new Date(ts * 1000)

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Unix Time Converter" description="Convert between Unix timestamps and human-readable dates. Perfect for developers working with APIs and databases." keywords="unix time converter, free online tool, unix-time-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Unix Time Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Unix Time <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert between Unix timestamps and human-readable dates. Perfect for
            developers working with APIs and databases.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>Current Unix Time: {currentTime}</span>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Now
            </button>
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Unix Timestamp (seconds)</label>
            <input type="text" value={unixTime} onChange={(e) => setUnixTime(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg font-mono focus:outline-none focus:border-purple-500 transition"
              placeholder="e.g., 1704067200" />
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Or Pick a Date</label>
            <input type="datetime-local" onChange={(e) => handleDateChange(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition" />
          </div>

          <div className="text-sm text-theme-muted mb-3">All Formats:</div>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-4 rounded-lg bg-theme-secondary border border-theme">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-theme-muted">Unix Timestamp (seconds)</span>
                <button onClick={() => handleCopy("s", unixTime)} className="text-theme-muted hover:text-purple-400 transition">
                  {copied === "s" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-theme-primary font-semibold text-lg font-mono">{unixTime}</div>
            </div>
            <div className="p-4 rounded-lg bg-theme-secondary border border-theme">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-theme-muted">Unix Timestamp (milliseconds)</span>
                <button onClick={() => handleCopy("ms", (ts * 1000).toString())} className="text-theme-muted hover:text-purple-400 transition">
                  {copied === "ms" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-theme-primary font-semibold text-lg font-mono">{ts * 1000}</div>
            </div>
            <div className="p-4 rounded-lg bg-theme-secondary border border-theme">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-theme-muted">ISO 8601</span>
                <button onClick={() => handleCopy("iso", date.toISOString())} className="text-theme-muted hover:text-purple-400 transition">
                  {copied === "iso" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-theme-primary font-semibold text-lg font-mono break-all">{date.toISOString()}</div>
            </div>
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-theme-muted">Human Readable</span>
                <button onClick={() => handleCopy("human", humanDate)} className="text-theme-muted hover:text-purple-400 transition">
                  {copied === "human" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-purple-400 font-semibold text-lg">{humanDate}</div>
            </div>
            <div className="p-4 rounded-lg bg-theme-secondary border border-theme">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-theme-muted">UTC</span>
                <button onClick={() => handleCopy("utc", date.toUTCString())} className="text-theme-muted hover:text-purple-400 transition">
                  {copied === "utc" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-theme-primary font-semibold text-lg">{date.toUTCString()}</div>
            </div>
          </div>
        </div>
</div>
    </div>
  )
}
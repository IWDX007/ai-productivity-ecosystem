"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Search } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface HttpStatusCodesPageProps {
  name?: string;
  description?: string;
}

const STATUS_CODES = [
  { code: 100, name: "Continue", category: "1xx", description: "Server received request headers, client should proceed." },
  { code: 101, name: "Switching Protocols", category: "1xx", description: "Server is switching protocols as requested." },
  { code: 102, name: "Processing", category: "1xx", description: "Server received and is processing the request." },
  { code: 200, name: "OK", category: "2xx", description: "Standard successful response." },
  { code: 201, name: "Created", category: "2xx", description: "Request fulfilled and new resource created." },
  { code: 202, name: "Accepted", category: "2xx", description: "Request accepted but not yet acted upon." },
  { code: 204, name: "No Content", category: "2xx", description: "Request processed, no content to return." },
  { code: 206, name: "Partial Content", category: "2xx", description: "Server delivering only part of the resource." },
  { code: 301, name: "Moved Permanently", category: "3xx", description: "Resource permanently moved to new URL." },
  { code: 302, name: "Found", category: "3xx", description: "Resource temporarily at different URL." },
  { code: 304, name: "Not Modified", category: "3xx", description: "Resource has not been modified since last request." },
  { code: 307, name: "Temporary Redirect", category: "3xx", description: "Request should be repeated at another URL." },
  { code: 308, name: "Permanent Redirect", category: "3xx", description: "Resource permanently moved, use new URL." },
  { code: 400, name: "Bad Request", category: "4xx", description: "Server cannot process request due to client error." },
  { code: 401, name: "Unauthorized", category: "4xx", description: "Authentication required and has failed." },
  { code: 403, name: "Forbidden", category: "4xx", description: "Server understood but refuses to authorize." },
  { code: 404, name: "Not Found", category: "4xx", description: "Requested resource could not be found." },
  { code: 405, name: "Method Not Allowed", category: "4xx", description: "HTTP method not allowed for this resource." },
  { code: 408, name: "Request Timeout", category: "4xx", description: "Server timed out waiting for the request." },
  { code: 409, name: "Conflict", category: "4xx", description: "Request conflicts with current state of the server." },
  { code: 410, name: "Gone", category: "4xx", description: "Resource is no longer available permanently." },
  { code: 413, name: "Payload Too Large", category: "4xx", description: "Request entity larger than server limits." },
  { code: 414, name: "URI Too Long", category: "4xx", description: "URI provided was too long for the server." },
  { code: 415, name: "Unsupported Media Type", category: "4xx", description: "Media format not supported by the server." },
  { code: 422, name: "Unprocessable Entity", category: "4xx", description: "Request well-formed but semantic errors." },
  { code: 429, name: "Too Many Requests", category: "4xx", description: "User has sent too many requests (rate limiting)." },
  { code: 500, name: "Internal Server Error", category: "5xx", description: "Generic server error message." },
  { code: 501, name: "Not Implemented", category: "5xx", description: "Server does not support the request method." },
  { code: 502, name: "Bad Gateway", category: "5xx", description: "Server received invalid response from upstream." },
  { code: 503, name: "Service Unavailable", category: "5xx", description: "Server not ready to handle the request." },
  { code: 504, name: "Gateway Timeout", category: "5xx", description: "Server acting as gateway timed out." },
  { code: 505, name: "HTTP Version Not Supported", category: "5xx", description: "HTTP version in request not supported." },
]

const categoryColors: { [key: string]: string } = {
  "1xx": "text-blue-500 bg-blue-500/10 border-blue-500/30",
  "2xx": "text-green-500 bg-green-500/10 border-green-500/30",
  "3xx": "text-yellow-500 bg-yellow-500/10 border-yellow-500/30",
  "4xx": "text-orange-500 bg-orange-500/10 border-orange-500/30",
  "5xx": "text-red-500 bg-red-500/10 border-red-500/30",
}

export default function HttpStatusCodesPage({ name, description }: HttpStatusCodesPageProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string>("all")

  const filtered = STATUS_CODES.filter(s => {
    const q = search.toLowerCase()
    const matchSearch = !q || s.code.toString().includes(q) || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    const matchFilter = filter === "all" || s.category === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="HTTP Status Codes Reference" description="Complete reference for all HTTP status codes with descriptions." keywords="http status codes reference, free online tool, http-status-codes, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "HTTP Status Codes" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            HTTP Status <span className="gradient-text">Codes Reference</span>
          </h1>
          <p className="text-theme-secondary text-lg">Complete reference for all HTTP status codes with descriptions.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by code, name or description..."
              className="w-full pl-10 pr-4 py-3 bg-theme-secondary border border-theme rounded-xl text-theme-primary focus:outline-none focus:border-crimson-500" />
          </div>
          <div className="flex flex-wrap gap-2">
            {["all", "1xx", "2xx", "3xx", "4xx", "5xx"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition-all ${filter === f ? "gradient-crimson text-white" : "bg-theme-secondary text-theme-secondary hover:text-theme-primary"}`}>
                {f === "all" ? "All" : `${f} ${f === "1xx" ? "Info" : f === "2xx" ? "Success" : f === "3xx" ? "Redirect" : f === "4xx" ? "Client Error" : "Server Error"}`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(s => (
            <div key={s.code} className={`p-5 rounded-2xl border ${categoryColors[s.category]}`}>
              <div className="flex items-start gap-4">
                <div className={`text-4xl font-bold ${categoryColors[s.category].split(" ")[0]}`}>
                  {s.code}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-theme-primary font-semibold">{s.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[s.category]}`}>
                      {s.category}
                    </span>
                  </div>
                  <p className="text-theme-secondary text-sm">{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-theme-muted">No status codes match your search.</p>
          </div>
        )}
      </div>
</div>
  )
}
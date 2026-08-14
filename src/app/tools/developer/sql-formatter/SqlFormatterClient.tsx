"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Trash2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface SqlFormatterPageProps {
  name?: string;
  description?: string;
}

export default function SqlFormatterPage({ name, description }: SqlFormatterPageProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const format = () => {
    if (!input.trim()) return
    const keywords = ["SELECT","FROM","WHERE","AND","OR","ORDER BY","GROUP BY","HAVING",
      "JOIN","LEFT JOIN","RIGHT JOIN","INNER JOIN","INSERT INTO","VALUES","UPDATE","SET",
      "DELETE FROM","CREATE TABLE","DROP TABLE","ALTER TABLE","LIMIT","OFFSET","UNION",
      "DISTINCT","AS","ON","NOT","IN","LIKE","BETWEEN","IS NULL","IS NOT NULL"]
    let result = input.trim()
    keywords.forEach(kw => {
      result = result.replace(new RegExp(`\\b${kw}\\b`, "gi"), `\n${kw}`)
    })
    setOutput(result.replace(/\n+/g, "\n").trim())
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sample = `SELECT u.id, u.name, u.email, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.active = 1 AND u.created_at > '2024-01-01' GROUP BY u.id, u.name, u.email HAVING order_count > 5 ORDER BY order_count DESC LIMIT 10`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="SQL Formatter" description="Format and beautify SQL queries for better readability. Supports SELECT, INSERT, UPDATE, DELETE and more." keywords="sql formatter, free online tool, sql-formatter, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "SQL Formatter" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            SQL <span className="gradient-text">Formatter</span>
          </h1>
          <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
            Format and beautify SQL queries for better readability. Supports SELECT, INSERT, UPDATE, DELETE and more.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex justify-end mb-4">
            <button onClick={() => { setInput(sample); setOutput("") }}
              className="text-sm px-4 py-2 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-lg transition-all">
              Load Sample
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Input SQL</label>
                <button onClick={() => { setInput(""); setOutput("") }} className="text-theme-muted hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder="Paste your SQL query here..."
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Formatted SQL</label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="Formatted SQL appears here..."
                className="w-full h-80 p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>
          <button onClick={format} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4">
            Format SQL
          </button>
        </div>
      </div>
</div>
  )
}
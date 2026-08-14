"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function HtmlTableGeneratorPage() {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [hasHeader, setHasHeader] = useState(true)
  const [styled, setStyled] = useState(true)
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const styles = styled ? `<style>
  table { border-collapse: collapse; width: 100%; }
  th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
  th { background: #f5f5f5; font-weight: 600; }
  tr:nth-child(even) { background: #fafafa; }
</style>\n\n` : ""

    const header = hasHeader
      ? `  <thead>\n    <tr>\n${Array.from({length: cols}, (_, i) => `      <th>Header ${i + 1}</th>`).join("\n")}\n    </tr>\n  </thead>\n`
      : ""

    const bodyRows = Array.from({length: hasHeader ? rows - 1 : rows}, (_, r) =>
      `    <tr>\n${Array.from({length: cols}, (_, c) => `      <td>Row ${r + 1}, Col ${c + 1}</td>`).join("\n")}\n    </tr>`
    ).join("\n")

    return `${styles}<table>\n${header}  <tbody>\n${bodyRows}\n  </tbody>\n</table>`
  }

  const html = generate()

  const copy = async () => {
    await navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="HTML Table Generator" description="Create HTML tables with custom rows, columns and styling." keywords="html table generator, free online tool, html-table-generator, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "HTML Table Generator" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            HTML Table <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary text-lg">Create HTML tables with custom rows, columns and styling.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-theme-secondary text-sm block mb-2">Rows</label>
              <input type="number" min={1} max={50} value={rows} onChange={e => setRows(+e.target.value)}
                className="w-full px-4 py-2 bg-theme-secondary border border-theme rounded-xl text-theme-primary focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <label className="text-theme-secondary text-sm block mb-2">Columns</label>
              <input type="number" min={1} max={20} value={cols} onChange={e => setCols(+e.target.value)}
                className="w-full px-4 py-2 bg-theme-secondary border border-theme rounded-xl text-theme-primary focus:outline-none focus:border-crimson-500" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={hasHeader} onChange={e => setHasHeader(e.target.checked)}
                  className="w-4 h-4 accent-crimson-500" />
                <span className="text-theme-primary text-sm">Include Header</span>
              </label>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={styled} onChange={e => setStyled(e.target.checked)}
                  className="w-4 h-4 accent-crimson-500" />
                <span className="text-theme-primary text-sm">Include CSS</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Preview */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-theme-primary font-semibold mb-4">Preview</h3>
            <div className="bg-white rounded-xl p-4 overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
          </div>

          {/* Code */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-theme-primary font-semibold">HTML Code</h3>
              <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
            <pre className="bg-theme-secondary rounded-xl p-4 text-theme-primary font-mono text-xs overflow-auto max-h-96">
              {html}
            </pre>
          </div>
        </div>
      </div>
</div>
  )
}
"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Eye, Code } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState("")
  const [view, setView] = useState<"split" | "preview" | "code">("split")
  const [copied, setCopied] = useState(false)

  const toHTML = (md: string): string => {
    return md
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" style="max-width:100%">')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
      .replace(/<\/ul>\s*<ul>/g, '')
      .replace(/^---$/gm, '<hr>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .split('\n\n').map(p => p.trim() && !p.startsWith('<') ? `<p>${p}</p>` : p).join('\n')
  }

  const html = toHTML(markdown)

  const copy = async () => {
    await navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sample = `# Welcome to Markdown

## Features
This is a **bold** text and this is *italic*.

### Lists
- First item
- Second item
- Third item

### Code
Inline \`code\` and code blocks:
\`\`\`
function hello() {
  console.log("Hello!");
}
\`\`\`

### Links & Images
Check out [Google](https://google.com)

### Quote
> This is a blockquote

---

That's it!`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Markdown Preview" description="Preview and convert markdown to HTML instantly" keywords="markdown, preview, converter, html, developer tools" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "Markdown Preview" }
        ]} />
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            Markdown <span className="gradient-text">Live Preview</span>
          </h1>
          <p className="text-theme-secondary text-lg">Write markdown and preview rendered HTML instantly.</p>
        </div>

        <div className="glass-card rounded-2xl p-4 mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex bg-theme-secondary rounded-xl p-1">
            {([
              { key: "split", label: "Split" },
              { key: "code", label: "Markdown" },
              { key: "preview", label: "Preview" },
            ] as const).map(v => (
              <button key={v.key} onClick={() => setView(v.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === v.key ? "gradient-crimson text-white" : "text-theme-secondary hover:text-theme-primary"}`}>
                {v.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setMarkdown(sample)}
              className="text-sm px-4 py-2 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-lg transition-all">
              Load Sample
            </button>
            <button onClick={copy}
              className="text-sm px-4 py-2 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-lg transition-all flex items-center gap-2">
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />} Copy HTML
            </button>
          </div>
        </div>

        <div className={`gap-4 ${view === "split" ? "grid grid-cols-1 lg:grid-cols-2" : "block"}`}>
          {(view === "split" || view === "code") && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-theme-secondary border-b border-theme">
                <Code size={14} className="text-theme-muted" />
                <span className="text-theme-muted text-sm">Markdown</span>
              </div>
              <textarea value={markdown} onChange={e => setMarkdown(e.target.value)}
                placeholder="Write your markdown here..."
                className="w-full h-[500px] p-4 bg-theme-primary text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          )}
          {(view === "split" || view === "preview") && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-theme-secondary border-b border-theme">
                <Eye size={14} className="text-theme-muted" />
                <span className="text-theme-muted text-sm">Preview</span>
              </div>
              <div className="h-[500px] overflow-y-auto p-6 prose prose-invert max-w-none text-theme-primary"
                style={{
                  ['--tw-prose-headings' as any]: 'currentColor',
                  ['--tw-prose-body' as any]: 'currentColor',
                }}
                dangerouslySetInnerHTML={{ __html: html || '<p style="color:#999">Start typing markdown...</p>' }} />
            </div>
          )}
        </div>
      </div>
    
      <SEOSections toolSlug="markdown-preview" toolName="Markdown Preview" category="Developer" />
    </div>
  )
}
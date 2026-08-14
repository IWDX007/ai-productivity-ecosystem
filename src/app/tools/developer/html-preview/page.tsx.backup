"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Eye, Code, Maximize2 } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function HtmlPreviewPage() {
  const [html, setHtml] = useState("")
  const [view, setView] = useState<"split" | "preview" | "code">("split")

  const sample = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
    .card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 400px; margin: 0 auto; }
    h1 { color: #DC2626; margin-bottom: 8px; }
    p { color: #666; line-height: 1.6; }
    .btn { background: linear-gradient(135deg, #DC2626, #EC4899); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-top: 16px; }
    .btn:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello World!</h1>
    <p>This is a live HTML preview. Edit the code on the left to see changes here instantly.</p>
    <button class="btn" onclick="alert('Button clicked!')">Click Me</button>
  </div>
</body>
</html>`

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="HTML Preview" description="This is a live HTML preview. Edit the code on the left to see changes here instantly." keywords="html preview, free online tool, html-preview, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "HTML Preview" }
        ]} />
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            HTML <span className="gradient-text">Live Preview</span>
          </h1>
          <p className="text-theme-secondary text-lg">Write HTML and see live preview instantly. Test HTML, CSS and JavaScript.</p>
        </div>

        {/* Controls */}
        <div className="glass-card rounded-2xl p-4 mb-4 flex items-center justify-between">
          <div className="flex bg-theme-secondary rounded-xl p-1">
            {([
              { key: "split", icon: <Code size={14} />, label: "Split" },
              { key: "code", icon: <Code size={14} />, label: "Code" },
              { key: "preview", icon: <Eye size={14} />, label: "Preview" },
            ] as const).map(v => (
              <button key={v.key} onClick={() => setView(v.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === v.key ? "gradient-crimson text-white" : "text-theme-secondary hover:text-theme-primary"}`}>
                {v.icon} {v.label}
              </button>
            ))}
          </div>
          <button onClick={() => setHtml(sample)}
            className="text-sm px-4 py-2 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-lg transition-all">
            Load Sample
          </button>
        </div>

        <div className={`gap-4 ${view === "split" ? "grid grid-cols-1 lg:grid-cols-2" : "block"}`}>
          {/* Code Editor */}
          {(view === "split" || view === "code") && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-theme-secondary border-b border-theme">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-theme-muted text-sm ml-2">index.html</span>
              </div>
              <textarea value={html} onChange={e => setHtml(e.target.value)}
                placeholder="Write your HTML here..."
                className="w-full h-[500px] p-4 bg-theme-primary text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          )}

          {/* Preview */}
          {(view === "split" || view === "preview") && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-theme-secondary border-b border-theme">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-theme-muted text-sm ml-2">Preview</span>
                <Eye size={14} className="ml-auto text-theme-muted" />
              </div>
              <iframe
                srcDoc={html || "<html><body style='display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#999'><p>Start typing HTML to see preview...</p></body></html>"}
                className="w-full h-[500px] bg-white"
                sandbox="allow-scripts"
                title="HTML Preview"
              />
            </div>
          )}
        </div>
      </div>
    
      <SEOSections toolSlug="html-preview" toolName="HTML Preview" category="Developer" />
    </div>
  )
}
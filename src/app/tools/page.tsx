"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ArrowRight, Type, Calculator, Code, Ruler, Shield, QrCode, Image as ImageIcon, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { getAllCategories } from "@/config/tools-data"

const iconMap: Record<string, any> = {
  Type, Calculator, Code, Ruler, Shield, QrCode, Image: ImageIcon, FileText,
}

const TOOLS_PER_PAGE = 24

export default function AllToolsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)

  const allCategories = getAllCategories()
  const liveCategories = allCategories.filter(c => c.status === "live")

  // Filter and search
  const filteredCategories = useMemo(() => {
    let cats = liveCategories

    if (selectedCategory !== "all") {
      cats = cats.filter(c => c.slug === selectedCategory)
    }

    if (search.trim()) {
      const query = search.toLowerCase()
      cats = cats.map(cat => ({
        ...cat,
        tools: cat.tools.filter(t =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
        )
      })).filter(c => c.tools.length > 0)
    }

    return cats
  }, [search, selectedCategory, liveCategories])

  // Flatten all tools for pagination
  const allFilteredTools = useMemo(() => {
    const tools: Array<{ category: any; tool: any }> = []
    filteredCategories.forEach(cat => {
      cat.tools.forEach(tool => {
        tools.push({ category: cat, tool })
      })
    })
    return tools
  }, [filteredCategories])

  const totalPages = Math.ceil(allFilteredTools.length / TOOLS_PER_PAGE)
  const startIdx = (currentPage - 1) * TOOLS_PER_PAGE
  const paginatedTools = allFilteredTools.slice(startIdx, startIdx + TOOLS_PER_PAGE)

  // Group paginated tools by category
  const groupedTools = useMemo(() => {
    const groups: Record<string, { category: any; tools: any[] }> = {}
    paginatedTools.forEach(({ category, tool }) => {
      if (!groups[category.slug]) {
        groups[category.slug] = { category, tools: [] }
      }
      groups[category.slug].tools.push(tool)
    })
    return Object.values(groups)
  }, [paginatedTools])

  const totalTools = liveCategories.reduce((sum, cat) => sum + cat.tools.length, 0)
  const filteredCount = allFilteredTools.length

  return (
    <div className="min-h-screen bg-theme-primary">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "All Tools" }
        ]} />

        {/* Hero */}
        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            {totalTools} Tools Available
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            All <span className="gradient-text">Tools</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto mb-6">
            Explore all {totalTools}+ free online tools organized by category.
            Text, calculators, developer, converters, security, image, PDF and more.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
              placeholder="Search all tools..."
              className="w-full pl-12 pr-4 py-3 bg-theme-secondary border border-theme rounded-full text-theme-primary focus:outline-none focus:border-purple-500 transition"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => { setSelectedCategory("all"); setCurrentPage(1) }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === "all"
                ? "bg-purple-500 text-white"
                : "bg-theme-secondary text-theme-secondary border border-theme hover:border-purple-500/30"
            }`}
          >
            All ({totalTools})
          </button>
          {liveCategories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => { setSelectedCategory(cat.slug); setCurrentPage(1) }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat.slug
                  ? "bg-purple-500 text-white"
                  : "bg-theme-secondary text-theme-secondary border border-theme hover:border-purple-500/30"
              }`}
            >
              {cat.name} ({cat.tools.length})
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-6 text-sm text-theme-muted">
          Showing {startIdx + 1}-{Math.min(startIdx + TOOLS_PER_PAGE, filteredCount)} of {filteredCount} tools
          {search && ` matching "${search}"`}
        </div>

        {/* Tools Grouped by Category */}
        {groupedTools.length === 0 ? (
          <div className="text-center py-20 text-theme-muted">
            No tools found matching your search.
          </div>
        ) : (
          <div className="space-y-12">
            {groupedTools.map(({ category, tools }) => {
              const Icon = iconMap[category.icon] || Type
              return (
                <div key={category.slug}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-theme-primary">{category.name}</h2>
                        <p className="text-sm text-theme-muted">{tools.length} tools shown</p>
                      </div>
                    </div>
                    <Link
                      href={`/tools/${category.slug}`}
                      className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      View all <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tools.map((tool: any) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="glass-card rounded-xl p-5 card-hover group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className={`w-8 h-8 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 ${category.color}`} />
                          </div>
                          <ArrowRight className="w-4 h-4 text-theme-muted group-hover:text-purple-400 transition" />
                        </div>
                        <h3 className="font-semibold text-theme-primary mb-1">{tool.name}</h3>
                        <p className="text-xs text-theme-secondary">{tool.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-theme-secondary border border-theme text-theme-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-purple-500/30 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first, last, current, and pages near current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-10 h-10 px-3 rounded-lg font-medium transition ${
                      currentPage === page
                        ? "bg-purple-500 text-white"
                        : "bg-theme-secondary border border-theme text-theme-primary hover:border-purple-500/30"
                    }`}
                  >
                    {page}
                  </button>
                )
              } else if (page === currentPage - 3 || page === currentPage + 3) {
                return <span key={page} className="text-theme-muted px-2">...</span>
              }
              return null
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-theme-secondary border border-theme text-theme-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-purple-500/30 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Page Info */}
        {totalPages > 1 && (
          <div className="text-center mt-4 text-sm text-theme-muted">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>
    </div>
  )
}
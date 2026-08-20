'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Search,
  X,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Type,
  Code,
  Calculator,
  Ruler,
  Lock,
  QrCode,
  TrendingUp,
  ArrowRight,
  Command
} from 'lucide-react'
import { ALL_SEARCH_TOOLS, SearchToolItem } from '@/lib/searchToolsData'

const iconMap: Record<string, any> = {
  FileText,
  ImageIcon,
  Type,
  Code,
  Calculator,
  Ruler,
  Lock,
  QrCode,
  Sparkles
}

const trendingTools = ALL_SEARCH_TOOLS.slice(0, 6)

const categoryList = [
  { name: 'PDF Tools', href: '/tools/pdf', icon: FileText, color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'Image Tools', href: '/tools/image', icon: ImageIcon, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Text Tools', href: '/tools/text', icon: Type, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { name: 'Developer', href: '/tools/developer', icon: Code, color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'Calculators', href: '/tools/calculators', icon: Calculator, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Converters', href: '/tools/converters', icon: Ruler, color: 'text-purple-500', bg: 'bg-purple-500/10' },
]

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filteredTools, setFilteredTools] = useState<SearchToolItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredTools([])
    } else {
      const q = query.toLowerCase()
      const filtered = ALL_SEARCH_TOOLS.filter(tool =>
        tool.name.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.categorySlug.toLowerCase().includes(q)
      )
      setFilteredTools(filtered.slice(0, 15)) // Limit top 15 results for performance
    }
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true)
          setTimeout(() => inputRef.current?.focus(), 100)
        }}
        className="flex items-center gap-2 px-4 py-2 glass-card border border-theme rounded-lg w-64 hover:border-crimson-500 transition-all cursor-pointer group"
      >
        <Search className="w-4 h-4 text-theme-secondary group-hover:text-crimson-500 transition-colors" />
        <span className="text-sm text-theme-secondary flex-1 text-left">Search 200+ tools...</span>
        <kbd className="px-2 py-0.5 text-xs bg-theme-secondary text-theme-primary rounded border border-theme flex items-center gap-1">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pointer-events-none">
            <div
              ref={searchRef}
              className="w-full max-w-2xl pointer-events-auto animate-scale-in"
            >
              <div className="bg-theme-card border border-theme rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative border-b border-theme">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-secondary" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search 200+ free online tools..."
                    className="w-full pl-12 pr-12 py-4 bg-transparent text-theme-primary text-base outline-none placeholder:text-theme-muted"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-theme-secondary rounded transition-colors"
                  >
                    <kbd className="px-2 py-1 text-xs bg-theme-secondary text-theme-primary rounded border border-theme">ESC</kbd>
                  </button>
                </div>

                <div className="max-h-[500px] overflow-y-auto">
                  {query.trim() !== '' ? (
                    <>
                      {filteredTools.length > 0 ? (
                        <div className="p-2">
                          <p className="px-3 py-2 text-xs font-semibold text-theme-secondary uppercase tracking-wider">
                            Search Results ({filteredTools.length})
                          </p>
                          {filteredTools.map((tool, idx) => {
                            const IconComponent = iconMap[tool.iconName] || Sparkles
                            return (
                              <Link
                                key={idx}
                                href={tool.href}
                                onClick={() => {
                                  setIsOpen(false)
                                  setQuery('')
                                }}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-theme-secondary group transition-all"
                              >
                                <div className="p-2 rounded-lg bg-crimson-500/10 text-crimson-500">
                                  <IconComponent className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-theme-primary group-hover:text-crimson-500 transition-colors">
                                    {tool.name}
                                  </p>
                                  <p className="text-xs text-theme-muted">{tool.category}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-theme-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                              </Link>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-crimson-500/10 flex items-center justify-center">
                            <Search className="w-8 h-8 text-crimson-500" />
                          </div>
                          <p className="text-theme-primary font-medium mb-1">No tools found</p>
                          <p className="text-sm text-theme-secondary">Try searching for word counter, pdf, json, or password</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="p-2">
                        <div className="flex items-center gap-2 px-3 py-2">
                          <TrendingUp className="w-4 h-4 text-crimson-500" />
                          <p className="text-xs font-semibold text-theme-secondary uppercase tracking-wider">
                            Popular Tools
                          </p>
                        </div>
                        {trendingTools.map((tool, idx) => {
                          const IconComponent = iconMap[tool.iconName] || Sparkles
                          return (
                            <Link
                              key={idx}
                              href={tool.href}
                              onClick={() => {
                                setIsOpen(false)
                                setQuery('')
                              }}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-theme-secondary group transition-all"
                            >
                              <div className="p-2 rounded-lg bg-crimson-500/10 text-crimson-500">
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-theme-primary group-hover:text-crimson-500 transition-colors">
                                  {tool.name}
                                </p>
                                <p className="text-xs text-theme-muted">{tool.category}</p>
                              </div>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-crimson-500/20 text-crimson-500 font-semibold">
                                Hot
                              </span>
                            </Link>
                          )
                        })}
                      </div>

                      <div className="p-2 border-t border-theme">
                        <p className="px-3 py-2 text-xs font-semibold text-theme-secondary uppercase tracking-wider">
                          Categories
                        </p>
                        <div className="grid grid-cols-2 gap-2 p-2">
                          {categoryList.map((cat, idx) => {
                            const Icon = cat.icon
                            return (
                              <Link
                                key={idx}
                                href={cat.href}
                                onClick={() => {
                                  setIsOpen(false)
                                  setQuery('')
                                }}
                                className="flex items-center gap-2 p-3 rounded-lg hover:bg-theme-secondary transition-all border border-theme"
                              >
                                <div className={cat.bg + ' p-2 rounded-lg'}>
                                  <Icon className={cat.color + ' w-4 h-4'} />
                                </div>
                                <span className="text-sm font-medium text-theme-primary">{cat.name}</span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t border-theme p-3 flex items-center justify-between bg-theme-secondary/50">
                  <div className="flex items-center gap-4 text-xs text-theme-muted">
                    <span>200+ Live Tools</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-theme-muted">
                    <Sparkles className="w-3 h-3 text-crimson-500" />
                    <span>Instant Search</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

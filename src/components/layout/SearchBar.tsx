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
  Clock,
  TrendingUp,
  ArrowRight,
  Command
} from 'lucide-react'

interface Tool {
  name: string
  category: string
  href: string
  icon: any
  color: string
  bg: string
}

const allTools: Tool[] = [
  // Popular Tools
  { name: 'PDF Merger', category: 'PDF', href: '/tools/pdf/pdf-merger', icon: FileText, color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'Image Compressor', category: 'Image', href: '/tools/image/image-compressor', icon: ImageIcon, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Word Counter', category: 'Text', href: '/tools/text/word-counter', icon: Type, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { name: 'JSON Formatter', category: 'Developer', href: '/tools/developer/json-formatter', icon: Code, color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'BMI Calculator', category: 'Calculator', href: '/tools/calculators/bmi-calculator', icon: Calculator, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Length Converter', category: 'Converter', href: '/tools/converters/length-converter', icon: Ruler, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Password Generator', category: 'Security', href: '/tools/security/password-generator', icon: Lock, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { name: 'QR Code Generator', category: 'QR', href: '/tools/qr-barcode/qr-code-generator', icon: QrCode, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { name: 'PDF Splitter', category: 'PDF', href: '/tools/pdf/pdf-splitter', icon: FileText, color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'Image Resizer', category: 'Image', href: '/tools/image/image-resizer', icon: ImageIcon, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Character Counter', category: 'Text', href: '/tools/text/character-counter', icon: Type, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { name: 'Base64 Encoder', category: 'Developer', href: '/tools/developer/base64-encoder', icon: Code, color: 'text-green-500', bg: 'bg-green-500/10' },
]

const trendingTools = allTools.slice(0, 5)
const categories = [
  { name: 'PDF Tools', icon: FileText, color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'Image Tools', icon: ImageIcon, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Text Tools', icon: Type, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { name: 'Developer', icon: Code, color: 'text-green-500', bg: 'bg-green-500/10' },
]

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Filter tools based on query
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredTools([])
    } else {
      const filtered = allTools.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.category.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredTools(filtered)
    }
  }, [query])

  // Handle Ctrl+K shortcut
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

  // Handle click outside
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
      {/* Search Button (Trigger) */}
      <button 
        onClick={() => {
          setIsOpen(true)
          setTimeout(() => inputRef.current?.focus(), 100)
        }}
        className="flex items-center gap-2 px-4 py-2 glass-card border border-theme rounded-lg w-64 hover:border-crimson-500 transition-all cursor-pointer group"
      >
        <Search className="w-4 h-4 text-theme-secondary group-hover:text-crimson-500 transition-colors" />
        <span className="text-sm text-theme-secondary flex-1 text-left">Search tools...</span>
        <kbd className="px-2 py-0.5 text-xs bg-theme-secondary text-theme-primary rounded border border-theme flex items-center gap-1">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Search Container */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pointer-events-none">
            <div 
              ref={searchRef}
              className="w-full max-w-2xl pointer-events-auto animate-scale-in"
            >
              <div className="bg-theme-card border border-theme rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Search Input */}
                <div className="relative border-b border-theme">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-secondary" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for tools, prompts, or blogs..."
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

                {/* Search Results */}
                <div className="max-h-[500px] overflow-y-auto">
                  
                  {/* Show filtered results when typing */}
                  {query.trim() !== '' ? (
                    <>
                      {filteredTools.length > 0 ? (
                        <div className="p-2">
                          <p className="px-3 py-2 text-xs font-semibold text-theme-secondary uppercase tracking-wider">
                            Search Results ({filteredTools.length})
                          </p>
                          {filteredTools.map((tool, idx) => {
                            const Icon = tool.icon
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
                                <div className={tool.bg + ' p-2 rounded-lg'}>
                                  <Icon className={tool.color + ' w-5 h-5'} />
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
                          <p className="text-theme-primary font-medium mb-1">No results found</p>
                          <p className="text-sm text-theme-secondary">Try searching with different keywords</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Trending Tools */}
                      <div className="p-2">
                        <div className="flex items-center gap-2 px-3 py-2">
                          <TrendingUp className="w-4 h-4 text-crimson-500" />
                          <p className="text-xs font-semibold text-theme-secondary uppercase tracking-wider">
                            Trending Now
                          </p>
                        </div>
                        {trendingTools.map((tool, idx) => {
                          const Icon = tool.icon
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
                              <div className={tool.bg + ' p-2 rounded-lg'}>
                                <Icon className={tool.color + ' w-5 h-5'} />
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

                      {/* Quick Categories */}
                      <div className="p-2 border-t border-theme">
                        <p className="px-3 py-2 text-xs font-semibold text-theme-secondary uppercase tracking-wider">
                          Quick Categories
                        </p>
                        <div className="grid grid-cols-2 gap-2 p-2">
                          {categories.map((cat, idx) => {
                            const Icon = cat.icon
                            return (
                              <Link
                                key={idx}
                                href="#"
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

                {/* Footer */}
                <div className="border-t border-theme p-3 flex items-center justify-between bg-theme-secondary/50">
                  <div className="flex items-center gap-4 text-xs text-theme-muted">
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-theme-card rounded border border-theme">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-theme-card rounded border border-theme">↓</kbd>
                      <span>Navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-theme-card rounded border border-theme">↵</kbd>
                      <span>Select</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-theme-card rounded border border-theme">ESC</kbd>
                      <span>Close</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-theme-muted">
                    <Sparkles className="w-3 h-3 text-crimson-500" />
                    <span>Powered by AI Search</span>
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
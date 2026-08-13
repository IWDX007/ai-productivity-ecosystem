'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  Search, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Type,
  Code,
  Calculator,
  Ruler,
  Lock,
  QrCode,
  Zap,
  Video,
  Music,
  Bot,
  TrendingUp,
  Star,
  ArrowRight,
  BookOpen,
  DollarSign,
  Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false)
  const [mobileToolsExpanded, setMobileToolsExpanded] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const toolCategories = [
    {
      title: 'File Tools',
      items: [
        { name: 'PDF Tools', icon: FileText, count: 15, color: 'text-red-500', bg: 'bg-red-500/10', href: '/tools/pdf' },
        { name: 'Image Tools', icon: ImageIcon, count: 25, color: 'text-orange-500', bg: 'bg-orange-500/10', href: '/tools/image' },
        { name: 'Video Tools', icon: Video, count: 0, color: 'text-purple-500', bg: 'bg-purple-500/10', href: '/tools/video', badge: 'Soon' },
        { name: 'Audio Tools', icon: Music, count: 0, color: 'text-pink-500', bg: 'bg-pink-500/10', href: '/tools/audio', badge: 'Soon' },
      ]
    },
    {
      title: 'Text & Code',
      items: [
        { name: 'Text Tools', icon: Type, count: 30, color: 'text-yellow-500', bg: 'bg-yellow-500/10', href: '/tools/text' },
        { name: 'Developer', icon: Code, count: 35, color: 'text-green-500', bg: 'bg-green-500/10', href: '/tools/developer' },
        { name: 'AI Tools', icon: Bot, count: 0, color: 'text-blue-500', bg: 'bg-blue-500/10', href: '/tools/ai', badge: 'Soon' },
        { name: 'SEO Tools', icon: TrendingUp, count: 0, color: 'text-emerald-500', bg: 'bg-emerald-500/10', href: '/tools/seo', badge: 'Soon' },
      ]
    },
    {
      title: 'Utilities',
      items: [
        { name: 'Calculators', icon: Calculator, count: 30, color: 'text-blue-400', bg: 'bg-blue-400/10', href: '/tools/calculators' },
        { name: 'Converters', icon: Ruler, count: 30, color: 'text-purple-400', bg: 'bg-purple-400/10', href: '/tools/converters' },
        { name: 'Security', icon: Lock, count: 20, color: 'text-pink-400', bg: 'bg-pink-400/10', href: '/tools/security' },
        { name: 'QR & Barcode', icon: QrCode, count: 15, color: 'text-cyan-500', bg: 'bg-cyan-500/10', href: '/tools/qr-barcode' },
      ]
    }
  ]

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'glass-morphism border-b border-theme shadow-lg' 
          : 'bg-theme-primary border-b border-theme'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 gradient-crimson rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-10 h-10 rounded-lg gradient-crimson flex items-center justify-center icon-hover">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="font-bold text-lg text-theme-primary leading-tight">AI Productivity</h1>
                <p className="text-xs text-theme-secondary leading-tight">Ecosystem</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/" className="menu-link px-4 py-2 text-sm font-medium text-theme-primary hover:text-crimson-500 transition-colors flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Link>
              
              <button 
                onClick={() => setToolsMenuOpen(!toolsMenuOpen)}
                onMouseEnter={() => setToolsMenuOpen(true)}
                className="menu-link px-4 py-2 text-sm font-medium text-theme-primary hover:text-crimson-500 transition-colors flex items-center gap-1"
              >
                <Zap className="w-4 h-4" />
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${toolsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <Link href="/prompts" className="menu-link px-4 py-2 text-sm font-medium text-theme-primary hover:text-crimson-500 transition-colors flex items-center gap-2">
                <Bot className="w-4 h-4" />
                AI Prompts
              </Link>
              
              
              
              
            </nav>

            {/* Right Side - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="relative group">
                <div className="flex items-center gap-2 px-4 py-2 glass-card border border-theme rounded-lg w-64 hover:border-crimson-500 transition-all cursor-pointer">
                  <Search className="w-4 h-4 text-theme-secondary group-hover:text-crimson-500 transition-colors" />
                  <span className="text-sm text-theme-secondary flex-1">Search tools...</span>
                  <kbd className="px-2 py-0.5 text-xs bg-theme-secondary text-theme-primary rounded border border-theme">âŒ˜K</kbd>
                </div>
              </div>

              <button className="p-2 rounded-lg hover:bg-theme-secondary transition-colors group">
                <Heart className="w-5 h-5 text-theme-secondary group-hover:text-crimson-500 icon-hover" />
              </button>

              <ThemeToggle />

              <Link href="/sign-in">
                <Button variant="ghost" className="text-theme-primary hover:text-crimson-500">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="btn-primary border-0">
                  Sign Up
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <button 
                className="text-theme-primary p-2 rounded-lg hover:bg-theme-secondary transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP MEGA MENU */}
        {toolsMenuOpen && (
          <div 
            className="hidden lg:block absolute top-full left-0 right-0 z-40 animate-fade-in-down"
            onMouseEnter={() => setToolsMenuOpen(true)}
            onMouseLeave={() => setToolsMenuOpen(false)}
          >
            <div className="container mx-auto px-4 pt-2">
              <div className="max-w-5xl mx-auto mega-menu-solid rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {toolCategories.map((category, idx) => (
                      <div key={idx} className="space-y-3">
                        <h3 className="text-xs font-bold text-crimson-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="w-8 h-px bg-crimson-500"></span>
                          {category.title}
                        </h3>
                        {category.items.map((item, i) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={i}
                              href={item.href}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-theme-secondary group transition-all"
                            >
                              <div className={item.bg + ' category-icon-box p-2 rounded-lg'}>
                                <Icon className={item.color + ' w-5 h-5'} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-theme-primary group-hover:text-crimson-500 transition-colors">
                                    {item.name}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-crimson-500/20 text-crimson-500 font-semibold">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                {item.count > 0 && (
                                  <p className="text-xs text-theme-muted">{item.count} tools</p>
                                )}
                              </div>
                              <ArrowRight className="w-4 h-4 text-theme-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </Link>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-theme flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-sm text-theme-secondary">
                        <Sparkles className="w-4 h-4 text-crimson-500" />
                        <span className="font-medium">200+ Free Tools</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-theme-secondary">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">100% Free Forever</span>
                      </div>
                    </div>
                    <Link href="/tools">
                      <Button size="sm" className="btn-primary border-0">
                        View All Tools
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for Desktop Mega Menu */}
      {toolsMenuOpen && (
        <div 
          className="hidden lg:block fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setToolsMenuOpen(false)}
        ></div>
      )}

      {/* ============================================ */}
      {/* MOBILE DRAWER - Right Side Slide */}
      {/* ============================================ */}
      
      {/* Backdrop */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <aside 
        className={`lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-theme-card z-[70] shadow-2xl overflow-y-auto transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="sticky top-0 bg-theme-card border-b border-theme z-10 px-4 py-4 flex items-center justify-between">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-crimson flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-theme-primary leading-tight">AI Productivity</h2>
              <p className="text-[10px] text-theme-secondary leading-tight">Ecosystem</p>
            </div>
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-theme-secondary transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-theme-primary" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4 space-y-1">
          {/* Search Bar */}
          <div className="flex items-center gap-2 px-3 py-2 glass-card border border-theme rounded-lg mb-4">
            <Search className="w-4 h-4 text-theme-secondary" />
            <input
              type="text"
              placeholder="Search tools..."
              className="bg-transparent border-none outline-none text-sm text-theme-primary placeholder-theme-secondary flex-1"
            />
          </div>

          {/* Home */}
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-3 text-theme-primary hover:text-crimson-500 hover:bg-theme-secondary rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </Link>

          {/* Tools with Expand */}
          <div>
            <button 
              onClick={() => setMobileToolsExpanded(!mobileToolsExpanded)}
              className="w-full flex items-center gap-3 px-3 py-3 text-theme-primary hover:text-crimson-500 hover:bg-theme-secondary rounded-lg transition-colors"
            >
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium flex-1 text-left">Tools</span>
              <span className="text-[10px] px-2 py-0.5 bg-crimson-500/10 text-crimson-500 rounded-full font-semibold">200+</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileToolsExpanded ? 'rotate-180' : ''}`} />
            </button>

            {/* Expanded Tool Categories */}
            {mobileToolsExpanded && (
              <div className="mt-2 ml-2 pl-3 border-l-2 border-crimson-500/20 space-y-3 animate-fade-in-down">
                {toolCategories.map((category, idx) => (
                  <div key={idx}>
                    <h4 className="text-[10px] font-bold text-crimson-500 uppercase tracking-wider mb-1.5 px-2">
                      {category.title}
                    </h4>
                    <div className="space-y-0.5">
                      {category.items.map((item, i) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={i}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-theme-secondary transition-colors group"
                          >
                            <div className={item.bg + ' p-1.5 rounded-md'}>
                              <Icon className={item.color + ' w-4 h-4'} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-medium text-theme-primary group-hover:text-crimson-500 transition-colors truncate">
                                  {item.name}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-crimson-500/20 text-crimson-500 font-semibold flex-shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {item.count > 0 && (
                                <p className="text-[10px] text-theme-muted">{item.count} tools</p>
                              )}
                            </div>
                            <ChevronRight className="w-3 h-3 text-theme-muted" />
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {/* View All Tools */}
                <Link 
                  href="/tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block mt-2 mx-2 text-center py-2 bg-gradient-to-r from-crimson-500/10 to-pink-500/10 text-crimson-500 text-xs font-semibold rounded-lg hover:bg-crimson-500/20 transition-colors"
                >
                  View All 200+ Tools â†’
                </Link>
              </div>
            )}
          </div>

          {/* AI Prompts */}
          <Link 
            href="/prompts"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-3 text-theme-primary hover:text-crimson-500 hover:bg-theme-secondary rounded-lg transition-colors"
          >
            <Bot className="w-5 h-5" />
            <span className="text-sm font-medium flex-1">AI Prompts</span>
            <span className="text-[10px] px-2 py-0.5 bg-crimson-500/10 text-crimson-500 rounded-full font-semibold">500+</span>
          </Link>

          {/* Blog */}
          

          {/* Pricing */}
          

          {/* Divider */}
          <div className="my-4 border-t border-theme"></div>

          {/* Favorites */}
          <button className="w-full flex items-center gap-3 px-3 py-3 text-theme-primary hover:text-crimson-500 hover:bg-theme-secondary rounded-lg transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">Favorites</span>
          </button>

          {/* Auth Buttons */}
          <div className="pt-4 space-y-2">
            <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button variant="outline" className="w-full">Sign In</Button>
            </Link>
            <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button className="w-full btn-primary border-0">
                Sign Up
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Featured Badge */}
          <div className="mt-6 p-4 rounded-xl badge-glow">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-crimson-500" />
              <span className="text-sm font-bold text-theme-primary">200+ Free Tools</span>
            </div>
            <p className="text-xs text-theme-secondary">
              No signup required. All tools work in your browser.
            </p>
          </div>

          {/* Bottom Spacing */}
          <div className="h-4"></div>
        </div>
      </aside>
    </>
  )
}

export default Header
import Link from "next/link"
import { Sparkles, Twitter, Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-theme-primary border-t border-theme mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 gradient-crimson rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-10 h-10 rounded-lg gradient-crimson flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-theme-primary leading-tight">AI Productivity</h3>
                <p className="text-xs text-theme-secondary leading-tight">Ecosystem</p>
              </div>
            </Link>
            <p className="text-sm text-theme-secondary mb-4 max-w-xs">
              200+ Free Online Tools & AI Prompts in One Place. Boost your productivity today.
            </p>
            <div className="flex gap-3">
              <a href="https://twitter.com/aiproductivity" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-theme-secondary hover:bg-crimson-500/10 text-theme-secondary hover:text-crimson-500 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/aiproductivity" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-theme-secondary hover:bg-crimson-500/10 text-theme-secondary hover:text-crimson-500 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/aiproductivity" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-theme-secondary hover:bg-crimson-500/10 text-theme-secondary hover:text-crimson-500 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/company/aiproductivity" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-theme-secondary hover:bg-crimson-500/10 text-theme-secondary hover:text-crimson-500 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-theme-primary text-sm mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="text-theme-secondary hover:text-crimson-500 transition-colors">All Tools</Link></li>
              <li><Link href="/prompts" className="text-theme-secondary hover:text-crimson-500 transition-colors">AI Prompts</Link></li>
              <li></li>
              <li></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-theme-primary text-sm mb-3">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/pdf" className="text-theme-secondary hover:text-crimson-500 transition-colors">PDF Tools</Link></li>
              <li><Link href="/tools/image" className="text-theme-secondary hover:text-crimson-500 transition-colors">Image Tools</Link></li>
              <li><Link href="/tools/text" className="text-theme-secondary hover:text-crimson-500 transition-colors">Text Tools</Link></li>
              <li><Link href="/tools/developer" className="text-theme-secondary hover:text-crimson-500 transition-colors">Developer Tools</Link></li>
              <li><Link href="/tools/calculators" className="text-theme-secondary hover:text-crimson-500 transition-colors">Calculators</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-theme-primary text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-theme-secondary hover:text-crimson-500 transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-theme-secondary hover:text-crimson-500 transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-theme-secondary hover:text-crimson-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-theme-secondary hover:text-crimson-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-theme flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-theme-secondary">
            © {new Date().getFullYear()} AI Productivity Ecosystem. All rights reserved.
          </p>
          <p className="text-xs text-theme-secondary flex items-center gap-1">
            Made with <Heart className="w-3 h-3 fill-crimson-500 text-crimson-500" /> for productivity
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
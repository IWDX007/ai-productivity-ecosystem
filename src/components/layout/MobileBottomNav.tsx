'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Zap, 
  Bot, 
  User, 
  LayoutDashboard,
  BookOpen
} from 'lucide-react'

export function MobileBottomNav() {
  const pathname = usePathname()
  
  // Check if we're on dashboard page
  const isDashboardPage = pathname?.startsWith('/dashboard')

  // 5 items with center as elevated
  const navItems = [
    { name: 'Tools', icon: Zap, href: '/tools' },
    { name: 'AI', icon: Bot, href: '/prompts' },
    // Center item - dynamic
    isDashboardPage 
      ? { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', isCenter: true }
      : { name: 'Home', icon: Home, href: '/', isCenter: true },
    { name: 'Blog', icon: BookOpen, href: '/blog' },
    { name: 'Profile', icon: User, href: '/dashboard' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-theme-card border-t border-theme shadow-2xl">
      <div className="grid grid-cols-5 items-end px-2 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          // Center elevated item
          if (item.isCenter) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-end -mt-8"
              >
                <div className="w-14 h-14 rounded-full gradient-crimson shadow-lg shadow-crimson-500/50 flex items-center justify-center animate-glow">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className={`text-[10px] text-center mt-1 font-medium ${
                  isActive ? 'text-crimson-500' : 'text-theme-secondary'
                }`}>
                  {item.name}
                </p>
              </Link>
            )
          }

          // Regular items
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-1 py-2 transition-all"
            >
              <div className={`p-1.5 rounded-lg transition-all ${
                isActive 
                  ? 'bg-crimson-500/10' 
                  : ''
              }`}>
                <Icon className={`w-5 h-5 transition-colors ${
                  isActive 
                    ? 'text-crimson-500' 
                    : 'text-theme-secondary'
                }`} />
              </div>
              <p className={`text-[10px] font-medium transition-colors ${
                isActive 
                  ? 'text-crimson-500' 
                  : 'text-theme-secondary'
              }`}>
                {item.name}
              </p>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
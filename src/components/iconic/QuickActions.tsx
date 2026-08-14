'use client'

import Link from 'next/link'
import { 
  FileText, 
  Image as ImageIcon, 
  Type, 
  Code, 
  Calculator, 
  Ruler, 
  Lock, 
  QrCode 
} from 'lucide-react'

export function QuickActions() {
  const actions = [
    { name: 'PDF', icon: FileText, color: 'text-red-500', bg: 'bg-red-500/10', href: '/tools/pdf' },
    { name: 'Image', icon: ImageIcon, color: 'text-orange-500', bg: 'bg-orange-500/10', href: '/tools/image' },
    { name: 'Text', icon: Type, color: 'text-yellow-500', bg: 'bg-yellow-500/10', href: '/tools/text' },
    { name: 'Code', icon: Code, color: 'text-green-500', bg: 'bg-green-500/10', href: '/tools/developer' },
    { name: 'Calc', icon: Calculator, color: 'text-blue-500', bg: 'bg-blue-500/10', href: '/tools/calculators' },
    { name: 'Convert', icon: Ruler, color: 'text-purple-500', bg: 'bg-purple-500/10', href: '/tools/converters' },
    { name: 'Security', icon: Lock, color: 'text-pink-500', bg: 'bg-pink-500/10', href: '/tools/security' },
    { name: 'QR Code', icon: QrCode, color: 'text-cyan-500', bg: 'bg-cyan-500/10', href: '/tools/qr-barcode' },
  ]

  return (
    <div className="glass-card p-6 rounded-2xl border border-theme">
      <h3 className="text-lg font-bold text-theme-primary mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action, idx) => {
          const Icon = action.icon
          return (
            <Link
              key={idx}
              href={action.href}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-theme-secondary transition-all group"
            >
              <div className={action.bg + ' w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'}>
                <Icon className={action.color + ' w-6 h-6'} />
              </div>
              <span className="text-xs font-medium text-theme-primary group-hover:text-crimson-500 transition-colors">
                {action.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
'use client'

import { LucideIcon, TrendingUp, TrendingDown, Info } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

export function StatsCard({ title, value, change, trend, icon: Icon, iconColor, iconBg }: StatsCardProps) {
  return (
    <div className="glass-card p-5 rounded-2xl border border-theme card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className={iconBg + ' w-12 h-12 rounded-xl flex items-center justify-center'}>
          <Icon className={iconColor + ' w-6 h-6'} />
        </div>
        <button className="text-theme-muted hover:text-theme-primary transition-colors">
          <Info className="w-4 h-4" />
        </button>
      </div>
      
      <div>
        <p className="text-sm text-theme-secondary mb-1">{title}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-theme-primary">{value}</h3>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend === 'up' ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {change}
          </div>
        </div>
        <p className="text-xs text-theme-muted mt-1">vs. last month</p>
      </div>
    </div>
  )
}
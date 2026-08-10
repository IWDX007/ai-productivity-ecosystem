'use client'

import { 
  FileText, 
  Image as ImageIcon, 
  Code, 
  Calculator,
  Clock,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export function RecentActivity() {
  const activities = [
    { name: 'PDF Merged', category: 'PDF Tools', time: '2 hours ago', icon: FileText, color: 'text-red-500', bg: 'bg-red-500/10' },
    { name: 'Image Compressed', category: 'Image Tools', time: '5 hours ago', icon: ImageIcon, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { name: 'JSON Formatted', category: 'Developer', time: '1 day ago', icon: Code, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'BMI Calculated', category: 'Calculator', time: '2 days ago', icon: Calculator, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ]

  return (
    <div className="glass-card p-6 rounded-2xl border border-theme">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-theme-primary">Recent Activity</h3>
          <p className="text-sm text-theme-secondary">Your latest tool usage</p>
        </div>
        <Link href="/dashboard/history" className="text-sm text-crimson-500 hover:text-crimson-600 flex items-center gap-1">
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity, idx) => {
          const Icon = activity.icon
          return (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-theme-secondary transition-all group cursor-pointer">
              <div className={activity.bg + ' w-10 h-10 rounded-lg flex items-center justify-center'}>
                <Icon className={activity.color + ' w-5 h-5'} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-theme-primary group-hover:text-crimson-500 transition-colors">
                  {activity.name}
                </p>
                <p className="text-xs text-theme-muted">{activity.category}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-theme-muted">
                <Clock className="w-3 h-3" />
                {activity.time}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
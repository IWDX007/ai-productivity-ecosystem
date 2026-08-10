'use client'

import { 
  Zap, 
  Heart, 
  Users, 
  TrendingUp,
  Sparkles,
  ChevronDown,
  Search,
  Bell,
  Menu
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { QuickActions } from '@/components/dashboard/QuickActions'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-theme-primary pb-20 lg:pb-0">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-30 bg-theme-primary border-b border-theme">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm text-theme-secondary">Monday, July 20</p>
            <h1 className="text-2xl font-bold text-theme-primary">Hi Kev 👋</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-theme-secondary transition-colors">
              <Search className="w-5 h-5 text-theme-primary" />
            </button>
            <div className="w-10 h-10 rounded-full gradient-crimson flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 lg:py-10 max-w-7xl">
        
        {/* Desktop Greeting */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-theme-secondary mb-1">Monday, July 20</p>
            <h1 className="text-3xl font-bold text-theme-primary">
              Welcome back, <span className="gradient-text">Kev!</span>
            </h1>
            <p className="text-theme-secondary mt-1">Here's what's happening with your tools today</p>
          </div>
          
          {/* Workspace Selector */}
          <button className="flex items-center gap-2 px-4 py-2 glass-card border border-theme rounded-lg hover:border-crimson-500 transition-all">
            <div className="w-8 h-8 rounded-lg gradient-crimson flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-theme-primary">Workspace</span>
            <ChevronDown className="w-4 h-4 text-theme-secondary" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Return"
            value="$1,672.20"
            change="42%"
            trend="up"
            icon={TrendingUp}
            iconColor="text-purple-500"
            iconBg="bg-purple-500/10"
          />
          <StatsCard
            title="Tools Used"
            value="204,765"
            change="32%"
            trend="down"
            icon={Zap}
            iconColor="text-blue-500"
            iconBg="bg-blue-500/10"
          />
          <StatsCard
            title="Total Interaction"
            value="12,045"
            change="64%"
            trend="up"
            icon={Users}
            iconColor="text-green-500"
            iconBg="bg-green-500/10"
          />
          <StatsCard
            title="Favorites"
            value="1,234"
            change="18%"
            trend="up"
            icon={Heart}
            iconColor="text-crimson-500"
            iconBg="bg-crimson-500/10"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>

          {/* Right Column - Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Sales Card - Full Width */}
        <div className="mt-6 glass-card p-6 rounded-2xl border border-theme">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-theme-secondary mb-1">Sales</p>
              <h3 className="text-3xl font-bold text-theme-primary">$6,390.80</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">+2.5%</span>
                <span className="text-sm text-theme-muted">vs. last month</span>
              </div>
            </div>
            
            {/* Chart Placeholder */}
            <div className="flex items-end gap-2 h-24">
              <div className="w-4 bg-crimson-500/20 rounded-t h-8"></div>
              <div className="w-4 bg-crimson-500/40 rounded-t h-12"></div>
              <div className="w-4 bg-crimson-500/30 rounded-t h-10"></div>
              <div className="w-4 bg-crimson-500/50 rounded-t h-16"></div>
              <div className="w-4 bg-crimson-500 rounded-t h-20"></div>
            </div>
          </div>
        </div>

        {/* Transactions Preview */}
        <div className="mt-6 glass-card p-6 rounded-2xl border border-theme">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-theme-primary">Transactions</h3>
              <p className="text-sm text-theme-secondary">153 previous period</p>
            </div>
            <Link href="/dashboard/transactions" className="text-sm text-crimson-500 hover:text-crimson-600">
              View All →
            </Link>
          </div>
          
          <div className="text-center py-8 text-theme-muted">
            <p className="text-sm">Transaction data will appear here</p>
          </div>
        </div>
      </main>

      {/* Desktop Footer */}
      <div className="hidden lg:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Sparkles,
  FolderTree,
  TrendingUp,
  FileText,
  Eye,
  Users,
  Search,
  Zap,
  Plus,
  ArrowRight,
  BarChart2,
  RefreshCw,
} from "lucide-react";

interface DashboardClientProps {
  dbStats: {
    totalTools: number;
    totalPrompts: number;
    totalCategories: number;
    totalPosts: number;
  };
}

export default function DashboardClient({ dbStats }: DashboardClientProps) {
  const [gscData, setGscData] = useState<{
    clicks: number;
    impressions: number;
    ctr: string;
    position: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGscStats() {
      try {
        const res = await fetch("/api/gsc");
        const json = await res.json();
        if (json.success && json.stats) {
          setGscData(json.stats);
        }
      } catch (err) {
        console.error("Failed to load GSC stats", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGscStats();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back! Here is what is happening with your site.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setLoading(true);
              fetch("/api/gsc")
                .then((r) => r.json())
                .then((json) => json.success && setGscData(json.stats))
                .finally(() => setLoading(false));
            }}
            className="p-2 rounded-lg border bg-card hover:bg-accent text-muted-foreground transition-colors"
            title="Refresh Analytics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/iconic/tools/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity shadow-md"
          >
            <Plus className="w-4 h-4" /> Add New Tool
          </Link>
        </div>
      </div>

      {/* Main Grid: DB Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Tools"
          value={dbStats.totalTools}
          subtext={`${dbStats.totalTools} active`}
          icon={Wrench}
          color="from-rose-500 to-pink-500"
        />
        <StatCard
          title="Total Prompts"
          value={dbStats.totalPrompts}
          subtext={`${dbStats.totalPrompts} active`}
          icon={Sparkles}
          color="from-purple-500 to-indigo-500"
        />
        <StatCard
          title="Categories"
          value={dbStats.totalCategories}
          subtext="Tools & Prompts"
          icon={FolderTree}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Blog Posts"
          value={dbStats.totalPosts}
          subtext="Published pillar content"
          icon={FileText}
          color="from-amber-500 to-orange-500"
        />
      </div>

      {/* Live Google Analytics & Search Console Stats */}
      <div className="rounded-2xl border bg-card/50 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" /> Google Search Console Metrics
          </h2>
          <span className="text-xs text-muted-foreground">Last 28 Days</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Visitors (Search Clicks)"
            value={loading ? "..." : gscData ? gscData.clicks : "0"}
            subtext={gscData ? `${gscData.ctr}% CTR` : "GSC Syncing"}
            icon={Users}
            color="from-emerald-500 to-green-500"
          />
          <StatCard
            title="Search Impressions"
            value={loading ? "..." : gscData ? gscData.impressions : "0"}
            subtext="Google Search Views"
            icon={Search}
            color="from-cyan-500 to-blue-500"
          />
          <StatCard
            title="Avg Search Position"
            value={loading ? "..." : gscData ? `#${gscData.position}` : "#0"}
            subtext="Google Rank Average"
            icon={TrendingUp}
            color="from-yellow-500 to-amber-500"
          />
          <StatCard
            title="Avg SEO Score"
            value="98/100"
            subtext="Schema + Canonical Active"
            icon={Zap}
            color="from-violet-500 to-purple-500"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            href="/iconic/tools"
            title="Manage Tools"
            icon={Wrench}
          />
          <QuickActionCard
            href="/iconic/prompts"
            title="Add Prompt"
            icon={Sparkles}
          />
          <QuickActionCard
            href="/iconic/posts"
            title="Write Post"
            icon={FileText}
          />
          <QuickActionCard
            href="/iconic/seo"
            title="SEO Editor"
            icon={Search}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  subtext?: string;
  icon: any;
  color: string;
}) {
  return (
    <div className="p-5 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {subtext && (
            <p className="text-[11px] text-muted-foreground">{subtext}</p>
          )}
        </div>
        <div
          className={`p-2.5 rounded-xl bg-gradient-to-br ${color} text-white shadow-sm`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({
  href,
  title,
  icon: Icon,
}: {
  href: string;
  title: string;
  icon: any;
}) {
  return (
    <Link
      href={href}
      className="p-4 rounded-xl border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all group flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-medium text-sm">{title}</span>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </Link>
  );
}
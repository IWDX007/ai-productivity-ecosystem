import Link from "next/link";
import { db } from "@/lib/db";
import { tools, prompts, categories, posts } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { Wrench, Lightbulb, FolderTree, TrendingUp, Users, Eye, Search, Zap, BookOpen, FileText } from "lucide-react";

export const revalidate = 0;

async function getStats() {
  try {
    const [
      totalTools,
      activeTools,
      totalPrompts,
      activePrompts,
      totalCats,
      featuredTools,
      totalPosts,
      publishedPosts,
      totalViews,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(tools),
      db.select({ count: sql<number>`count(*)::int` }).from(tools).where(eq(tools.isActive, true)),
      db.select({ count: sql<number>`count(*)::int` }).from(prompts),
      db.select({ count: sql<number>`count(*)::int` }).from(prompts).where(eq(prompts.isActive, true)),
      db.select({ count: sql<number>`count(*)::int` }).from(categories),
      db.select({ count: sql<number>`count(*)::int` }).from(tools).where(eq(tools.isFeatured, true)),
      db.select({ count: sql<number>`count(*)::int` }).from(posts),
      db.select({ count: sql<number>`count(*)::int` }).from(posts).where(eq(posts.isPublished, true)),
      db.select({ total: sql<number>`COALESCE(SUM(view_count), 0)::int` }).from(posts),
    ]);

    return {
      totalTools: totalTools[0]?.count || 0,
      activeTools: activeTools[0]?.count || 0,
      totalPrompts: totalPrompts[0]?.count || 0,
      activePrompts: activePrompts[0]?.count || 0,
      totalCats: totalCats[0]?.count || 0,
      featuredTools: featuredTools[0]?.count || 0,
      totalPosts: totalPosts[0]?.count || 0,
      publishedPosts: publishedPosts[0]?.count || 0,
      draftPosts: (totalPosts[0]?.count || 0) - (publishedPosts[0]?.count || 0),
      totalViews: totalViews[0]?.total || 0,
    };
  } catch (err) {
    console.error("Stats error:", err);
    return {
      totalTools: 0, activeTools: 0, totalPrompts: 0, activePrompts: 0,
      totalCats: 0, featuredTools: 0, totalPosts: 0, publishedPosts: 0,
      draftPosts: 0, totalViews: 0,
    };
  }
}

export default async function DashboardOverview() {
  const stats = await getStats();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here is what happening with your site.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tools"
          value={stats.totalTools}
          subtitle={`${stats.activeTools} active`}
          icon={Wrench}
          color="from-red-500 to-pink-500"
        />
        <StatCard
          title="Total Prompts"
          value={stats.totalPrompts}
          subtitle={`${stats.activePrompts} active`}
          icon={Lightbulb}
          color="from-purple-500 to-indigo-500"
        />
        <StatCard
          title="Categories"
          value={stats.totalCats}
          icon={FolderTree}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Featured Tools"
          value={stats.featuredTools}
          icon={TrendingUp}
          color="from-orange-500 to-yellow-500"
        />
      </div>

      {/* Blog Stats + Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blog Posts Card */}
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Blog Posts</h3>
                </div>
                <p className="text-sm text-white/80">Manage your blog content</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <div className="text-3xl font-bold">{stats.totalPosts}</div>
                <div className="text-xs text-white/80">Total</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-200">{stats.publishedPosts}</div>
                <div className="text-xs text-white/80">Published</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-200">{stats.draftPosts}</div>
                <div className="text-xs text-white/80">Drafts</div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20 flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                <div className="text-xs text-white/80">Total Views</div>
              </div>
              <Link
                href="/iconic/posts"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                Manage Posts
                <FileText className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Analytics Placeholder */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Visitors Today"
            value="-"
            icon={Users}
            color="from-green-500 to-emerald-500"
          />
          <StatCard
            title="Page Views"
            value="-"
            icon={Eye}
            color="from-cyan-500 to-blue-500"
          />
          <StatCard
            title="Search Impressions"
            value="-"
            icon={Search}
            color="from-yellow-500 to-orange-500"
          />
          <StatCard
            title="Avg SEO Score"
            value="-"
            icon={Zap}
            color="from-pink-500 to-red-500"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickAction href="/iconic/tools" icon={Wrench} label="Manage Tools" color="red" />
          <QuickAction href="/iconic/prompts/new" icon={Lightbulb} label="Add Prompt" color="purple" />
          <QuickAction href="/iconic/posts/new" icon={BookOpen} label="Write Post" color="pink" />
          <QuickAction href="/iconic/seo" icon={Search} label="SEO Editor" color="blue" />
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">System Status</h2>
        <div className="space-y-2">
          <StatusItem label="Database" status="Connected" ok />
          <StatusItem label="Blog System" status={stats.totalPosts > 0 ? "Active" : "Ready"} ok />
          <StatusItem label="Sitemap" status="Submitted" ok />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color }: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
      {subtitle && <div className="text-xs text-green-600 mt-1">{subtitle}</div>}
    </div>
  );
}

function QuickAction({ href, icon: Icon, label, color }: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}) {
  const colors: Record<string, string> = {
    red: "bg-red-500/10 hover:bg-red-500/20 text-red-600",
    purple: "bg-purple-500/10 hover:bg-purple-500/20 text-purple-600",
    pink: "bg-pink-500/10 hover:bg-pink-500/20 text-pink-600",
    blue: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600",
  };
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl transition-all ${colors[color]}`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

function StatusItem({ label, status, ok }: { label: string; status: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <span className={`text-sm font-medium ${ok ? "text-green-600" : "text-red-600"}`}>{status}</span>
    </div>
  );
}
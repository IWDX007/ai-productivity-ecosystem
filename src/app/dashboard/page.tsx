import { db } from "@/lib/db";
import { tools, prompts, categories } from "@/lib/db/schema";
import { StatCard } from "@/components/dashboard/StatCard";
import { Wrench, Lightbulb, FolderTree, TrendingUp, Users, Eye, Search, Zap, BarChart3 } from "lucide-react";

export default async function DashboardPage() {
  const [toolsList, promptsList, categoriesList] = await Promise.all([
    db.select().from(tools),
    db.select().from(prompts),
    db.select().from(categories),
  ]);

  const activeTools = toolsList.filter(t => t.isActive).length;
  const activePrompts = promptsList.filter(p => p.isActive).length;
  const featuredTools = toolsList.filter(t => t.isFeatured).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here is what happening with your site.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Tools" value={toolsList.length} icon={Wrench} color="bg-gradient-to-br from-red-500 to-pink-600" change={`${activeTools} active`} />
        <StatCard title="Total Prompts" value={promptsList.length} icon={Lightbulb} color="bg-gradient-to-br from-purple-500 to-indigo-600" change={`${activePrompts} active`} />
        <StatCard title="Categories" value={categoriesList.length} icon={FolderTree} color="bg-gradient-to-br from-blue-500 to-cyan-600" />
        <StatCard title="Featured Tools" value={featuredTools} icon={TrendingUp} color="bg-gradient-to-br from-orange-500 to-red-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Visitors Today" value="-" icon={Users} color="bg-gradient-to-br from-green-500 to-emerald-600" />
        <StatCard title="Page Views" value="-" icon={Eye} color="bg-gradient-to-br from-cyan-500 to-blue-600" />
        <StatCard title="Search Impressions" value="-" icon={Search} color="bg-gradient-to-br from-yellow-500 to-orange-600" />
        <StatCard title="Avg SEO Score" value="-" icon={Zap} color="bg-gradient-to-br from-pink-500 to-rose-600" />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/dashboard/tools" className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
            <Wrench className="w-6 h-6 mx-auto mb-2 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Manage Tools</span>
          </a>
          <a href="/dashboard/prompts" className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <Lightbulb className="w-6 h-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Add Prompt</span>
          </a>
          <a href="/dashboard/seo" className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Search className="w-6 h-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">SEO Editor</span>
          </a>
          <a href="/dashboard/analytics" className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <BarChart3 className="w-6 h-6 mx-auto mb-2 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Analytics</span>
          </a>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-700 dark:text-gray-300">Database</span>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">Connected</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-700 dark:text-gray-300">Total Records</span>
            <span className="text-xs font-semibold text-gray-900 dark:text-white">{toolsList.length + promptsList.length + categoriesList.length}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-700 dark:text-gray-300">Site Status</span>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
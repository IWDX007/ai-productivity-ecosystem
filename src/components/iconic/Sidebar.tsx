"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wrench, FolderTree, Lightbulb, Search, BarChart3, Settings, FileText } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/iconic", icon: LayoutDashboard },
  { name: "Tools", href: "/iconic/tools", icon: Wrench },
  { name: "Categories", href: "/iconic/categories", icon: FolderTree },
  { name: "Prompts", href: "/iconic/prompts", icon: Lightbulb },
  { name: "SEO Editor", href: "/iconic/seo", icon: Search },
  { name: "Analytics", href: "/iconic/analytics", icon: BarChart3 },
  { name: "Pages", href: "/iconic/pages", icon: FileText },
  { name: "Settings", href: "/iconic/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <Link href="/iconic" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="font-bold text-gray-900 dark:text-white">Admin Panel</span>
        </Link>
      </div>
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"}`}>
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 mt-4 border-t border-gray-200 dark:border-gray-800">
        <Link href="/" className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          Back to Website
        </Link>
      </div>
    </aside>
  );
}
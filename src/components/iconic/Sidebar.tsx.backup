"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Wrench, FolderTree, Lightbulb, Search, BarChart3, Settings, FileText, Menu, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button - Only on mobile, only when closed */}
      {isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-gray-900 dark:text-white" />
        </button>
      )}
      
      {/* Overlay - Only on mobile when open */}
      {isMobile && isOpen && (
        <div 
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/60 z-40"
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64
          bg-white dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-800 
          flex flex-col z-50
          transition-transform duration-300 ease-in-out
          ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        `}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <Link href="/iconic" className="flex items-center gap-2" onClick={closeSidebar}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white whitespace-nowrap">Admin Panel</span>
          </Link>
          
          {/* Close button - Only on mobile */}
          {isMobile && (
            <button 
              onClick={closeSidebar}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>
          )}
        </div>
        
        <nav className="p-4 space-y-1 overflow-y-auto flex-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive 
                    ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" 
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link 
            href="/" 
            onClick={closeSidebar}
            className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 whitespace-nowrap"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>
    </>
  );
}
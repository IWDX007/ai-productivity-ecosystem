"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, Search, LogOut, User, Home, Settings } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import ThemeToggle from "@/components/ui/ThemeToggle/ThemeToggle";

export function DashboardHeader() {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userInitial = user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "U";
  const userName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "User";
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 lg:px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md ml-12 lg:ml-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 hover:scale-105 transition-transform"
              aria-label="User menu"
            >
              {userInitial}
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden z-50">
                {/* User Info */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {userInitial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white truncate">{userName}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 truncate">{userEmail}</div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <Link
                    href="/iconic/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    Back to Website
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-800"></div>

                {/* Sign Out */}
                <div className="p-2">
                  <SignOutButton redirectUrl="/">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
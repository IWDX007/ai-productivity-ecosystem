"use client";
import { Bell, Search } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 lg:px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md ml-12 lg:ml-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white" />
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">U</div>
        </div>
      </div>
    </header>
  );
}
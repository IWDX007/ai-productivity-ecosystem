"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Search, Edit, Trash2, Star, Plus, Filter } from "lucide-react";
import { toggleToolStatus, toggleToolFeatured, deleteTool } from "./actions";

interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  categorySlug: string;
  isActive: boolean | null;
  isFeatured: boolean | null;
  seoScore: number | null;
}

interface Props {
  initialTools: Tool[];
  categories: { slug: string; name: string }[];
}

export function ToolsTable({ initialTools, categories }: Props) {
  const [tools, setTools] = useState(initialTools);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const perPage = 25;

  const filtered = tools.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                        t.slug.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || t.categorySlug === categoryFilter;
    const matchStatus = statusFilter === "all" || 
                        (statusFilter === "active" && t.isActive) ||
                        (statusFilter === "inactive" && !t.isActive) ||
                        (statusFilter === "featured" && t.isFeatured);
    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginatedTools = filtered.slice((page - 1) * perPage, page * perPage);

  const handleToggleActive = (id: number, current: boolean) => {
    startTransition(async () => {
      await toggleToolStatus(id, !current);
      setTools(tools.map(t => t.id === id ? { ...t, isActive: !current } : t));
    });
  };

  const handleToggleFeatured = (id: number, current: boolean) => {
    startTransition(async () => {
      await toggleToolFeatured(id, !current);
      setTools(tools.map(t => t.id === id ? { ...t, isFeatured: !current } : t));
    });
  };

  const handleDelete = (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteTool(id);
      setTools(tools.filter(t => t.id !== id));
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools by name or slug..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
            <option value="featured">Featured Only</option>
          </select>

          <Link
            href="/dashboard/tools/new"
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Tool
          </Link>
        </div>

        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Showing {paginatedTools.length} of {filtered.length} tools (Total: {tools.length})
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Tool</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Category</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Featured</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">SEO</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {paginatedTools.map((tool) => (
                <tr key={tool.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">{tool.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">/{tool.slug}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">
                      {tool.categorySlug}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggleActive(tool.id, tool.isActive ?? false)}
                      disabled={isPending}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        tool.isActive ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        tool.isActive ? "translate-x-6" : "translate-x-1"
                      }`} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggleFeatured(tool.id, tool.isFeatured ?? false)}
                      disabled={isPending}
                      className="inline-flex items-center justify-center"
                    >
                      <Star className={`w-5 h-5 ${
                        tool.isFeatured ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
                      }`} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold ${
                      (tool.seoScore ?? 0) >= 80 ? "text-green-600" :
                      (tool.seoScore ?? 0) >= 50 ? "text-yellow-600" :
                      "text-gray-400"
                    }`}>
                      {tool.seoScore ?? 0}/100
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/tools/${tool.id}/edit`}
                        className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </Link>
                      <button
                        onClick={() => handleDelete(tool.id, tool.name)}
                        disabled={isPending}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No tools found matching your filters.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-800">
            <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded disabled:opacity-50 text-gray-900 dark:text-white"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded disabled:opacity-50 text-gray-900 dark:text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
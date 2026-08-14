import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import Link from "next/link";
import { FileText, Plus, Edit, Trash2, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { deletePage, togglePageStatus } from "./actions";

export const metadata = {
  title: "Pages - Iconic Dashboard",
};

export default async function PagesListPage() {
  const allPages = await db.select().from(pages).orderBy(asc(pages.sortOrder));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-red-600" />
            Pages
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all your website pages ({allPages.length} total)
          </p>
        </div>
        <Link
          href="/iconic/pages/new"
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Page
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Slug</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Footer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Order</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allPages.map((page) => (
                <tr key={page.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900 dark:text-white">{page.title}</div>
                    {page.metaTitle && (
                      <div className="text-xs text-gray-500 truncate max-w-md">{page.metaTitle}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">/{page.slug}</code>
                  </td>
                  <td className="py-3 px-4">
                    <form action={async () => { "use server"; await togglePageStatus(page.id, page.isActive ?? true); }}>
                      <button type="submit" className="flex items-center gap-1">
                        {page.isActive ? (
                          <><CheckCircle className="w-4 h-4 text-green-500" /> <span className="text-sm text-green-600">Active</span></>
                        ) : (
                          <><XCircle className="w-4 h-4 text-gray-400" /> <span className="text-sm text-gray-500">Inactive</span></>
                        )}
                      </button>
                    </form>
                  </td>
                  <td className="py-3 px-4">
                    {page.showInFooter ? (
                      <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded">Yes</span>
                    ) : (
                      <span className="text-xs text-gray-500">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{page.sortOrder}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400"
                        title="View"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <Link
                        href={`/iconic/pages/${page.id}/edit`}
                        className="p-2 text-gray-600 hover:text-green-600 dark:text-gray-400"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={async () => { "use server"; await deletePage(page.id); }}>
                        <button
                          type="submit"
                          className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
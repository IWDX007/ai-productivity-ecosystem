import { db } from "@/lib/db";
import { tools } from "@/lib/db/schema";
import Link from "next/link";
import { Search, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { analyzeSEO } from "@/lib/seo/calculator";

export const dynamic = "force-dynamic";

export default async function SEOOverviewPage() {
  const toolsList = await db.select().from(tools);

  const analyzed = toolsList.map(tool => {
    const analysis = analyzeSEO({
      title: tool.name,
      slug: tool.slug,
      description: tool.description || "",
      metaTitle: tool.metaTitle || "",
      metaDescription: tool.metaDescription || "",
      focusKeyword: tool.focusKeyword || "",
    });
    return { ...tool, analysis };
  });

  const excellent = analyzed.filter(t => t.analysis.score >= 80).length;
  const good = analyzed.filter(t => t.analysis.score >= 60 && t.analysis.score < 80).length;
  const poor = analyzed.filter(t => t.analysis.score < 60).length;
  const avgScore = Math.round(analyzed.reduce((sum, t) => sum + t.analysis.score, 0) / analyzed.length);

  const needsAttention = analyzed
    .filter(t => t.analysis.score < 60)
    .sort((a, b) => a.analysis.score - b.analysis.score)
    .slice(0, 20);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SEO Editor</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Optimize your pages for search engines
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average SEO Score</p>
              <p className={`text-4xl font-bold mt-2 ${
                avgScore >= 80 ? "text-green-600" :
                avgScore >= 60 ? "text-yellow-600" :
                "text-red-600"
              }`}>{avgScore}</p>
              <p className="text-xs text-gray-500 mt-1">Out of 100</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Excellent (80+)</p>
              <p className="text-4xl font-bold mt-2 text-green-600">{excellent}</p>
              <p className="text-xs text-gray-500 mt-1">Pages</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Good (60-79)</p>
              <p className="text-4xl font-bold mt-2 text-yellow-600">{good}</p>
              <p className="text-xs text-gray-500 mt-1">Pages</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Needs Work (0-59)</p>
              <p className="text-4xl font-bold mt-2 text-red-600">{poor}</p>
              <p className="text-xs text-gray-500 mt-1">Pages</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Priority Pages to Fix */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Priority: Pages Needing SEO Fixes</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Top 20 pages with lowest SEO scores
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {needsAttention.map(tool => (
            <Link
              key={tool.id}
              href={`/iconic/seo/tool/${tool.id}`}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm ${
                  tool.analysis.score >= 60 ? "bg-yellow-500" :
                  tool.analysis.score >= 40 ? "bg-orange-500" :
                  "bg-red-500"
                }`}>
                  {tool.analysis.score}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">{tool.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    /{tool.categorySlug}/{tool.slug} • 
                    <span className="text-red-500 ml-1">{tool.analysis.failed} failed</span> • 
                    <span className="text-yellow-500 ml-1">{tool.analysis.warnings} warnings</span>
                  </div>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
                Fix SEO
              </span>
            </Link>
          ))}
        </div>

        {needsAttention.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            All pages have good SEO scores!
          </div>
        )}
      </div>

      {/* All Pages */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">All Tools SEO Status</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Tool</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">SEO Score</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Grade</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Keyword</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {analyzed.slice(0, 50).map(tool => (
                <tr key={tool.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 dark:text-white text-sm">{tool.name}</div>
                    <div className="text-xs text-gray-500">/{tool.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold ${
                      tool.analysis.score >= 80 ? "text-green-600" :
                      tool.analysis.score >= 60 ? "text-yellow-600" :
                      "text-red-600"
                    }`}>{tool.analysis.score}/100</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block w-8 h-8 rounded-full text-white font-bold text-sm leading-8 ${
                      tool.analysis.grade === "A" ? "bg-green-500" :
                      tool.analysis.grade === "B" ? "bg-blue-500" :
                      tool.analysis.grade === "C" ? "bg-yellow-500" :
                      tool.analysis.grade === "D" ? "bg-orange-500" :
                      "bg-red-500"
                    }`}>{tool.analysis.grade}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-gray-600 dark:text-gray-400">
                    {tool.focusKeyword || <span className="text-red-500">Not set</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/iconic/seo/tool/${tool.id}`}
                      className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Search className="w-3 h-3" />
                      Edit SEO
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Showing first 50 of {analyzed.length} tools
        </div>
      </div>
    </div>
  );
}
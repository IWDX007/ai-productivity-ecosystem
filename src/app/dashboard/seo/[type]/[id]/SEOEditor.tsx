"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { analyzeSEO } from "@/lib/seo/calculator";
import { updateToolSEO } from "../../actions";

interface Tool {
  id: number;
  name: string;
  slug: string;
  categorySlug: string;
  description: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  focusKeyword: string | null;
}

export function SEOEditor({ tool }: { tool: Tool }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    metaTitle: tool.metaTitle || "",
    metaDescription: tool.metaDescription || "",
    focusKeyword: tool.focusKeyword || "",
  });

  const analysis = useMemo(() => {
    return analyzeSEO({
      title: tool.name,
      slug: tool.slug,
      description: tool.description || "",
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      focusKeyword: form.focusKeyword,
    });
  }, [form, tool]);

  const handleSave = () => {
    setMessage("");
    startTransition(async () => {
      try {
        await updateToolSEO(tool.id, {
          metaTitle: form.metaTitle,
          metaDescription: form.metaDescription,
          focusKeyword: form.focusKeyword,
          seoScore: analysis.score,
        });
        setMessage("SEO settings saved!");
        setTimeout(() => setMessage(""), 3000);
      } catch (err: any) {
        setMessage(`Error: ${err.message}`);
      }
    });
  };

  const previewTitle = form.metaTitle || tool.name;
  const previewDesc = form.metaDescription || tool.description || "";
  const previewUrl = `ai-productivity-ecosystem-azure.vercel.app/tools/${tool.categorySlug}/${tool.slug}`;

  return (
    <div className="space-y-6">
      <Link href="/dashboard/seo" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        Back to SEO Overview
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Editor (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Focus Keyword */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Focus Keyword
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              The main keyword you want this page to rank for
            </p>
            <input
              type="text"
              value={form.focusKeyword}
              onChange={(e) => setForm({ ...form, focusKeyword: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="e.g., word counter online"
            />
          </div>

          {/* Meta Title */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Meta Title
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              The title that appears in Google search results
            </p>
            <input
              type="text"
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              maxLength={70}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Optimized title for search engines"
            />
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs ${
                form.metaTitle.length >= 30 && form.metaTitle.length <= 60 ? "text-green-600" : "text-yellow-600"
              }`}>
                {form.metaTitle.length}/60 characters (Optimal: 30-60)
              </span>
            </div>
          </div>

          {/* Meta Description */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Meta Description
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              Brief description shown below title in search results
            </p>
            <textarea
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              rows={4}
              maxLength={170}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Compelling description that includes your focus keyword"
            />
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs ${
                form.metaDescription.length >= 120 && form.metaDescription.length <= 160 ? "text-green-600" : "text-yellow-600"
              }`}>
                {form.metaDescription.length}/160 characters (Optimal: 120-160)
              </span>
            </div>
          </div>

          {/* Google Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Google Search Preview
            </h3>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{previewUrl}</div>
              <div className="text-lg text-blue-700 dark:text-blue-400 hover:underline cursor-pointer mb-1">
                {previewTitle}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                {previewDesc || "No description set"}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isPending ? "Saving..." : "Save SEO Settings"}
            </button>
            {message && (
              <span className={`text-sm ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
                {message}
              </span>
            )}
          </div>
        </div>

        {/* Right Column - SEO Score (1/3) */}
        <div className="space-y-6">
          {/* Score Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center sticky top-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">SEO Score</p>
            <div className={`text-6xl font-bold ${
              analysis.score >= 80 ? "text-green-600" :
              analysis.score >= 60 ? "text-yellow-600" :
              "text-red-600"
            }`}>
              {analysis.score}
            </div>
            <div className={`inline-block w-12 h-12 rounded-full text-white font-bold text-2xl leading-[3rem] mt-3 ${
              analysis.grade === "A" ? "bg-green-500" :
              analysis.grade === "B" ? "bg-blue-500" :
              analysis.grade === "C" ? "bg-yellow-500" :
              analysis.grade === "D" ? "bg-orange-500" :
              "bg-red-500"
            }`}>{analysis.grade}</div>

            <div className="flex justify-around mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div>
                <div className="text-2xl font-bold text-green-600">{analysis.passed}</div>
                <div className="text-xs text-gray-500">Passed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{analysis.warnings}</div>
                <div className="text-xs text-gray-500">Warnings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{analysis.failed}</div>
                <div className="text-xs text-gray-500">Failed</div>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">SEO Checklist</h3>
            <div className="space-y-3">
              {analysis.checks.map(check => (
                <div key={check.id} className="flex items-start gap-2">
                  {check.status === "pass" && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />}
                  {check.status === "warn" && <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
                  {check.status === "fail" && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{check.label}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{check.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
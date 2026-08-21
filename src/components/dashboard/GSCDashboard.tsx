"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  BarChart3,
  Search,
  FileText,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface GSCData {
  stats: {
    clicks: number;
    impressions: number;
    ctr: string;
    position: string;
  };
  topQueries: Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }>;
  topPages: Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }>;
  dateRange: { startDate: string; endDate: string };
}

export default function GSCDashboard() {
  const [data, setData] = useState<GSCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    fetch("/api/gsc")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setData(res);
        else setError(res.error);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600 dark:text-blue-400" />
        <span className="ml-3 text-sm font-medium text-gray-600 dark:text-slate-300">
          Loading Search Console Data...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-amber-900 dark:text-amber-300 font-bold text-sm flex items-center gap-2">
            ⚠️ GSC Connection Notice
          </h3>
          <button
            onClick={fetchData}
            className="text-xs bg-amber-200 dark:bg-amber-900 hover:bg-amber-300 dark:hover:bg-amber-800 text-amber-900 dark:text-amber-200 px-3 py-1 rounded-md font-medium flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> Retry
          </button>
        </div>
        <p className="text-amber-800 dark:text-amber-400 text-xs font-mono bg-amber-100/70 dark:bg-amber-900/30 p-2.5 rounded-lg break-all">
          {error}
        </p>
        <p className="text-amber-700 dark:text-amber-400/80 text-xs mt-2">
          Check environment variables in <code className="font-bold">.env.local</code>.
        </p>
      </div>
    );
  }

  if (!data) return null;

  const cards = [
    {
      label: "Total Clicks (28d)",
      value: data.stats.clicks.toLocaleString(),
      icon: MousePointerClick,
      cardBg: "bg-blue-50/70 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/40",
      iconColor: "text-blue-600 dark:text-blue-400",
      textColor: "text-blue-950 dark:text-blue-200",
    },
    {
      label: "Total Impressions",
      value: data.stats.impressions.toLocaleString(),
      icon: Eye,
      cardBg: "bg-purple-50/70 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/40",
      iconColor: "text-purple-600 dark:text-purple-400",
      textColor: "text-purple-950 dark:text-purple-200",
    },
    {
      label: "Average CTR",
      value: `${data.stats.ctr}%`,
      icon: TrendingUp,
      cardBg: "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      textColor: "text-emerald-950 dark:text-emerald-200",
    },
    {
      label: "Average Position",
      value: `#${data.stats.position}`,
      icon: BarChart3,
      cardBg: "bg-orange-50/70 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900/40",
      iconColor: "text-orange-600 dark:text-orange-400",
      textColor: "text-orange-950 dark:text-orange-200",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 rounded-2xl text-white border border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <h2 className="text-xl font-bold tracking-tight text-white">Google Search Console Analytics</h2>
          </div>
          <p className="text-xs text-slate-300 dark:text-slate-400 mt-1">
            Last 28 Days: <span className="font-mono">{data.dateRange.startDate}</span> →{" "}
            <span className="font-mono">{data.dateRange.endDate}</span>
          </p>
        </div>
        <button
          onClick={fetchData}
          className="self-start sm:self-auto px-3.5 py-1.5 bg-white/10 hover:bg-white/20 dark:bg-slate-700/60 dark:hover:bg-slate-700 border border-white/20 dark:border-slate-600 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`p-5 rounded-2xl border ${card.cardBg} transition-transform hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                  {card.label}
                </span>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <p className={`text-3xl font-extrabold tracking-tight ${card.textColor}`}>{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Tables: Top Queries & Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Queries */}
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100 dark:border-slate-800">
            <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Top Ranking Queries</h3>
          </div>
          <div className="space-y-2">
            {data.topQueries.length === 0 ? (
              <p className="text-xs text-gray-400 dark:text-slate-500 py-6 text-center">No search query data yet</p>
            ) : (
              data.topQueries.map((q, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 bg-gray-50/70 hover:bg-gray-100/70 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 rounded-xl text-xs transition-colors border border-transparent dark:border-slate-800/50"
                >
                  <span className="font-medium text-gray-800 dark:text-slate-200 truncate pr-2 flex-1">
                    {q.keys[0]}
                  </span>
                  <div className="flex items-center gap-3 shrink-0 font-mono">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{q.clicks} clicks</span>
                    <span className="text-gray-400 dark:text-slate-500 text-[11px]">#{q.position.toFixed(1)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100 dark:border-slate-800">
            <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Top Landing Pages</h3>
          </div>
          <div className="space-y-2">
            {data.topPages.length === 0 ? (
              <p className="text-xs text-gray-400 dark:text-slate-500 py-6 text-center">No page data yet</p>
            ) : (
              data.topPages.map((p, i) => {
                const url = p.keys[0].replace(/^https?:\/\/[^\/]+/, "");
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 bg-gray-50/70 hover:bg-gray-100/70 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 rounded-xl text-xs transition-colors border border-transparent dark:border-slate-800/50"
                  >
                    <span className="font-mono text-gray-800 dark:text-slate-300 truncate pr-2 flex-1 text-[11px]">
                      {url || "/"}
                    </span>
                    <div className="flex items-center gap-3 shrink-0 font-mono">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">{p.clicks} clk</span>
                      <span className="text-gray-400 dark:text-slate-500 text-[11px]">{p.impressions} imp</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
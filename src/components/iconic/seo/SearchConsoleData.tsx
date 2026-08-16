// src/components/iconic/seo/SearchConsoleData.tsx
import {
  getSearchConsoleOverview,
  getTopQueries,
  getTopPagesSC,
  getDevicesSC,
} from "@/lib/analytics/searchConsole";
import { MousePointerClick, Eye, Percent, TrendingUp, Search, FileText, Smartphone } from "lucide-react";

export default async function SearchConsoleData() {
  const [overview, topQueries, topPages, devices] = await Promise.all([
    getSearchConsoleOverview(28),
    getTopQueries(28, 10),
    getTopPagesSC(28, 10),
    getDevicesSC(28),
  ]);

  const ctrPercent = (overview.ctr * 100).toFixed(2);
  const position = overview.position.toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3">
          <Search className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Google Search Console</h2>
            <p className="text-sm opacity-90">Last 28 days performance</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SCStatCard
          title="Total Clicks"
          value={overview.clicks.toLocaleString()}
          icon={<MousePointerClick className="w-6 h-6" />}
          color="bg-blue-500"
        />
        <SCStatCard
          title="Impressions"
          value={overview.impressions.toLocaleString()}
          icon={<Eye className="w-6 h-6" />}
          color="bg-purple-500"
        />
        <SCStatCard
          title="Average CTR"
          value={`${ctrPercent}%`}
          icon={<Percent className="w-6 h-6" />}
          color="bg-pink-500"
        />
        <SCStatCard
          title="Avg Position"
          value={position}
          icon={<TrendingUp className="w-6 h-6" />}
          color="bg-green-500"
        />
      </div>

      {/* Top Queries & Pages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Queries */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Keywords
            </h3>
          </div>

          {topQueries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2 px-2 font-medium text-gray-500">Query</th>
                    <th className="text-right py-2 px-2 font-medium text-gray-500">Clicks</th>
                    <th className="text-right py-2 px-2 font-medium text-gray-500">Impr</th>
                    <th className="text-right py-2 px-2 font-medium text-gray-500">Pos</th>
                  </tr>
                </thead>
                <tbody>
                  {topQueries.map((q, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 px-2 text-gray-900 dark:text-white truncate max-w-[200px]">
                        {q.query}
                      </td>
                      <td className="text-right py-2 px-2 font-medium">{q.clicks}</td>
                      <td className="text-right py-2 px-2 text-gray-600">{q.impressions}</td>
                      <td className="text-right py-2 px-2 text-gray-600">
                        {q.position.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No keyword data yet</p>
          )}
        </div>

        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Pages
            </h3>
          </div>

          {topPages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2 px-2 font-medium text-gray-500">Page</th>
                    <th className="text-right py-2 px-2 font-medium text-gray-500">Clicks</th>
                    <th className="text-right py-2 px-2 font-medium text-gray-500">Impr</th>
                  </tr>
                </thead>
                <tbody>
                  {topPages.map((p, i) => {
                    const path = p.page.replace(/^https?:\/\/[^\/]+/, "") || "/";
                    return (
                      <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 px-2 text-gray-900 dark:text-white truncate max-w-[250px]">
                          {path}
                        </td>
                        <td className="text-right py-2 px-2 font-medium">{p.clicks}</td>
                        <td className="text-right py-2 px-2 text-gray-600">
                          {p.impressions}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No page data yet</p>
          )}
        </div>
      </div>

      {/* Device Breakdown */}
      {devices.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Device Breakdown
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {devices.map((d, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {d.clicks}
                </p>
                <p className="text-xs text-gray-500 mt-1">clicks</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize mt-2">
                  {d.device}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {d.impressions.toLocaleString()} impressions
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SCStatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className={`${color} text-white p-2 rounded-lg w-fit mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{title}</p>
    </div>
  );
}
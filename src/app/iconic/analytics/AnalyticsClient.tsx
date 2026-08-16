"use client";

import { useState } from "react";
import {
  Users,
  Eye,
  MousePointerClick,
  Activity,
  Globe,
  FileText,
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Stats {
  activeUsers: number;
  pageViews: number;
  sessions: number;
  eventCount: number;
}

interface Props {
  stats7d: Stats;
  stats28d: Stats;
  dailyUsers: { date: string; users: number; pageViews: number }[];
  topCountries: { country: string; users: number }[];
  topPages: { path: string; title: string; views: number; users: number }[];
  trafficSources: { source: string; sessions: number; users: number }[];
  devices: { device: string; users: number }[];
  realtimeUsers: number;
}

const COLORS = ["#DC2626", "#EC4899", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"];

function formatDate(dateStr: string): string {
  // GA date format: YYYYMMDD
  if (dateStr.length === 8) {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${month}/${day}`;
  }
  return dateStr;
}

function DeviceIcon({ device }: { device: string }) {
  if (device === "mobile") return <Smartphone className="w-4 h-4" />;
  if (device === "tablet") return <Tablet className="w-4 h-4" />;
  return <Monitor className="w-4 h-4" />;
}

export default function AnalyticsClient({
  stats7d,
  stats28d,
  dailyUsers,
  topCountries,
  topPages,
  trafficSources,
  devices,
  realtimeUsers,
}: Props) {
  const [period, setPeriod] = useState<"7d" | "28d">("7d");
  const currentStats = period === "7d" ? stats7d : stats28d;

  const dailyChartData = dailyUsers.map((d) => ({
    ...d,
    date: formatDate(d.date),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ðŸ“Š Analytics
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time data from Google Analytics
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setPeriod("7d")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              period === "7d"
                ? "bg-white dark:bg-gray-700 text-red-600 shadow"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Last 7 days
          </button>
          <button
            onClick={() => setPeriod("28d")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              period === "28d"
                ? "bg-white dark:bg-gray-700 text-red-600 shadow"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Last 28 days
          </button>
        </div>
      </div>

      {/* Real-time */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">ðŸ”´ Active users right now</p>
            <p className="text-4xl font-bold mt-2">{realtimeUsers}</p>
          </div>
          <Activity className="w-16 h-16 opacity-30" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Active Users"
          value={currentStats.activeUsers}
          icon={<Users className="w-6 h-6" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Page Views"
          value={currentStats.pageViews}
          icon={<Eye className="w-6 h-6" />}
          color="bg-purple-500"
        />
        <StatCard
          title="Sessions"
          value={currentStats.sessions}
          icon={<MousePointerClick className="w-6 h-6" />}
          color="bg-pink-500"
        />
        <StatCard
          title="Events"
          value={currentStats.eventCount}
          icon={<TrendingUp className="w-6 h-6" />}
          color="bg-orange-500"
        />
      </div>

      {/* Chart - Daily Users */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Users & Page Views (Last 7 days)
        </h2>
        {dailyChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#DC2626"
                strokeWidth={2}
                name="Active Users"
              />
              <Line
                type="monotone"
                dataKey="pageViews"
                stroke="#EC4899"
                strokeWidth={2}
                name="Page Views"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 py-12">No data available</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Countries
            </h2>
          </div>
          {topCountries.length > 0 ? (
            <div className="space-y-3">
              {topCountries.slice(0, 5).map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {c.country}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {c.users}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No data</p>
          )}
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Traffic Sources
            </h2>
          </div>
          {trafficSources.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  dataKey="sessions"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ name }) => name}
                >
                  {trafficSources.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 py-8">No data</p>
          )}
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Top Pages
          </h2>
        </div>
        {topPages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-2 px-2 font-medium text-gray-500">Page</th>
                  <th className="text-right py-2 px-2 font-medium text-gray-500">Views</th>
                  <th className="text-right py-2 px-2 font-medium text-gray-500">Users</th>
                </tr>
              </thead>
              <tbody>
                {topPages.slice(0, 10).map((p, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white truncate max-w-md">
                          {p.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-md">{p.path}</p>
                      </div>
                    </td>
                    <td className="text-right py-3 px-2 text-gray-900 dark:text-white font-medium">
                      {p.views}
                    </td>
                    <td className="text-right py-3 px-2 text-gray-600 dark:text-gray-400">
                      {p.users}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No data available</p>
        )}
      </div>

      {/* Devices */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Device Breakdown
        </h2>
        {devices.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {devices.map((d, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex justify-center mb-2 text-red-600">
                  <DeviceIcon device={d.device} />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {d.users}
                </p>
                <p className="text-xs text-gray-500 capitalize mt-1">{d.device}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No data</p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`${color} text-white p-2 rounded-lg`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value.toLocaleString()}
      </p>
      <p className="text-xs text-gray-500 mt-1">{title}</p>
    </div>
  );
}
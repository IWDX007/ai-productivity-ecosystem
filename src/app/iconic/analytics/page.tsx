// src/app/iconic/analytics/page.tsx
import {
  getActiveUsers,
  getDailyUsers,
  getTopCountries,
  getTopPages,
  getTrafficSources,
  getDeviceBreakdown,
  getRealtimeUsers,
} from "@/lib/analytics/ga";
import AnalyticsClient from "./AnalyticsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AnalyticsPage() {
  // Fetch all data in parallel
  const [
    stats7d,
    stats28d,
    dailyUsers,
    topCountries,
    topPages,
    trafficSources,
    devices,
    realtimeUsers,
  ] = await Promise.all([
    getActiveUsers(7),
    getActiveUsers(28),
    getDailyUsers(7),
    getTopCountries(7, 10),
    getTopPages(7, 10),
    getTrafficSources(7),
    getDeviceBreakdown(7),
    getRealtimeUsers(),
  ]);

  return (
    <AnalyticsClient
      stats7d={stats7d}
      stats28d={stats28d}
      dailyUsers={dailyUsers}
      topCountries={topCountries}
      topPages={topPages}
      trafficSources={trafficSources}
      devices={devices}
      realtimeUsers={realtimeUsers}
    />
  );
}
// src/lib/analytics/ga.ts
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA_PROPERTY_ID!;

// Initialize client
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

// Get active users (last N days)
export async function getActiveUsers(days: number = 7) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }, { name: "sessions" }, { name: "eventCount" }],
    });

    const row = response.rows?.[0]?.metricValues;
    return {
      activeUsers: parseInt(row?.[0]?.value || "0"),
      pageViews: parseInt(row?.[1]?.value || "0"),
      sessions: parseInt(row?.[2]?.value || "0"),
      eventCount: parseInt(row?.[3]?.value || "0"),
    };
  } catch (error) {
    console.error("GA getActiveUsers error:", error);
    return { activeUsers: 0, pageViews: 0, sessions: 0, eventCount: 0 };
  }
}

// Get daily users chart data
export async function getDailyUsers(days: number = 7) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    });

    return (response.rows || []).map((row) => ({
      date: row.dimensionValues?.[0]?.value || "",
      users: parseInt(row.metricValues?.[0]?.value || "0"),
      pageViews: parseInt(row.metricValues?.[1]?.value || "0"),
    }));
  } catch (error) {
    console.error("GA getDailyUsers error:", error);
    return [];
  }
}

// Get top countries
export async function getTopCountries(days: number = 7, limit: number = 10) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
      dimensions: [{ name: "country" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit,
    });

    return (response.rows || []).map((row) => ({
      country: row.dimensionValues?.[0]?.value || "Unknown",
      users: parseInt(row.metricValues?.[0]?.value || "0"),
    }));
  } catch (error) {
    console.error("GA getTopCountries error:", error);
    return [];
  }
}

// Get top pages
export async function getTopPages(days: number = 7, limit: number = 10) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
      dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit,
    });

    return (response.rows || []).map((row) => ({
      path: row.dimensionValues?.[0]?.value || "/",
      title: row.dimensionValues?.[1]?.value || "Unknown",
      views: parseInt(row.metricValues?.[0]?.value || "0"),
      users: parseInt(row.metricValues?.[1]?.value || "0"),
    }));
  } catch (error) {
    console.error("GA getTopPages error:", error);
    return [];
  }
}

// Get traffic sources
export async function getTrafficSources(days: number = 7) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    });

    return (response.rows || []).map((row) => ({
      source: row.dimensionValues?.[0]?.value || "Direct",
      sessions: parseInt(row.metricValues?.[0]?.value || "0"),
      users: parseInt(row.metricValues?.[1]?.value || "0"),
    }));
  } catch (error) {
    console.error("GA getTrafficSources error:", error);
    return [];
  }
}

// Get device breakdown
export async function getDeviceBreakdown(days: number = 7) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }],
    });

    return (response.rows || []).map((row) => ({
      device: row.dimensionValues?.[0]?.value || "unknown",
      users: parseInt(row.metricValues?.[0]?.value || "0"),
    }));
  } catch (error) {
    console.error("GA getDeviceBreakdown error:", error);
    return [];
  }
}

// Get real-time active users
export async function getRealtimeUsers() {
  try {
    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [{ name: "activeUsers" }],
    });

    return parseInt(response.rows?.[0]?.metricValues?.[0]?.value || "0");
  } catch (error) {
    console.error("GA getRealtimeUsers error:", error);
    return 0;
  }
}
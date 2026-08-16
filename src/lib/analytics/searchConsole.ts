// src/lib/analytics/searchConsole.ts
import { google } from "googleapis";

const siteUrl = process.env.SEARCH_CONSOLE_SITE_URL!;

function getClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GA_CLIENT_EMAIL,
      private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });

  return google.searchconsole({ version: "v1", auth });
}

function getDateRange(days: number) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
}

// Helper to safely call SC API
async function safeCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error: unknown) {
    const err = error as { message?: string };
    if (err.message?.includes("has not been used") || err.message?.includes("disabled")) {
      console.warn("⚠️ Search Console API not enabled yet. Enable at: https://console.developers.google.com/apis/api/searchconsole.googleapis.com/overview");
    } else {
      console.error("SC API error:", err.message || error);
    }
    return fallback;
  }
}

// Overview totals
export async function getSearchConsoleOverview(days: number = 28) {
  return safeCall(async () => {
    const searchconsole = getClient();
    const { startDate, endDate } = getDateRange(days);

    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: { startDate, endDate, rowLimit: 1 },
    });

    const row = res.data.rows?.[0];
    return {
      clicks: row?.clicks || 0,
      impressions: row?.impressions || 0,
      ctr: row?.ctr || 0,
      position: row?.position || 0,
    };
  }, { clicks: 0, impressions: 0, ctr: 0, position: 0 });
}

// Top keywords/queries
export async function getTopQueries(days: number = 28, limit: number = 20) {
  return safeCall(async () => {
    const searchconsole = getClient();
    const { startDate, endDate } = getDateRange(days);

    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: limit,
      },
    });

    return (res.data.rows || []).map((row) => ({
      query: row.keys?.[0] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    }));
  }, []);
}

// Top pages
export async function getTopPagesSC(days: number = 28, limit: number = 20) {
  return safeCall(async () => {
    const searchconsole = getClient();
    const { startDate, endDate } = getDateRange(days);

    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: limit,
      },
    });

    return (res.data.rows || []).map((row) => ({
      page: row.keys?.[0] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    }));
  }, []);
}

// Daily performance chart
export async function getDailyPerformance(days: number = 28) {
  return safeCall(async () => {
    const searchconsole = getClient();
    const { startDate, endDate } = getDateRange(days);

    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["date"],
        rowLimit: days + 5,
      },
    });

    return (res.data.rows || []).map((row) => ({
      date: row.keys?.[0] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    }));
  }, []);
}

// Top countries
export async function getTopCountriesSC(days: number = 28, limit: number = 10) {
  return safeCall(async () => {
    const searchconsole = getClient();
    const { startDate, endDate } = getDateRange(days);

    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["country"],
        rowLimit: limit,
      },
    });

    return (res.data.rows || []).map((row) => ({
      country: row.keys?.[0]?.toUpperCase() || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
    }));
  }, []);
}

// Devices
export async function getDevicesSC(days: number = 28) {
  return safeCall(async () => {
    const searchconsole = getClient();
    const { startDate, endDate } = getDateRange(days);

    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["device"],
      },
    });

    return (res.data.rows || []).map((row) => ({
      device: row.keys?.[0] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
    }));
  }, []);
}
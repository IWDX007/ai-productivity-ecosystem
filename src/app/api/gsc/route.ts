import { NextResponse } from "next/server";
import { google } from "googleapis";

export const revalidate = 3600; // Cache 1 hour

export async function GET() {
  try {
    const clientEmail = process.env.GSC_CLIENT_EMAIL?.trim();
    let privateKey = process.env.GSC_PRIVATE_KEY?.trim();
    const siteUrl = process.env.GSC_SITE_URL?.trim();

    if (!clientEmail || !privateKey || !siteUrl) {
      return NextResponse.json(
        { success: false, error: "GSC Environment variables missing in .env.local" },
        { status: 400 }
      );
    }

    // Handle private key formatting (remove surrounding quotes & unescape newlines)
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });

    const webmasters = google.webmasters({ version: "v3", auth });

    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    // 1. Overall metrics
    const overall = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: { startDate, endDate, dimensions: [] },
    });

    // 2. Top queries
    const queries = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 10,
      },
    });

    // 3. Top pages
    const pages = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 10,
      },
    });

    const stats = overall.data.rows?.[0] || {
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
    };

    return NextResponse.json({
      success: true,
      stats: {
        clicks: stats.clicks || 0,
        impressions: stats.impressions || 0,
        ctr: ((stats.ctr || 0) * 100).toFixed(2),
        position: (stats.position || 0).toFixed(1),
      },
      topQueries: queries.data.rows || [],
      topPages: pages.data.rows || [],
      dateRange: { startDate, endDate },
    });
  } catch (error: any) {
    console.error("GSC API Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
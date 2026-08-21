import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ai-productivity-ecosystem-azure.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/iconic/",
          "/api/",
          "/admin/",
          "/sign-in",
          "/sign-up",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
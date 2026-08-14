"use server";

import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  const settings = [
    { key: "site_name", value: formData.get("site_name") as string, type: "text" },
    { key: "site_tagline", value: formData.get("site_tagline") as string, type: "text" },
    { key: "site_description", value: formData.get("site_description") as string, type: "textarea" },
    { key: "contact_email", value: formData.get("contact_email") as string, type: "email" },
    { key: "logo_url", value: formData.get("logo_url") as string, type: "url" },
    { key: "footer_text", value: formData.get("footer_text") as string, type: "text" },
    
    // Social Media
    { key: "social_facebook", value: formData.get("social_facebook") as string, type: "url" },
    { key: "social_twitter", value: formData.get("social_twitter") as string, type: "url" },
    { key: "social_instagram", value: formData.get("social_instagram") as string, type: "url" },
    { key: "social_youtube", value: formData.get("social_youtube") as string, type: "url" },
    { key: "social_linkedin", value: formData.get("social_linkedin") as string, type: "url" },
    { key: "social_github", value: formData.get("social_github") as string, type: "url" },
    
    // Analytics & Ads
    { key: "google_analytics_id", value: formData.get("google_analytics_id") as string, type: "text" },
    { key: "google_adsense_client", value: formData.get("google_adsense_client") as string, type: "text" },
    { key: "google_search_console", value: formData.get("google_search_console") as string, type: "textarea" },
    
    // Custom Scripts
    { key: "custom_head_scripts", value: formData.get("custom_head_scripts") as string, type: "textarea" },
    { key: "custom_body_scripts", value: formData.get("custom_body_scripts") as string, type: "textarea" },
  ];

  for (const setting of settings) {
    if (setting.value === null || setting.value === undefined) continue;
    
    try {
      // Try update first
      const [existing] = await db.select().from(siteSettings).where(eq(siteSettings.key, setting.key));
      
      if (existing) {
        await db.update(siteSettings)
          .set({ value: setting.value, type: setting.type, updatedAt: new Date() })
          .where(eq(siteSettings.key, setting.key));
      } else {
        await db.insert(siteSettings).values(setting);
      }
    } catch (err) {
      console.error(`Failed to save ${setting.key}:`, err);
    }
  }

  revalidatePath("/iconic/settings");
  revalidatePath("/");
}
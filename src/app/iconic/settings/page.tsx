import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { Settings } from "lucide-react";
import SettingsForm from "./SettingsForm";
import { updateSettings } from "./actions";

export const metadata = {
  title: "Settings - Iconic Dashboard",
};

export default async function SettingsPage() {
  const allSettings = await db.select().from(siteSettings);
  
  // Convert to key-value map
  const settingsMap: Record<string, string> = {};
  for (const s of allSettings) {
    settingsMap[s.key] = s.value || "";
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-red-600" />
          Site Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your website configuration, social links, and integrations
        </p>
      </div>

      <SettingsForm settings={settingsMap} action={updateSettings} />
    </div>
  );
}
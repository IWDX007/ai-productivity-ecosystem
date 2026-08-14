"use client";

import { useState } from "react";
import { Save, Globe, Share2, BarChart3, Code } from "lucide-react";

interface Props {
  settings: Record<string, string>;
  action: (formData: FormData) => Promise<void>;
}

export default function SettingsForm({ settings, action }: Props) {
  const [activeTab, setActiveTab] = useState<"general" | "social" | "analytics" | "scripts">("general");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setSaving(true);
    setSaved(false);
    await action(formData);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "social", label: "Social Media", icon: Share2 },
    { id: "analytics", label: "Analytics & Ads", icon: BarChart3 },
    { id: "scripts", label: "Custom Scripts", icon: Code },
  ] as const;

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 flex gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* General Tab */}
      {activeTab === "general" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Site Name</label>
            <input
              type="text"
              name="site_name"
              defaultValue={settings.site_name || "AI Productivity Ecosystem"}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Site Tagline</label>
            <input
              type="text"
              name="site_tagline"
              defaultValue={settings.site_tagline || ""}
              placeholder="200+ Free Online Tools"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Site Description</label>
            <textarea
              name="site_description"
              defaultValue={settings.site_description || ""}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Contact Email</label>
              <input
                type="email"
                name="contact_email"
                defaultValue={settings.contact_email || ""}
                placeholder="hello@example.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Logo URL</label>
              <input
                type="url"
                name="logo_url"
                defaultValue={settings.logo_url || ""}
                placeholder="/logo.png"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Footer Text</label>
            <input
              type="text"
              name="footer_text"
              defaultValue={settings.footer_text || "© 2026 AI Productivity Ecosystem. All rights reserved."}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Social Media Tab */}
      {activeTab === "social" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          {[
            { key: "social_facebook", label: "Facebook URL" },
            { key: "social_twitter", label: "Twitter/X URL" },
            { key: "social_instagram", label: "Instagram URL" },
            { key: "social_youtube", label: "YouTube URL" },
            { key: "social_linkedin", label: "LinkedIn URL" },
            { key: "social_github", label: "GitHub URL" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{field.label}</label>
              <input
                type="url"
                name={field.key}
                defaultValue={settings[field.key] || ""}
                placeholder={`https://...`}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Google Analytics ID</label>
            <input
              type="text"
              name="google_analytics_id"
              defaultValue={settings.google_analytics_id || ""}
              placeholder="G-XXXXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Google AdSense Client ID</label>
            <input
              type="text"
              name="google_adsense_client"
              defaultValue={settings.google_adsense_client || ""}
              placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Google Search Console Verification (meta tag)
            </label>
            <textarea
              name="google_search_console"
              defaultValue={settings.google_search_console || ""}
              rows={2}
              placeholder='<meta name="google-site-verification" content="..." />'
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        </div>
      )}

      {/* Scripts Tab */}
      {activeTab === "scripts" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Custom Head Scripts</label>
            <textarea
              name="custom_head_scripts"
              defaultValue={settings.custom_head_scripts || ""}
              rows={6}
              placeholder="<!-- Scripts to inject in <head> -->"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Custom Body Scripts</label>
            <textarea
              name="custom_body_scripts"
              defaultValue={settings.custom_body_scripts || ""}
              rows={6}
              placeholder="<!-- Scripts to inject before </body> -->"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="text-sm text-gray-500">
          {saved && <span className="text-green-600 font-medium">Settings saved successfully!</span>}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition-colors font-medium"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
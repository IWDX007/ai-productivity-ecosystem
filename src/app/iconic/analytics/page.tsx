import { BarChart3, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Analytics - Iconic Dashboard",
};

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-red-600" />
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time traffic and performance data from Google Analytics
          </p>
        </div>
        <a
          href="https://analytics.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Open GA4 <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Embed Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="w-full" style={{ height: "calc(100vh - 200px)", minHeight: "700px" }}>
          <iframe
            src="https://datastudio.google.com/embed/reporting/adc6151f-1fc1-410e-9b25-a41f2d23a200/page/WQU6F"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> Data updates every few hours. For real-time data, open GA4 directly.
        </p>
      </div>
    </div>
  );
}
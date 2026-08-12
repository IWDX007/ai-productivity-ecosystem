// src/types/gtag.d.ts
// TypeScript ko gtag samjhane ke liye

interface Window {
  gtag: (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    config?: {
      page_path?: string
      send_page_view?: boolean
      event_category?: string
      event_label?: string
      value?: number
      [key: string]: unknown
    }
  ) => void
  dataLayer: unknown[]
}
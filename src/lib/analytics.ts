// src/lib/analytics.ts
// Tool usage, button clicks track karne ke liye

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

// Page view track karo
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Custom events track karo
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Tool usage track karo
export const trackToolUsage = (toolName: string, toolCategory: string) => {
  event({
    action: 'tool_used',
    category: toolCategory,
    label: toolName,
  })
}

// Prompt copy track karo
export const trackPromptCopy = (promptName: string) => {
  event({
    action: 'prompt_copied',
    category: 'prompts',
    label: promptName,
  })
}

// Button click track karo
export const trackButtonClick = (buttonName: string, page: string) => {
  event({
    action: 'button_click',
    category: 'engagement',
    label: `${page} - ${buttonName}`,
  })
}

// Search track karo
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'search',
    label: searchTerm,
    value: resultsCount,
  })
}
import { MetadataRoute } from 'next'
import { categories } from '@/config/tools-data'
import { prompts, promptCategories } from '@/config/prompts-data'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-productivity-ecosystem-azure.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = []
  const now = new Date()

  // Main pages
  sitemap.push(
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/prompts`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/cookie-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  )

  // Category pages
  Object.values(categories).forEach(category => {
    if (category.status === 'live') {
      sitemap.push({
        url: `${SITE_URL}/tools/${category.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      })

      // Individual tool pages
      category.tools.forEach(tool => {
        sitemap.push({
          url: `${SITE_URL}/tools/${tool.slug}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.7,
        })
      })
    }
  })

  // Prompt category pages
  promptCategories.forEach(cat => {
    sitemap.push({
      url: `${SITE_URL}/prompts/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Individual prompt pages
  prompts.forEach(prompt => {
    sitemap.push({
      url: `${SITE_URL}/prompts/${prompt.category}/${prompt.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  return sitemap
}
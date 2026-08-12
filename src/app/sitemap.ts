import { MetadataRoute } from 'next'
import { categories } from '@/config/tools-data'
import { allPrompts, promptCategories } from '@/config/prompts-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai-productivity-ecosystem-azure.vercel.app'
  const currentDate = new Date().toISOString()

  const staticPages = [
    { url: baseUrl, lastModified: currentDate, priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: currentDate, priority: 0.9 },
    { url: `${baseUrl}/prompts`, lastModified: currentDate, priority: 0.9 },
    { url: `${baseUrl}/prompts/new`, lastModified: currentDate, priority: 0.7 },
    { url: `${baseUrl}/prompts/trending`, lastModified: currentDate, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: currentDate, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: currentDate, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: currentDate, priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified: currentDate, priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: currentDate, priority: 0.3 },
  ]

  // Category pages + all tools from categories
  const categoryPages: any[] = []
  const toolPages: any[] = []

  Object.entries(categories).forEach(([slug, category]) => {
    categoryPages.push({
      url: `${baseUrl}/tools/${slug}`,
      lastModified: currentDate,
      priority: 0.8,
    })

    if (category.tools && Array.isArray(category.tools)) {
      category.tools.forEach((tool: any) => {
        toolPages.push({
          url: `${baseUrl}/tools/${slug}/${tool.slug}`,
          lastModified: currentDate,
          priority: 0.7,
        })
      })
    }
  })

  // Prompt pages
  const promptPages = allPrompts.map(prompt => ({
    url: `${baseUrl}/prompts/${prompt.slug}`,
    lastModified: currentDate,
    priority: 0.6,
  }))

  // Prompt category pages
  const promptCategoryPages = promptCategories.map(cat => ({
    url: `${baseUrl}/prompts/category/${cat.slug}`,
    lastModified: currentDate,
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...toolPages, ...promptPages, ...promptCategoryPages]
}
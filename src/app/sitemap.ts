import { MetadataRoute } from 'next'
import { toolsData } from '@/config/tools-data'
import { promptsData } from '@/config/prompts-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai-productivity-ecosystem-azure.vercel.app'
  const currentDate = new Date().toISOString()

  // Static pages
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

  // Tool category pages
  const categories = ['calculators','converters','developer','image','pdf','qr-barcode','security','text']
  const categoryPages = categories.map(cat => ({
    url: `${baseUrl}/tools/${cat}`,
    lastModified: currentDate,
    priority: 0.8,
  }))

  // All tool pages
  const toolPages = toolsData.map(tool => ({
    url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
    lastModified: currentDate,
    priority: 0.7,
  }))

  // All prompt pages
  const promptPages = promptsData.map(prompt => ({
    url: `${baseUrl}/prompts/${prompt.slug}`,
    lastModified: currentDate,
    priority: 0.6,
  }))

  // Prompt categories
  const promptCategories = ['chatgpt','midjourney','dalle','stable-diffusion','claude','gemini','coding','video','music','voice']
  const promptCategoryPages = promptCategories.map(cat => ({
    url: `${baseUrl}/prompts/category/${cat}`,
    lastModified: currentDate,
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...toolPages, ...promptPages, ...promptCategoryPages]
}
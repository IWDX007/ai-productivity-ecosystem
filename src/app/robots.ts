import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/', '/sign-in/', '/sign-up/'],
      },
    ],
    sitemap: 'https://ai-productivity-ecosystem-azure.vercel.app/sitemap.xml',
  }
}
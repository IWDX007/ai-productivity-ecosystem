import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/iconic/', '/api/', '/admin/', '/sign-in/', '/sign-up/'],
      },
    ],
    sitemap: 'https://getallinonetools.com/sitemap.xml',
  }
}
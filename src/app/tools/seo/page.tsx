import type { Metadata } from 'next'
import ComingSoonTemplate from '@/components/tools/ComingSoonTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'SEO Tools - Coming Soon | AI Productivity',
  description: 'SEO Tools coming soon. Get notified when they launch.',
}

export default function SeoPage() {
  const category = getCategory('seo')
  if (!category) return notFound()
  return <ComingSoonTemplate category={category} />
}
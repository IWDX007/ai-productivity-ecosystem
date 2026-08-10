import type { Metadata } from 'next'
import CategoryPageTemplate from '@/components/tools/CategoryPageTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Converters - Free Online Converters | AI Productivity',
  description: 'Free online converters. No login required. Fast, secure and easy to use.',
  keywords: ['converters', 'free tools', 'online tools'],
}

export default function convertersPage() {
  const category = getCategory('converters')
  if (!category) return notFound()
  return <CategoryPageTemplate category={category} />
}
import type { Metadata } from 'next'
import CategoryPageTemplate from '@/components/tools/CategoryPageTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Image Tools - Free Online Image Tools | AI Productivity',
  description: 'Free online image tools. No login required. Fast, secure and easy to use.',
  keywords: ['image tools', 'free tools', 'online tools'],
}

export default function imagePage() {
  const category = getCategory('image')
  if (!category) return notFound()
  return <CategoryPageTemplate category={category} />
}
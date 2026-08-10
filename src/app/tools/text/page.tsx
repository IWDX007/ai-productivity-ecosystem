import type { Metadata } from 'next'
import CategoryPageTemplate from '@/components/tools/CategoryPageTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Text Tools - Free Online Text Tools | AI Productivity',
  description: 'Free online text tools. No login required. Fast, secure and easy to use.',
  keywords: ['text tools', 'free tools', 'online tools'],
}

export default function textPage() {
  const category = getCategory('text')
  if (!category) return notFound()
  return <CategoryPageTemplate category={category} />
}
import type { Metadata } from 'next'
import CategoryPageTemplate from '@/components/tools/CategoryPageTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Developer Tools - Free Online Developer Tools | AI Productivity',
  description: 'Free online developer tools. No login required. Fast, secure and easy to use.',
  keywords: ['developer tools', 'free tools', 'online tools'],
}

export default function developerPage() {
  const category = getCategory('developer')
  if (!category) return notFound()
  return <CategoryPageTemplate category={category} />
}
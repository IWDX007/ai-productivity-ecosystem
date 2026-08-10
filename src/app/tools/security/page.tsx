import type { Metadata } from 'next'
import CategoryPageTemplate from '@/components/tools/CategoryPageTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Security Tools - Free Online Security Tools | AI Productivity',
  description: 'Free online security tools. No login required. Fast, secure and easy to use.',
  keywords: ['security tools', 'free tools', 'online tools'],
}

export default function securityPage() {
  const category = getCategory('security')
  if (!category) return notFound()
  return <CategoryPageTemplate category={category} />
}
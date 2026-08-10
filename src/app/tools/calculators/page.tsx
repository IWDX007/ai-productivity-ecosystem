import type { Metadata } from 'next'
import CategoryPageTemplate from '@/components/tools/CategoryPageTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Calculators - Free Online Calculators | AI Productivity',
  description: 'Free online calculators. No login required. Fast, secure and easy to use.',
  keywords: ['calculators', 'free tools', 'online tools'],
}

export default function calculatorsPage() {
  const category = getCategory('calculators')
  if (!category) return notFound()
  return <CategoryPageTemplate category={category} />
}
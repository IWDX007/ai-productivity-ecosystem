import type { Metadata } from 'next'
import ComingSoonTemplate from '@/components/tools/ComingSoonTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'AI Tools - Coming Soon | AI Productivity',
  description: 'AI Tools coming soon. Get notified when they launch.',
}

export default function AiPage() {
  const category = getCategory('ai')
  if (!category) return notFound()
  return <ComingSoonTemplate category={category} />
}
import type { Metadata } from 'next'
import ComingSoonTemplate from '@/components/tools/ComingSoonTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Audio Tools - Coming Soon | AI Productivity',
  description: 'Audio Tools coming soon. Get notified when they launch.',
}

export default function AudioPage() {
  const category = getCategory('audio')
  if (!category) return notFound()
  return <ComingSoonTemplate category={category} />
}
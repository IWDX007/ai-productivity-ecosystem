import type { Metadata } from 'next'
import ComingSoonTemplate from '@/components/tools/ComingSoonTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Video Tools - Coming Soon | AI Productivity',
  description: 'Video Tools coming soon. Get notified when they launch.',
}

export default function VideoPage() {
  const category = getCategory('video')
  if (!category) return notFound()
  return <ComingSoonTemplate category={category} />
}
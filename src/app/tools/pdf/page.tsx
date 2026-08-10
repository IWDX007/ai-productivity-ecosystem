import type { Metadata } from 'next'
import CategoryPageTemplate from '@/components/tools/CategoryPageTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'PDF Tools - Free Online PDF Tools | AI Productivity',
  description: 'Complete PDF toolkit - merge, split, compress, convert, protect and edit PDFs. All processing in browser. 100% private, no uploads.',
  keywords: ['pdf tools', 'pdf merger', 'pdf splitter', 'pdf compressor', 'free pdf tools'],
}

export default function PdfPage() {
  const category = getCategory('pdf')
  if (!category) return notFound()
  return <CategoryPageTemplate category={category} />
}
import type { Metadata } from 'next'
import CategoryPageTemplate from '@/components/tools/CategoryPageTemplate'
import { getCategory } from '@/config/tools-data'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'QR & Barcode Tools - Free Online QR Code Generator | AI Productivity',
  description: 'Free online QR code and barcode generators. Create QR codes for URLs, WiFi, contacts and more. No login required.',
  keywords: ['qr code generator', 'barcode generator', 'wifi qr code', 'free qr tools'],
}

export default function QrBarcodePage() {
  const category = getCategory('qr-barcode')
  if (!category) return notFound()
  return <CategoryPageTemplate category={category} />
}
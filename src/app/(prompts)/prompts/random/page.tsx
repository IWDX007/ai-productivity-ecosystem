'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { allPrompts } from '@/config/prompts-data'
import { Sparkles } from 'lucide-react'

export default function RandomPromptPage() {
  const router = useRouter()

  useEffect(() => {
    const randomPrompt = allPrompts[Math.floor(Math.random() * allPrompts.length)]
    router.replace(`/prompts/${randomPrompt.slug}`)
  }, [router])

  return (
    <div className="min-h-screen bg-theme-primary flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-crimson-500/10 mb-6 animate-pulse">
          <Sparkles className="w-10 h-10 text-crimson-500 animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-theme-primary mb-2">Finding a random prompt...</h1>
        <p className="text-theme-secondary">Get ready to be inspired!</p>
      </div>
    </div>
  )
}
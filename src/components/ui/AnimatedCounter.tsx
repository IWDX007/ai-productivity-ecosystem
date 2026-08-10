"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(end * easeOutQuart))
            if (progress < 1) requestAnimationFrame(animate)
            else setCount(end)
          }
          animate()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}
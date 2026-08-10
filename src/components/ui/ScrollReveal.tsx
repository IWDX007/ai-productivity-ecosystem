"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in" | "flip-up"
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 800,
  className = "",
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay, threshold])

  const animationClasses = {
    "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
    "fade-in": isVisible ? "opacity-100" : "opacity-0",
    "slide-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
    "slide-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
    "zoom-in": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
    "flip-up": isVisible ? "opacity-100 rotate-x-0" : "opacity-0 rotate-x-90",
  }

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${animationClasses[animation]} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}
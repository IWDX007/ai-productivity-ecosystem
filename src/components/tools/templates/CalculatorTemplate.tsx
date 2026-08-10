"use client"

import { ReactNode } from "react"

interface CalculatorTemplateProps {
  title: string
  description: string
  badge?: string
  children: ReactNode
  resultPanel?: ReactNode
  infoPanel?: ReactNode
}

export default function CalculatorTemplate({
  title,
  description,
  badge = "Calculator",
  children,
  resultPanel,
  infoPanel,
}: CalculatorTemplateProps) {
  return (
    <>
      <section className="relative border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">
            {badge}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">
            {title.split(" ").map((word, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  <>{word} </>
                )}
              </span>
            ))}
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto text-base md:text-lg">
            {description}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass-card border border-theme rounded-2xl p-6 md:p-8">
              {children}
            </div>
          </div>
          <div className="space-y-4">
            {resultPanel}
            {infoPanel}
          </div>
        </div>
      </section>
    </>
  )
}
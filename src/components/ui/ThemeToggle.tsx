"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="p-2 rounded-lg hover:bg-theme-secondary transition-colors w-9 h-9"
      />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="p-2 rounded-lg hover:bg-theme-secondary transition-colors group"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-theme-secondary group-hover:text-crimson-500 icon-hover" />
      ) : (
        <Moon className="w-5 h-5 text-theme-secondary group-hover:text-crimson-500 icon-hover" />
      )}
    </button>
  )
}

export default ThemeToggle
"use client"

import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "./icons"

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle() {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    setDark(next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid size-9 place-items-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:bg-surface-2"
    >
      {dark ? <SunIcon className="size-4.5" /> : <MoonIcon className="size-4.5" />}
    </button>
  )
}

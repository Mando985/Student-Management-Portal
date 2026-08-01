"use client"

import { useSyncExternalStore } from "react"
import { MoonIcon, SunIcon } from "./icons"

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  window.addEventListener("storage", callback)
  return () => {
    observer.disconnect()
    window.removeEventListener("storage", callback)
  }
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark")
}

function getServerSnapshot() {
  return false
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  function toggle() {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
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

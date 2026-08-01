import type { ReactNode } from "react"
import Link from "next/link"
import { GraduationCapIcon } from "./icons"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader({ actions }: { actions?: ReactNode }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-[15px] font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-card">
            <GraduationCapIcon className="size-5" />
          </span>
          Student Management Portal
        </Link>
        <div className="flex items-center gap-2">
          {actions}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

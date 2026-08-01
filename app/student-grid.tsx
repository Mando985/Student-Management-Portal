"use client"

import { useState } from "react"
import Link from "next/link"
import { DeleteStudentButton } from "./delete-student-button"
import { ArrowRightIcon } from "./components/icons"
import { cn } from "@/lib/cn"
import { initials } from "@/lib/initials"

type Student = {
  _id: string
  name: string
  branch: string
  currentYear: number
}

export type { Student }

const YEARS = [1, 2, 3, 4]

export function StudentGrid({ students }: { students: Student[] }) {
  const [year, setYear] = useState<number | null>(null)
  const filtered = year
    ? students.filter((s) => s.currentYear === year)
    : students

  const pillCls = (active: boolean) =>
    cn(
      "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
      active
        ? "bg-primary text-primary-foreground shadow-card"
        : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
    )

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1 shadow-card">
          <button onClick={() => setYear(null)} className={pillCls(year === null)}>
            All
          </button>
          {YEARS.map((y) => (
            <button key={y} onClick={() => setYear(y)} className={pillCls(year === y)}>
              Year {y}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {filtered.length} of {students.length} student
          {students.length === 1 ? "" : "s"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-secondary text-secondary-foreground">
            <ArrowRightIcon className="size-6 -scale-x-100" />
          </span>
          <p className="font-display font-semibold">No students here yet</p>
          <p className="text-sm text-muted-foreground">
            {year
              ? `No students are currently in Year ${year}.`
              : "Add a student to start tracking results."}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <div
              key={s._id}
              className="group relative flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
            >
              <Link
                href={`/students/${s._id}`}
                aria-label={`View results for ${s.name}`}
                className="absolute inset-0 z-10 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="sr-only">{s.name}</span>
              </Link>
              <div className="flex items-start justify-between gap-2">
                <span className="grid size-10 place-items-center rounded-lg bg-secondary font-display text-sm font-bold text-secondary-foreground">
                  {initials(s.name)}
                </span>
                <DeleteStudentButton id={s._id} className="relative z-20" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-display text-base font-bold text-foreground">
                  {s.name}
                </h2>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {s.branch}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  Year {s.currentYear}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Results
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

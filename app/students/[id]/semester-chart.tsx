"use client"

import { useState } from "react"
import { ChartBarIcon } from "@/app/components/icons"
import { cn } from "@/lib/cn"

type Subject = {
  subject: string
  internal1: { marks: number }
  internal2: { marks: number }
  final: { marks: number }
}

type Semester = {
  semester: number
  subjects: Subject[]
}

type ExamKey = "internal1" | "internal2" | "final"

const W = 640
const H = 300
const PAD = { top: 20, right: 20, bottom: 60, left: 40 }
const CHART_COLORS: Record<ExamKey, string> = {
  internal1: "var(--chart-3)",
  internal2: "var(--chart-1)",
  final: "var(--chart-2)",
}
const EXAMS: { key: ExamKey; label: string }[] = [
  { key: "internal1", label: "Internal 1" },
  { key: "internal2", label: "Internal 2" },
  { key: "final", label: "Final" },
]

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s
}

export function SemesterChart({ semesters }: { semesters: Semester[] }) {
  const [semIdx, setSemIdx] = useState(0)
  const sem = semesters[semIdx]
  const subjects = sem?.subjects.filter((s) => s.subject.trim() !== "") ?? []

  const plotW = W - PAD.left - PAD.right
  const plotH = H - PAD.top - PAD.bottom
  const n = subjects.length
  const x = (i: number) =>
    n === 1 ? PAD.left + plotW / 2 : PAD.left + (i / (n - 1)) * plotW
  const y = (v: number) => PAD.top + plotH - (v / 100) * plotH

  const axisText: React.CSSProperties = { fill: "var(--muted-foreground)" }

  return (
    <section className="mt-6 rounded-xl border border-border bg-surface p-5 shadow-card">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-secondary font-display text-sm font-bold text-secondary-foreground">
            <ChartBarIcon className="size-4.5" />
          </span>
          <h3 className="font-display text-sm font-bold">Marks overview</h3>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
          {semesters.map((s, i) => (
            <button
              key={s.semester}
              onClick={() => setSemIdx(i)}
              className={cn(
                "rounded-lg px-3 py-1 text-sm font-medium transition-colors",
                i === semIdx
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              )}
            >
              Sem {s.semester}
            </button>
          ))}
        </div>
      </header>

      {n === 0 ? (
        <p className="text-sm text-muted-foreground">No subjects to chart.</p>
      ) : (
        <>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
            {[0, 20, 40, 60, 80, 100].map((v) => (
              <g key={v}>
                <line
                  x1={PAD.left}
                  y1={y(v)}
                  x2={W - PAD.right}
                  y2={y(v)}
                  style={{ stroke: "var(--chart-grid)" }}
                />
                <text
                  x={PAD.left - 6}
                  y={y(v) + 3}
                  textAnchor="end"
                  fontSize="10"
                  style={axisText}
                >
                  {v}
                </text>
              </g>
            ))}
            {EXAMS.map(({ key, label }) => (
              <g key={key}>
                <polyline
                  points={subjects
                    .map((s, i) => `${x(i)},${y(s[key].marks)}`)
                    .join(" ")}
                  fill="none"
                  stroke={CHART_COLORS[key]}
                  strokeWidth={2}
                />
                {subjects.map((s, i) => (
                  <circle
                    key={`${label}-${i}`}
                    cx={x(i)}
                    cy={y(s[key].marks)}
                    r={3}
                    fill={CHART_COLORS[key]}
                  />
                ))}
              </g>
            ))}
            {subjects.map((s, i) => (
              <text
                key={s.subject}
                x={x(i)}
                y={H - PAD.bottom + 14}
                textAnchor="middle"
                fontSize="10"
                style={axisText}
              >
                {truncate(s.subject, 14)}
              </text>
            ))}
          </svg>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
            {EXAMS.map(({ key, label }) => (
              <span
                key={key}
                className="flex items-center gap-1.5 text-muted-foreground"
              >
                <span
                  className="inline-block size-2.5 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[key] }}
                />
                {label}
              </span>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

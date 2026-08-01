"use client"

import { useState } from "react"

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
const COLORS: Record<ExamKey, string> = {
  internal1: "#f59e0b",
  internal2: "#3b82f6",
  final: "#10b981",
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

  return (
    <div className="mt-4 border-2 rounded p-4">
      <div className="flex gap-2">
        {semesters.map((s, i) => (
          <button
            key={s.semester}
            onClick={() => setSemIdx(i)}
            className={`px-4 py-1 border-2 rounded ${
              i === semIdx ? "bg-green-600 text-white" : "bg-white"
            }`}
          >
            Semester {s.semester}
          </button>
        ))}
      </div>

      {n === 0 ? (
        <p className="text-sm text-gray-500 mt-4">No subjects to chart.</p>
      ) : (
        <>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full mt-4">
            {[0, 20, 40, 60, 80, 100].map((v) => (
              <g key={v}>
                <line
                  x1={PAD.left}
                  y1={y(v)}
                  x2={W - PAD.right}
                  y2={y(v)}
                  stroke="#e5e7eb"
                />
                <text
                  x={PAD.left - 6}
                  y={y(v) + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="#9ca3af"
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
                  stroke={COLORS[key]}
                  strokeWidth={2}
                />
                {subjects.map((s, i) => (
                  <circle
                    key={`${label}-${i}`}
                    cx={x(i)}
                    cy={y(s[key].marks)}
                    r={3}
                    fill={COLORS[key]}
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
                fill="#6b7280"
              >
                {truncate(s.subject, 14)}
              </text>
            ))}
          </svg>
          <div className="flex gap-4 justify-center mt-2 text-sm">
            {EXAMS.map(({ key, label }) => (
              <span key={key} className="flex items-center gap-1">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[key] }}
                />
                {label}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

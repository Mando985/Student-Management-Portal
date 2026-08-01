"use client"

import { useState } from "react"
import { updateStudent } from "@/app/actions"
import { SemesterChart } from "./semester-chart"
import { PencilIcon } from "@/app/components/icons"
import { cn } from "@/lib/cn"

export type Student = {
  name: string
  branch: string
  currentYear: number
  academicYears: {
    year: number
    semesters: {
      semester: number
      subjects: {
        subject: string
        internal1: { marks: number }
        internal2: { marks: number }
        final: { marks: number }
      }[]
    }[]
  }[]
}

type Exam = "internal1" | "internal2" | "final"

const inputCls =
  "rounded-lg border border-border bg-surface px-2 py-1 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
const MAX_SUBJECTS = 5
const blankSubject = {
  subject: "",
  internal1: { marks: 0 },
  internal2: { marks: 0 },
  final: { marks: 0 },
}

const pillCls = (active: boolean) =>
  cn(
    "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
    active
      ? "bg-primary text-primary-foreground shadow-card"
      : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
  )

function padToFive(s: Student): Student {
  return {
    ...s,
    academicYears: s.academicYears.map((y) => ({
      ...y,
      semesters: y.semesters.map((sem) => ({
        ...sem,
        subjects: [
          ...sem.subjects.map((sub) => ({ ...sub })),
          ...Array.from(
            { length: Math.max(0, MAX_SUBJECTS - sem.subjects.length) },
            () => ({ ...blankSubject })
          ),
        ],
      })),
    })),
  }
}

function cleanEmpty(s: Student): Student {
  return {
    ...s,
    academicYears: s.academicYears.map((y) => ({
      ...y,
      semesters: y.semesters.map((sem) => ({
        ...sem,
        subjects: sem.subjects.filter((sub) => sub.subject.trim() !== ""),
      })),
    })),
  }
}

export function StudentTabs({ student, id }: { student: Student; id: string }) {
  const [activeYear, setActiveYear] = useState(student.academicYears[0].year)
  const [semIdx, setSemIdx] = useState(0)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [draft, setDraft] = useState(student)

  const yearIdx = draft.academicYears.findIndex((y) => y.year === activeYear)
  const active = draft.academicYears[yearIdx]
  const semesters = active?.semesters ?? []
  const safeSemIdx = Math.min(semIdx, Math.max(0, semesters.length - 1))

  function patchSubject(semIdx: number, subIdx: number, patch: object) {
    setDraft((prev) => ({
      ...prev,
      academicYears: prev.academicYears.map((y, yi) =>
        yi === yearIdx
          ? {
              ...y,
              semesters: y.semesters.map((s, si) =>
                si === semIdx
                  ? {
                      ...s,
                      subjects: s.subjects.map((sub, i) =>
                        i === subIdx ? { ...sub, ...patch } : sub
                      ),
                    }
                  : s
              ),
            }
          : y
      ),
    }))
  }

  async function handleSave() {
    const cleaned = cleanEmpty(draft)
    setSaving(true)
    await updateStudent(id, cleaned)
    setDraft(cleaned)
    setSaving(false)
    setEditing(false)
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-surface p-1 shadow-card">
          {draft.academicYears.map((year) => (
            <button
              key={year.year}
              onClick={() => {
                setActiveYear(year.year)
                setSemIdx(0)
              }}
              className={pillCls(year.year === activeYear)}
            >
              Year {year.year}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {editing ? (
            <>
              <div
                className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1"
                aria-label="Current year"
              >
                {[1, 2, 3, 4].map((y) => (
                  <button
                    key={y}
                    onClick={() => setDraft((prev) => ({ ...prev, currentYear: y }))}
                    className={pillCls(draft.currentYear === y)}
                  >
                    Year {y}
                  </button>
                ))}
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setDraft(student)
                  setEditing(false)
                }}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setDraft(padToFive(student))
                setEditing(true)
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-card transition-colors hover:bg-surface-2"
            >
              <PencilIcon className="size-4" />
              Edit marks
            </button>
          )}
        </div>
      </div>

      {active && (
        <div className="mt-6">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1 shadow-card w-fit">
            {semesters.map((s, i) => (
              <button
                key={s.semester}
                onClick={() => setSemIdx(i)}
                className={pillCls(i === safeSemIdx)}
              >
                Sem {s.semester}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${safeSemIdx * 100}%)` }}
            >
              {semesters.map((sem) => (
                <div key={sem.semester} className="w-full shrink-0">
                  <section className="rounded-xl border border-border bg-surface p-5 shadow-card">
                    <header className="mb-4 flex items-center gap-2.5">
                      <span className="grid size-8 place-items-center rounded-lg bg-secondary font-display text-sm font-bold text-secondary-foreground">
                        {sem.semester}
                      </span>
                      <h3 className="font-display text-sm font-bold">
                        Semester {sem.semester}
                      </h3>
                    </header>
                    {sem.subjects.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No subjects yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                              <th className="py-2 pr-4 font-medium">Subject</th>
                              <th className="px-2 py-2 text-right font-medium">
                                Internal 1
                              </th>
                              <th className="px-2 py-2 text-right font-medium">
                                Internal 2
                              </th>
                              <th className="px-2 py-2 text-right font-medium">Final</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sem.subjects.map((sub, subIdx) => {
                              const examInput = (exam: Exam) => (
                                <input
                                  type="number"
                                  aria-label={`${sub.subject || "Subject"} ${exam} marks`}
                                  value={sub[exam].marks}
                                  onChange={(e) =>
                                    patchSubject(safeSemIdx, subIdx, {
                                      [exam]: { marks: Number(e.target.value) },
                                    })
                                  }
                                  className={`${inputCls} w-16 text-right`}
                                />
                              )
                              return (
                                <tr key={subIdx} className="border-b border-border/60 last:border-0">
                                  <td className="py-2 pr-4">
                                    {editing ? (
                                      <input
                                        type="text"
                                        aria-label="Subject name"
                                        value={sub.subject}
                                        onChange={(e) =>
                                          patchSubject(safeSemIdx, subIdx, {
                                            subject: e.target.value,
                                          })
                                        }
                                        className={`${inputCls} w-full`}
                                      />
                                    ) : (
                                      <span className="font-medium text-foreground">
                                        {sub.subject}
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-2 py-2 text-right tabular-nums">
                                    {editing
                                      ? examInput("internal1")
                                      : sub.internal1.marks}
                                  </td>
                                  <td className="px-2 py-2 text-right tabular-nums">
                                    {editing
                                      ? examInput("internal2")
                                      : sub.internal2.marks}
                                  </td>
                                  <td className="px-2 py-2 text-right font-semibold tabular-nums">
                                    {editing ? examInput("final") : sub.final.marks}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>

                  {!editing && <SemesterChart semester={sem} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

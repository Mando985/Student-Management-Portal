"use client"

import { useState } from "react"
import { updateStudent } from "@/app/actions"

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

const inputCls = "border-2 rounded px-1"
const btnCls = "px-4 py-1 border-2 rounded"
const MAX_SUBJECTS = 5
const blankSubject = {
  subject: "",
  internal1: { marks: 0 },
  internal2: { marks: 0 },
  final: { marks: 0 },
}

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
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [draft, setDraft] = useState(student)

  const yearIdx = draft.academicYears.findIndex((y) => y.year === activeYear)
  const active = draft.academicYears[yearIdx]

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
    <>
      <div className="absolute top-6 right-6 flex gap-2">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`${btnCls} bg-green-600 text-white disabled:opacity-50`}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setDraft(student)
                setEditing(false)
              }}
              className={`${btnCls} bg-white`}
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
            className={`${btnCls} bg-white`}
          >
            Edit
          </button>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        {draft.academicYears.map((year) => (
          <button
            key={year.year}
            onClick={() => setActiveYear(year.year)}
            className={`px-4 py-2 border-2 rounded ${
              year.year === activeYear ? "bg-green-600 text-white" : "bg-white"
            }`}
          >
            Year {year.year}
          </button>
        ))}
      </div>

      {active?.semesters.map((sem, semIdx) => (
        <div key={sem.semester} className="mt-4 border-2 rounded p-4">
          <h3 className="font-medium">Semester {sem.semester}</h3>
          {sem.subjects.length === 0 ? (
            <p className="text-sm text-gray-500">No subjects yet.</p>
          ) : (
            <table className="w-full text-sm mt-2">
              <thead>
                <tr className="text-left border-b-2">
                  <th className="py-1">Subject</th>
                  <th>Internal 1</th>
                  <th>Internal 2</th>
                  <th>Final</th>
                </tr>
              </thead>
              <tbody>
                {sem.subjects.map((sub, subIdx) => {
                  const examInput = (exam: Exam) => (
                    <input
                      type="number"
                      value={sub[exam].marks}
                      onChange={(e) =>
                        patchSubject(semIdx, subIdx, {
                          [exam]: { marks: Number(e.target.value) },
                        })
                      }
                      className={`${inputCls} w-16`}
                    />
                  )
                  return (
                    <tr key={subIdx} className="border-b">
                      <td className="py-1">
                        {editing ? (
                          <input
                            type="text"
                            value={sub.subject}
                            onChange={(e) =>
                              patchSubject(semIdx, subIdx, {
                                subject: e.target.value,
                              })
                            }
                            className={`${inputCls} w-full`}
                          />
                        ) : (
                          sub.subject
                        )}
                      </td>
                      <td>{editing ? examInput("internal1") : sub.internal1.marks}</td>
                      <td>{editing ? examInput("internal2") : sub.internal2.marks}</td>
                      <td>{editing ? examInput("final") : sub.final.marks}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </>
  )
}

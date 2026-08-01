"use client"

import { useState } from "react"
import Link from "next/link"
import { DeleteStudentButton } from "./delete-student-button"

type Student = {
  _id: string
  name: string
  branch: string
  currentYear: number
}

export type { Student }

export function StudentGrid({ students }: { students: Student[] }) {
  const [year, setYear] = useState<number | null>(null)
  const filtered = year
    ? students.filter((s) => s.currentYear === year)
    : students

  return (
    <>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setYear(null)}
          className={`px-4 py-2 border-2 rounded ${
            year === null ? "bg-green-600 text-white" : "bg-white"
          }`}
        >
          All
        </button>
        {[1, 2, 3, 4].map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`px-4 py-2 border-2 rounded ${
              year === y ? "bg-green-600 text-white" : "bg-white"
            }`}
          >
            Year {y}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {filtered.map((s) => (
          <div key={s._id} className="relative">
            <Link
              href={`/students/${s._id}`}
              className="border-2 rounded p-4 block hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{s.name}</h2>
              <p>{s.branch}</p>
              <p>Year {s.currentYear}</p>
            </Link>
            <DeleteStudentButton id={s._id} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-4 text-gray-500">No students in this year.</p>
      )}
    </>
  )
}

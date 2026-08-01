import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { AddStudentForm } from "./add-student-form"

type Student = {
  _id: { toString(): string }
  name: string
  branch: string
  currentYear: number
}

export const dynamic = "force-dynamic"

export default async function Home() {
  const client = await clientPromise
  const students = await client
    .db("students")
    .collection<Student>("students")
    .find({})
    .toArray()

  return (
    <div className="flex flex-col h-screen">
      <div className="border-2 basis-1/5">
        <p>Here goes the the top part</p>
      </div>
      <div className="border-2 basis-4/5 overflow-auto p-4">
        <AddStudentForm />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {students.map((s) => (
            <Link
              key={String(s._id)}
              href={`/students/${s._id}`}
              className="border-2 rounded p-4 block hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{s.name}</h2>
              <p>{s.branch}</p>
              <p>Year {s.currentYear}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

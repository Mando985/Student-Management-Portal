import clientPromise from "@/lib/mongodb"
import { AddStudentForm } from "./add-student-form"
import { StudentGrid, type Student } from "./student-grid"

export const dynamic = "force-dynamic"

export default async function Home() {
  const client = await clientPromise
  const docs = await client
    .db("students")
    .collection<Student>("students")
    .find({})
    .toArray()

  const students = docs.map((s) => ({
    _id: s._id.toString(),
    name: s.name,
    branch: s.branch,
    currentYear: s.currentYear,
  }))

  return (
    <div className="flex flex-col h-screen">
      <div className="border-2 basis-1/5">
        <p>Student Management Portal</p>
      </div>
      <div className="border-2 basis-4/5 overflow-auto p-4">
        <AddStudentForm />
        <StudentGrid students={students} />
      </div>
    </div>
  )
}

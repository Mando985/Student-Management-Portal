import { ObjectId } from "mongodb"
import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { StudentTabs, type Student } from "./student-tabs"

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const client = await clientPromise
  const student = await client
    .db("students")
    .collection<Student>("students")
    .findOne({ _id: new ObjectId(id) })

  if (!student) return <p>Student not found.</p>

  const { _id, ...data } = student as Student & { _id: ObjectId }

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <Link href="/" className="text-blue-600 underline">
        Back
      </Link>
      <h1 className="text-2xl font-bold mt-4">{student.name}</h1>
      <p>{student.branch}</p>
      <p>Year {student.currentYear}</p>
      <StudentTabs student={data} id={id} />
    </div>
  )
}

import clientPromise from "@/lib/mongodb"
import { AddStudentForm } from "./add-student-form"
import { StudentGrid, type Student } from "./student-grid"
import { SiteHeader } from "./components/site-header"

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
    <>
      <SiteHeader actions={<AddStudentForm />} />
      <main className="container-page py-8 sm:py-10">
        <section className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            Academic Records
          </p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Students</h1>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground sm:text-base">
            View and manage academic results for every student across all
            semesters.
          </p>
        </section>
        <StudentGrid students={students} />
      </main>
    </>
  )
}

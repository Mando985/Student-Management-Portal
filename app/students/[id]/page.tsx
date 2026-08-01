import { ObjectId } from "mongodb"
import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { StudentTabs, type Student } from "./student-tabs"
import { SiteHeader } from "@/app/components/site-header"
import { ArrowLeftIcon } from "@/app/components/icons"
import { initials } from "@/lib/initials"

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

  if (!student) {
    return (
      <>
        <SiteHeader />
        <main className="container-page py-8 sm:py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            All students
          </Link>
          <div className="mt-8 flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
            <p className="font-display font-semibold">Student not found</p>
            <p className="text-sm text-muted-foreground">
              This student may have been removed.
            </p>
          </div>
        </main>
      </>
    )
  }

  const data: Student = {
    name: student.name,
    branch: student.branch,
    currentYear: student.currentYear,
    academicYears: student.academicYears,
  }

  return (
    <>
      <SiteHeader />
      <main className="container-page py-8 sm:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          All students
        </Link>

        <header className="mt-5 flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary font-display text-lg font-bold text-primary-foreground shadow-card">
            {initials(student.name)}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold sm:text-3xl">
              {student.name}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{student.branch}</span>
              <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium">
                Year {student.currentYear}
              </span>
            </div>
          </div>
        </header>

        <StudentTabs student={data} id={id} />
      </main>
    </>
  )
}

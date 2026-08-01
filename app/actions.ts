"use server"

import { revalidatePath, refresh } from "next/cache"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import type { Student } from "@/app/students/[id]/student-tabs"

export type AddStudentState = { success?: boolean; message?: string }

function buildAcademicYears() {
  return [1, 2, 3, 4].map((year) => ({
    year,
    semesters: [1, 2].map((i) => ({
      semester: (year - 1) * 2 + i,
      subjects: [],
    })),
  }))
}

export async function addStudent(
  prevState: AddStudentState,
  formData: FormData
): Promise<AddStudentState> {
  const name = String(formData.get("name") ?? "").trim()
  const branch = String(formData.get("branch") ?? "").trim()
  const currentYear = Number(formData.get("currentYear"))

  if (!name || !branch || !currentYear) {
    return { message: "Name, branch and year are required." }
  }

  const client = await clientPromise
  await client.db("students").collection("students").insertOne({
    name,
    branch,
    currentYear,
    academicYears: buildAcademicYears(),
  })

  revalidatePath("/")
  return { success: true }
}

export async function updateStudent(id: string, data: Student) {
  if (!ObjectId.isValid(id) || !Array.isArray(data?.academicYears)) {
    throw new Error("Invalid student data")
  }

  const client = await clientPromise
  await client
    .db("students")
    .collection("students")
    .updateOne({ _id: new ObjectId(id) }, { $set: data })

  refresh()
}

export type Subject = {
  subject: string
  internal1: { marks: number }
  internal2: { marks: number }
  final: { marks: number }
}

export type Semester = {
  semester: number
  subjects: Subject[]
}

export type Student = {
  name: string
  branch: string
  currentYear: number
  academicYears: {
    year: number
    semesters: Semester[]
  }[]
}

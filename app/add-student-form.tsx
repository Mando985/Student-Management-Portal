"use client"

import { useEffect, useState } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { addStudent, type AddStudentState } from "./actions"

const initialState: AddStudentState = {}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-green-600 text-white w-full h-9 rounded-sm disabled:opacity-50"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  )
}

export function AddStudentForm() {
  const [open, setOpen] = useState(false)
  const [state, formAction] = useActionState(addStudent, initialState)

  useEffect(() => {
    if (state?.success) setOpen(false)
  }, [state])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 text-white w-40 h-8 rounded-sm"
      >
        Add Student
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded border-2 w-96">
            <h2 className="text-lg font-semibold mb-4">Add Student</h2>
            <form action={formAction} className="flex flex-col gap-3">
              <div>
                <label htmlFor="name" className="block text-sm">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="border-2 rounded w-full p-1"
                />
              </div>
              <div>
                <label htmlFor="branch" className="block text-sm">
                  Branch
                </label>
                <input
                  id="branch"
                  name="branch"
                  required
                  placeholder="e.g. Computer Science and Engineering"
                  className="border-2 rounded w-full p-1"
                />
              </div>
              <div>
                <label htmlFor="currentYear" className="block text-sm">
                  Current Year
                </label>
                <select
                  id="currentYear"
                  name="currentYear"
                  required
                  defaultValue="1"
                  className="border-2 rounded w-full p-1"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              {state?.message && (
                <p aria-live="polite" className="text-red-600 text-sm">
                  {state.message}
                </p>
              )}
              <SubmitButton />
            </form>
          </div>
        </div>
      )}
    </>
  )
}

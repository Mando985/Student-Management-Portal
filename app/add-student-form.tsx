"use client"

import { useEffect, useState } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { addStudent, type AddStudentState } from "./actions"
import { Modal } from "./components/modal"
import { PlusIcon } from "./components/icons"

const initialState: AddStudentState = {}

const fieldCls =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
const labelCls = "mb-1.5 block text-sm font-medium text-foreground"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <PlusIcon className="size-4" />
      {pending ? "Saving..." : "Add Student"}
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
        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-primary/90"
      >
        <PlusIcon className="size-4" />
        Add Student
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Student">
        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className={labelCls}>
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="e.g. Aarav Sharma"
              className={fieldCls}
            />
          </div>
          <div>
            <label htmlFor="branch" className={labelCls}>
              Branch
            </label>
            <input
              id="branch"
              name="branch"
              required
              placeholder="e.g. Computer Science and Engineering"
              className={fieldCls}
            />
          </div>
          <div>
            <label htmlFor="currentYear" className={labelCls}>
              Current Year
            </label>
            <select id="currentYear" name="currentYear" required defaultValue="1" className={fieldCls}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          {state?.message && (
            <p aria-live="polite" role="alert" className="text-sm text-destructive">
              {state.message}
            </p>
          )}
          <SubmitButton />
        </form>
      </Modal>
    </>
  )
}

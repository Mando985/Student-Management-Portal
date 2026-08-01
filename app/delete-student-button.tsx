"use client"

import { useState } from "react"
import { deleteStudent } from "./actions"

export function DeleteStudentButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  async function confirm() {
    setPending(true)
    await deleteStudent(id)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        aria-label="Delete student"
        onClick={() => setOpen(true)}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded border-2 w-96">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete the student?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={pending}
                className="border-2 rounded px-4 py-1 disabled:opacity-50"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={pending}
                className="bg-red-600 text-white rounded px-4 py-1 disabled:opacity-50"
              >
                {pending ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { useState } from "react"
import { deleteStudent } from "./actions"
import { Modal } from "./components/modal"
import { TrashIcon } from "./components/icons"

export function DeleteStudentButton({
  id,
  className,
}: {
  id: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleDelete() {
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
        className={`grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive ${className ?? ""}`}
      >
        <TrashIcon className="size-4.5" />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Delete student?">
        <p className="text-sm text-muted-foreground">
          This will permanently remove the student and all their academic
          results. This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={pending}
            className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  )
}

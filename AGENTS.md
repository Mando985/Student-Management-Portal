<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# next-app

Student result-management app: a single-page homepage plus per-student detail/edit views. Server-rendered pages + client components for interactivity, MongoDB for persistence. No test suite exists.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build; runs TypeScript typecheck. Does NOT run lint.
- `npm run lint` — eslint (separate from build; run after changes)
- No tests configured.

## Data & setup

- Requires `MONGODB_URI` in `.env` (already present). App connects via `@/lib/mongodb` `clientPromise` (global singleton in dev).
- DB name `students`, collection `students`. Document shape: `name`, `branch`, `currentYear` (1–4), `academicYears` (4 years × 2 semesters each, ≤5 subjects, each with `internal1/internal2/final` marks).
- The `Student` type is defined and exported from `app/students/[id]/student-tabs.tsx`; reuse it rather than redefining.

## Architecture

- Server actions live in `app/actions.ts` (`"use server"`). Mutations call `revalidatePath("/")`; `updateStudent` uses `refresh()` from `next/cache`.
- `app/page.tsx` is a server component (`dynamic = "force-dynamic"`) that fetches students directly from Mongo.
- Homepage interactivity (year filter, add/delete forms) is in client components under `app/` (`student-grid.tsx`, `add-student-form.tsx`, `delete-student-button.tsx`).
- Path alias `@/*` → project root.

## Gotchas

- **Never pass Mongo documents (with `ObjectId._id`) as props to client components** — Next errors: "Only plain objects can be passed to Client Components." Serialize first (e.g. `_id: s._id.toString()`).
- Lint has a pre-existing error in `app/add-student-form.tsx` (`react-hooks/set-state-in-effect`, line ~28). It is unrelated to feature work; don't chase it unless asked.

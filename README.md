# Student Management Portal

A student result-management app: a single-page homepage plus per-student detail/edit views. Server-rendered pages with client components for interactivity, MongoDB for persistence.

**Live demo:** https://student-management-portal-nine-pink.vercel.app?_vercel_share=j53YLglg5dtPYSljTH0To7Iz7saU5pYH

## Features

- Homepage with year filter and add/delete student forms
- Per-student detail view with semester tabs, marks editing, and charts
- Marks restricted to 0–100
- Recharts-based semester charts

## Getting Started

Requires Node.js and a MongoDB URI.

```bash
npm install
# add MONGODB_URI to .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build (runs TypeScript typecheck)
- `npm run lint` — eslint

## Tech Stack

- [Next.js](https://nextjs.org) (App Router, server actions)
- MongoDB (via the official Node driver, `@/lib/mongodb` singleton)
- React client components
- [Recharts](https://recharts.org) for charts
- Tailwind CSS v4

## Project Structure

- `app/page.tsx` — homepage (server component)
- `app/actions.ts` — server actions for CRUD
- `app/students/[id]/` — detail/edit views
- `components/ui/` — trimmed shadcn-style primitives
- `lib/mongodb.ts` — DB connection

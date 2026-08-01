"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/area-charts-2"
import { ChartBarIcon } from "@/app/components/icons"

type Subject = {
  subject: string
  internal1: { marks: number }
  internal2: { marks: number }
  final: { marks: number }
}

export type Semester = {
  semester: number
  subjects: Subject[]
}

const chartConfig = {
  internal1: { label: "Internal 1", color: "var(--chart-3)" },
  internal2: { label: "Internal 2", color: "var(--chart-1)" },
  final: { label: "Final", color: "var(--chart-2)" },
} satisfies ChartConfig

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s
}

export function SemesterChart({ semester }: { semester: Semester }) {
  const data = semester.subjects
    .filter((s) => s.subject.trim() !== "")
    .map((s) => ({
      subject: truncate(s.subject, 14),
      internal1: s.internal1.marks,
      internal2: s.internal2.marks,
      final: s.final.marks,
    }))

  return (
    <section className="mt-6 rounded-xl border border-border bg-surface p-5 shadow-card">
      <header className="mb-4 flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-secondary font-display text-sm font-bold text-secondary-foreground">
          <ChartBarIcon className="size-4.5" />
        </span>
        <h3 className="font-display text-sm font-bold">Marks overview</h3>
      </header>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No subjects to chart.</p>
      ) : (
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
            <XAxis
              dataKey="subject"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              tickCount={6}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              width={36}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            <Area
              dataKey="internal1"
              type="natural"
              fill="var(--color-internal1)"
              fillOpacity={0.2}
              stroke="var(--color-internal1)"
              strokeWidth={2}
            />
            <Area
              dataKey="internal2"
              type="natural"
              fill="var(--color-internal2)"
              fillOpacity={0.2}
              stroke="var(--color-internal2)"
              strokeWidth={2}
            />
            <Area
              dataKey="final"
              type="natural"
              fill="var(--color-final)"
              fillOpacity={0.2}
              stroke="var(--color-final)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      )}
    </section>
  )
}

"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { SurfaceCard } from "@/components/layout/surface-card"

export function BookingsLineChart({
  data,
}: {
  data: Array<{ label: string; value: number }>
}) {
  return (
    <SurfaceCard className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Bookings over time</h3>
        <p className="text-sm text-[var(--kt-muted-foreground)]">Server shell can pre-read summary totals. This chart hydrates as a client island.</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line dataKey="value" type="monotone" strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SurfaceCard>
  )
}

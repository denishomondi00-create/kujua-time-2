"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { SurfaceCard } from "@/components/layout/surface-card"

export function RevenueBarChart({
  data,
}: {
  data: Array<{ label: string; value: number }>
}) {
  return (
    <SurfaceCard className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Revenue</h3>
        <p className="text-sm text-[var(--kt-muted-foreground)]">Useful for dashboard widgets where TanStack Query owns client refresh.</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SurfaceCard>
  )
}

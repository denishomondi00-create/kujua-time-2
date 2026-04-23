"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { SurfaceCard } from "@/components/layout/surface-card"

const palette = ["#0d4e5c", "#e87a3e", "#1f8f67", "#2563eb", "#c2414d"]

export function DistributionDonutChart({
  title,
  data,
}: {
  title: string
  data: Array<{ label: string; value: number }>
}) {
  return (
    <SurfaceCard className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie data={data} dataKey="value" nameKey="label" innerRadius={68} outerRadius={98} paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell key={entry.label} fill={palette[index % palette.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </SurfaceCard>
  )
}

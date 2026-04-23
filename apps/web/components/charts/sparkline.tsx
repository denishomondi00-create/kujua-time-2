"use client"

import { Area, AreaChart, ResponsiveContainer } from "recharts"

export function Sparkline({
  data,
}: {
  data: Array<{ value: number }>
}) {
  return (
    <div className="h-12 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area dataKey="value" type="monotone" strokeWidth={2} fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

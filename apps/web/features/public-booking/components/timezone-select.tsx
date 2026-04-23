"use client"

import { SelectInput } from "@/components/forms/select-input"
import { buildTimezoneOptions } from "@/lib/utils/timezone"

export function TimezoneSelect({
  value,
  onChange,
  extraTimezones = [],
}: {
  value: string
  onChange: (value: string) => void
  extraTimezones?: string[]
}) {
  const options = buildTimezoneOptions(extraTimezones)

  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold">Timezone</span>
      <SelectInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectInput>
    </label>
  )
}

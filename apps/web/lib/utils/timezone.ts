export const DEFAULT_TIMEZONE =
  Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Nairobi"

export function getBrowserTimezone() {
  return DEFAULT_TIMEZONE
}

export function buildTimezoneOptions(timezones: string[] = []) {
  const values = new Set([DEFAULT_TIMEZONE, "UTC", "Africa/Nairobi", ...timezones])
  return Array.from(values).sort().map((value) => ({
    label: value.replaceAll("_", " "),
    value,
  }))
}

export async function copyText(value: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) return false
  await navigator.clipboard.writeText(value)
  return true
}

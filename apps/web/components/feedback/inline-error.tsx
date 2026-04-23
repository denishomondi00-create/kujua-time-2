export function InlineError({ message }: { message?: string | null }) {
  if (!message) return null

  return <p className="text-sm font-medium text-rose-600">{message}</p>
}

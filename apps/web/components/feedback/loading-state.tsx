export function LoadingState({
  label = "Loading…",
}: {
  label?: string
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-[var(--kt-muted-foreground)]">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--kt-border)] border-t-[var(--kt-accent)]" />
      <span>{label}</span>
    </div>
  )
}

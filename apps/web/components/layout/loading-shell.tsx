export function LoadingShell({
  lines = 4,
}: {
  lines?: number
}) {
  return (
    <div className="kt-card space-y-4 p-5">
      <div className="h-8 w-40 animate-pulse rounded-full bg-[var(--kt-muted)]" />
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 animate-pulse rounded-full bg-[var(--kt-muted)]"
          style={{ width: `${100 - index * 8}%` }}
        />
      ))}
    </div>
  )
}

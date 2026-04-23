export function TimelineList({
  items,
}: {
  items: Array<{ id: string; title: string; description: string; time: string }>
}) {
  return (
    <ol className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="flex gap-3">
          <span className="mt-1 h-3 w-3 rounded-full bg-[var(--kt-accent)]" />
          <div className="space-y-1">
            <div className="text-sm font-semibold">{item.title}</div>
            <p className="text-sm text-[var(--kt-muted-foreground)]">{item.description}</p>
            <div className="text-xs uppercase tracking-[0.14em] text-[var(--kt-muted-foreground)]">{item.time}</div>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function KeyValueList({
  items,
}: {
  items: Array<{ label: string; value: string }>
}) {
  return (
    <dl className="divide-y divide-[var(--kt-border)]">
      {items.map((item) => (
        <div key={item.label} className="flex items-start justify-between gap-4 py-3">
          <dt className="text-sm text-[var(--kt-muted-foreground)]">{item.label}</dt>
          <dd className="text-right text-sm font-medium text-[var(--kt-foreground)]">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

import Link from "next/link"

export function PublicBookingBrandLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 font-semibold text-[var(--kt-accent)]"
    >
      <span className="grid h-8 w-8 place-items-center rounded-2xl bg-[var(--kt-accent)] text-sm text-white">
        KT
      </span>
      <span>Kujua Time</span>
    </Link>
  )
}

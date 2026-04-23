export function formatMoney(amountMinor: number, currency = "USD", locale = "en-US") {
  const amount = amountMinor / 100
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function isZeroMoney(amountMinor?: number | null) {
  return !amountMinor || amountMinor <= 0
}

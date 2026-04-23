export function getCsrfToken() {
  if (typeof document === "undefined") return undefined
  return document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("kt_csrf="))
    ?.split("=")[1]
}

export function csrfHeader() {
  const token = getCsrfToken()
  return token ? { "x-csrf-token": token } : {}
}

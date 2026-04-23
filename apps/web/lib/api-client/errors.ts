import type { ApiErrorPayload } from "@/lib/api-client/types"

export class ApiClientError extends Error {
  status: number
  code?: string
  details?: unknown

  constructor(payload: ApiErrorPayload) {
    super(payload.message)
    this.name = "ApiClientError"
    this.status = payload.status ?? 500
    this.code = payload.code
    this.details = payload.details
  }
}

export function isApiClientError(value: unknown): value is ApiClientError {
  return value instanceof ApiClientError
}

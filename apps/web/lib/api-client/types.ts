export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

export type RequestConfig = {
  method?: HttpMethod
  headers?: HeadersInit
  body?: unknown
  cache?: RequestCache
  next?: NextFetchRequestConfig
  signal?: AbortSignal
  auth?: "required" | "optional" | "none"
}

export type ApiSuccess<T> = {
  data: T
  meta?: Record<string, unknown>
}

export type ApiErrorPayload = {
  message: string
  code?: string
  status?: number
  details?: unknown
}

import { ApiClientError } from "@/lib/api-client/errors"
import type { ApiSuccess, RequestConfig } from "@/lib/api-client/types"
import { apiUrl } from "@/lib/utils/urls"

async function safeJson(response: Response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}

function unwrap<T>(payload: ApiSuccess<T> | T) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiSuccess<T>).data
  }

  return payload as T
}

export const publicApiClient = {
  async request<T>(path: string, config: RequestConfig = {}) {
    const response = await fetch(apiUrl(path), {
      method: config.method ?? "GET",
      headers: {
        "content-type": "application/json",
        ...(config.headers ?? {}),
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
      cache: config.cache ?? "no-store",
      next: config.next,
    })

    if (!response.ok) {
      const payload = await safeJson(response)
      throw new ApiClientError({
        message: payload?.message ?? "Public request failed",
        code: payload?.code,
        status: response.status,
        details: payload?.details,
      })
    }

    const json = (await safeJson(response)) as ApiSuccess<T> | T
    return unwrap<T>(json)
  },
}

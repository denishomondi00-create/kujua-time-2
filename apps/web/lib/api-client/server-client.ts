import "server-only"

import { cookies } from "next/headers"

import { ApiClientError } from "@/lib/api-client/errors"
import type { ApiSuccess, RequestConfig } from "@/lib/api-client/types"
import { apiUrl } from "@/lib/utils/urls"

function buildHeaders(headers?: HeadersInit, authToken?: string) {
  const nextHeaders = new Headers(headers)
  nextHeaders.set("content-type", "application/json")
  if (authToken) {
    nextHeaders.set("authorization", `Bearer ${authToken}`)
  }

  return nextHeaders
}

export const serverApiClient = {
  async request<T>(path: string, config: RequestConfig = {}) {
    const store = await cookies()
    const accessToken = config.auth === "none" ? undefined : store.get("kt_access_token")?.value

    const response = await fetch(apiUrl(path), {
      method: config.method ?? "GET",
      headers: buildHeaders(config.headers, accessToken),
      cache: config.cache ?? "no-store",
      next: config.next,
      body: config.body ? JSON.stringify(config.body) : undefined,
    })

    if (!response.ok) {
      const payload = await safeJson(response)
      throw new ApiClientError({
        message: payload?.message ?? "Server request failed",
        code: payload?.code,
        status: response.status,
        details: payload?.details,
      })
    }

    const json = (await safeJson(response)) as ApiSuccess<T> | T
    return unwrap<T>(json)
  },
}

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

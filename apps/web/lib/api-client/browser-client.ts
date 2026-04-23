"use client"

import { ApiClientError } from "@/lib/api-client/errors"
import type { ApiSuccess, RequestConfig } from "@/lib/api-client/types"
import { csrfHeader } from "@/lib/auth/csrf"
import { getBrowserAccessToken } from "@/lib/auth/session"
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

export const browserApiClient = {
  async request<T>(path: string, config: RequestConfig = {}) {
    const accessToken = config.auth === "none" ? undefined : getBrowserAccessToken()
    const headers = new Headers(config.headers)

    if (!headers.has("content-type")) {
      headers.set("content-type", "application/json")
    }

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`)
    }

    Object.entries(csrfHeader()).forEach(([key, value]) => headers.set(key, value))

    const response = await fetch(apiUrl(path), {
      method: config.method ?? "GET",
      headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
      signal: config.signal,
      credentials: "include",
    })

    if (!response.ok) {
      const payload = await safeJson(response)
      throw new ApiClientError({
        message: payload?.message ?? "Request failed",
        code: payload?.code,
        status: response.status,
        details: payload?.details,
      })
    }

    const json = (await safeJson(response)) as ApiSuccess<T> | T
    return unwrap<T>(json)
  },
}

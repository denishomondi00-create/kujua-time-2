import { browserApiClient } from "@/lib/api-client/browser-client"

export async function refreshSession() {
  return browserApiClient.request<{ accessToken: string; refreshToken?: string }>(
    "/v1/auth/refresh",
    { method: "POST", auth: "optional" },
  )
}

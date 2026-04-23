import { NextResponse } from "next/server"

import { ApiClientError } from "@/lib/api-client/errors"

export function routeOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init)
}

export function routeError(error: unknown) {
  if (error instanceof ApiClientError) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
        },
      },
      { status: error.status },
    )
  }

  return NextResponse.json(
    {
      error: {
        message: error instanceof Error ? error.message : "Unexpected route error",
      },
    },
    { status: 500 },
  )
}

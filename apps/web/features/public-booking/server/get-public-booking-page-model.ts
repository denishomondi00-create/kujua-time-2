import "server-only"

import { publicApiClient } from "@/lib/api-client/public-client"
import { buildPublicBookingApiPath } from "@/lib/utils/urls"
import {
  publicBookingPageModelSchema,
  type PublicBookingPageModel,
} from "@/features/public-booking/schemas/public-booking.schemas"
import { buildFallbackPublicBookingPageModel } from "@/features/public-booking/utils/public-booking"

export async function getPublicBookingPageModel(
  workspaceSlug: string,
  pathSegments?: string[],
): Promise<PublicBookingPageModel> {
  try {
    const response = await publicApiClient.request<PublicBookingPageModel>(
      buildPublicBookingApiPath(workspaceSlug, pathSegments),
      {
        cache: "no-store",
      },
    )

    return publicBookingPageModelSchema.parse(response)
  } catch {
    return buildFallbackPublicBookingPageModel(workspaceSlug, pathSegments)
  }
}

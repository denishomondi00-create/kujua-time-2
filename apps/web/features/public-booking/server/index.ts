import 'server-only'

import { publicApiClient } from '@/lib/api-client/public-client'
import { getPublicBookingPageModel as getPublicBookingPageModelServer } from '@/features/public-booking/server/get-public-booking-page-model'
import { publicBookingLookupSchema } from '@/features/public-booking/schemas/public-booking.schemas'

export { getPublicBookingPageModelServer }

export async function getPublicBookingServer(token: string) {
  const response = await publicApiClient.request(`/v1/public/bookings/${token}`, { cache: 'no-store' })
  return publicBookingLookupSchema.parse(response)
}

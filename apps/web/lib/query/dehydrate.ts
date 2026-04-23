import { dehydrate } from "@tanstack/react-query"

import { createQueryClient } from "@/lib/query/query-client"

export async function buildDehydratedState(
  prefetcher?: (queryClient: ReturnType<typeof createQueryClient>) => Promise<void>,
) {
  const queryClient = createQueryClient()
  if (prefetcher) {
    await prefetcher(queryClient)
  }

  return dehydrate(queryClient)
}

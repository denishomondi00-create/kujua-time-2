import type { QueryClient, QueryKey } from "@tanstack/react-query"

export async function invalidateMany(queryClient: QueryClient, keys: QueryKey[]) {
  await Promise.all(keys.map((key) => queryClient.invalidateQueries({ queryKey: key })))
}

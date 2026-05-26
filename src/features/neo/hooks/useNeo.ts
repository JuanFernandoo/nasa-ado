import { useQuery } from '@tanstack/react-query'
import { fetchNeo } from '../api/neo.api'

export const neoKeys = {
  feed: (start: string, end: string) => ['neo', 'feed', start, end] as const,
}

export function useNeo(startDate: string, endDate: string) {
  return useQuery({
    queryKey: neoKeys.feed(startDate, endDate),
    queryFn: ({ signal }) => fetchNeo({ startDate, endDate, signal }),
    enabled: Boolean(startDate && endDate),
    staleTime: 1000 * 60 * 60 
  })
}
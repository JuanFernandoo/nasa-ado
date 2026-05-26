import { useQuery } from '@tanstack/react-query'
import { fetchEpicImages } from '../api/epic.api'

export const epicKeys = {
    latest: ['epic', 'latest'] as const,
    byDate: (date: string) => ['epic', 'date', date] as const,
}

export function useEpic(date?: string) {
    return useQuery({
        queryKey: date ? epicKeys.byDate(date) : epicKeys.latest,
        queryFn: ({ signal }) => fetchEpicImages({ ...(date ? { date } : {}), signal }),
        staleTime: 1000 * 60 * 60,
    })
}
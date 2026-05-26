import { useQuery } from '@tanstack/react-query'
import { fetchMarsPhotos } from '../api/mars.api'
import type { MarsFilters } from '../types/mars.types'

export const marsKeys = {
    all: ['mars'] as const,
    photos: (filters: MarsFilters) => ['mars', 'photos', filters] as const,
}

export function useMarsPhotos(filters: MarsFilters) {
    const { rover, dateMode, earthDate, sol, camera } = filters

    return useQuery({
        queryKey: marsKeys.photos(filters),
        queryFn: ({ signal }) =>
            fetchMarsPhotos({
                rover,
                ...(dateMode === 'earth' ? { earthDate } : { sol }),
                ...(camera ? { camera } : {}),
                signal,
            }),
        staleTime: 1000 * 60 * 10,
    })
}
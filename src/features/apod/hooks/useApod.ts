import { useQuery } from "@tanstack/react-query";
import type { ApodFilters } from "../types/apod.types";
import { fetchApodRange } from "../api/apod.api";

export const apodKeys = {
    all: ['apod'] as const,
    range: (start: string, end: string) => ['apod', 'range', start, end] as const
}

export function useApod({ startDate, endDate }: Pick<ApodFilters, 'startDate' | 'endDate'>) {
    return useQuery({
        queryKey: apodKeys.range(startDate, endDate),
        queryFn: ({ signal }) => fetchApodRange({ startDate, endDate, signal }),
        enabled: Boolean(startDate && endDate),
        staleTime: 1000 * 60 * 60
    })
}
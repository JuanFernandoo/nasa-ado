import { useState, useMemo } from 'react'
import { useNeo } from './hooks/useNeo'
import { NeoFilters } from './components/NeoFilters'
import { AsteroidTable } from './components/AsteroidTable'
import { PageSkeleton } from '@/shared/components/ui/PageSkeleton'
import type { NeoFilters as NeoFiltersType, SortField } from './types/neo.types'
import { sevenDaysAgo, today } from '@/shared/utils/date.utils'

const DEFAULT_FILTERS: NeoFiltersType = {
    startDate: sevenDaysAgo,
    endDate: today,
    onlyHazardous: false,
    sortField: 'distance',
    sortDirection: 'asc',
}

export default function NeoPage() {
    const [filters, setFilters] = useState<NeoFiltersType>(DEFAULT_FILTERS)

    const { data, isLoading, isError, error } = useNeo(filters.startDate, filters.endDate)

    const handleFilterChange = <K extends keyof NeoFiltersType>(
        key: K,
        value: NeoFiltersType[K],
    ) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const handleSort = (field: SortField) => {
        setFilters((prev) => ({
            ...prev,
            sortField: field,
            sortDirection: prev.sortField === field && prev.sortDirection === 'asc' ? 'desc' : 'asc',
        }))
    }

    const processedAsteroids = useMemo(() => {
        if (!data) return []

        const filtered = filters.onlyHazardous
            ? data.filter((a) => a.isHazardous)
            : data

        return [...filtered].sort((a, b) => {
            const dir = filters.sortDirection === 'asc' ? 1 : -1
            switch (filters.sortField) {
                case 'name': return a.name.localeCompare(b.name) * dir
                case 'distance': return (a.distanceKm - b.distanceKm) * dir
                case 'velocity': return (a.velocityKph - b.velocityKph) * dir
                case 'diameter': return (a.diameterMaxKm - b.diameterMaxKm) * dir
                default: return a.date.localeCompare(b.date) * dir
            }
        })
    }, [data, filters.onlyHazardous, filters.sortField, filters.sortDirection])

    const hazardousCount = useMemo(
        () => data?.filter((a) => a.isHazardous).length ?? 0,
        [data],
    )

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Objetos Cercanos a la Tierra</h1>
                <p className="mt-2 text-slate-400">
                    Asteroides y cometas que se aproximan a la Tierra, rastreados por la NASA
                </p>
            </div>

            <NeoFilters filters={filters} onChange={handleFilterChange} />

            {isLoading && <PageSkeleton />}

            {isError && (
                <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
                    <p className="text-red-400">
                        {error instanceof Error ? error.message : 'Failed to load asteroid data.'}
                    </p>
                </div>
            )}

            {!isLoading && !isError && data && (
                <>
                    <div className="mb-6 flex gap-4">
                        <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
                            <p className="text-xs text-slate-500">Total</p>
                            <p className="text-2xl font-bold text-white">{String(data.length)}</p>
                        </div>
                        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                            <p className="text-xs text-red-400">Peligrosos</p>
                            <p className="text-2xl font-bold text-red-400">{String(hazardousCount)}</p>
                        </div>
                    </div>

                    <AsteroidTable
                        asteroids={processedAsteroids}
                        sortField={filters.sortField}
                        sortDirection={filters.sortDirection}
                        onSort={handleSort}
                    />
                </>
            )}
        </div>
    )
}
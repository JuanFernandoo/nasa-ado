import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMarsPhotos } from './hooks/useMarsPhotos'
import { MarsGallery } from './components/MarsGallery'
import { PageSkeleton } from '@/shared/components/ui/PageSkeleton'
import { useFavoritesStore } from './store/favorites.store'
import type { MarsFilters as MarsFiltersType } from './types/mars.types'
import { cn } from '@/shared/utils/cn'
import { MarsFilters } from './components/MarsFilters'
import { Star } from 'lucide-react'

const DEFAULT_FILTERS: MarsFiltersType = {
    rover: 'curiosity',
    dateMode: 'earth',
    earthDate: '2015-06-03',
    sol: 1000,
    camera: '',
}

export default function MarsPage() {
    const [filters, setFilters] = useState<MarsFiltersType>(DEFAULT_FILTERS)
    const favoritesCount = useFavoritesStore((state) => state.favorites.length)

    const { data, isLoading, isError, error } = useMarsPhotos(filters)

    const handleFilterChange = <K extends keyof MarsFiltersType>(
        key: K,
        value: MarsFiltersType[K],
    ) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    return (
        <div>
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Fotos del rover de marte</h1>
                    <p className="mt-2 text-slate-400">
                        Descubre las fotos tomadas por los rovers en marte
                    </p>
                </div>

                <Link
                    to="/favorites"
                    className={cn(
                        'flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2',
                        'text-sm font-medium text-slate-300 transition-colors',
                        'hover:border-orange-500 hover:text-orange-400',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                    )}
                    aria-label={`Ver ${String(favoritesCount)} favoritos`}
                >
                    <Star className="h-4 w-4" aria-hidden="true" />
                    <span>Favoritos ({String(favoritesCount)})</span>
                </Link>
            </div>

            <MarsFilters filters={filters} onChange={handleFilterChange} />

            {isLoading && <PageSkeleton />}

            {isError && (
                <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
                    <p className="text-red-400">
                        {error instanceof Error ? error.message : 'Error al cargar las fotos'}
                    </p>
                </div>
            )}

            {!isLoading && !isError && data && (
                <MarsGallery photos={data} />
            )}
        </div>
    )
}
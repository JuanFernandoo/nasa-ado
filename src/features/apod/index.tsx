import { useState, useMemo } from 'react'
import { useApod } from './hooks/useApod'
import { ApodGallery } from './components/ApodGallery'
import { ApodModal } from './components/ApodModal'
import { PageSkeleton } from '@/shared/components/ui/PageSkeleton'
import { useDebounce } from '@/shared/hooks/useDebounce'
import type { ApodItem } from './schemas/apod.schema'
import { sevenDaysAgo, today } from './utils/apod.utils'
import { ApodFilters } from './components/ApodFilters'

export default function ApodPage() {
    const [startDate, setStartDate] = useState(sevenDaysAgo)
    const [endDate, setEndDate] = useState(today)
    const [searchText, setSearchText] = useState('')
    const [selectedItem, setSelectedItem] = useState<ApodItem | null>(null)

    const debouncedSearch = useDebounce(searchText, 400)

    const { data, isLoading, isError, error } = useApod({ startDate, endDate })

    const filteredItems = useMemo(() => {
        if (!data) return []
        if (!debouncedSearch.trim()) return data

        const query = debouncedSearch.toLowerCase()
        return data.filter(
            (item) =>
                item.title.toLowerCase().includes(query) ||
                item.explanation.toLowerCase().includes(query),
        )
    }, [data, debouncedSearch])

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Astronomy Picture of the Day
                </h1>
                <p className="mt-2 text-slate-400">
                    Explore NASA's daily astronomy images and videos.
                </p>
            </div>

            <ApodFilters
                startDate={startDate}
                endDate={endDate}
                searchText={searchText}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onSearchChange={setSearchText}
            />

            {isLoading && <PageSkeleton />}

            {isError && (
                <div
                    role="alert"
                    className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center"
                >
                    <p className="text-red-400">
                        {error instanceof Error ? error.message : 'Failed to load pictures.'}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        React Query will retry automatically.
                    </p>
                </div>
            )}

            {!isLoading && !isError && (
                <ApodGallery items={filteredItems} onSelectItem={setSelectedItem} />
            )}

            <ApodModal item={selectedItem} onClose={() => { setSelectedItem(null) }} />
        </div>
    )
}
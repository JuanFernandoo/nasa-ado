import { useState } from 'react'
import { useEpic } from './hooks/useEpic'
import { EpicFilters } from './components/EpicFilters'
import { EpicGallery } from './components/EpicGallery'
import { PageSkeleton } from '@/shared/components/ui/PageSkeleton'

export default function EpicPage() {
    const [date, setDate] = useState('')

    const { data, isLoading, isError, error } = useEpic(date || undefined)

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">EPIC Earth Images</h1>
                <p className="mt-2 text-slate-400">
                    Full-disc natural color images of Earth from the DSCOVR satellite.
                </p>
            </div>

            <EpicFilters
                date={date}
                onDateChange={setDate}
                onReset={() => { setDate('') }}
            />

            {isLoading && <PageSkeleton />}

            {isError && (
                <div
                    role="alert"
                    className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center"
                >
                    <p className="text-red-400">
                        {error instanceof Error ? error.message : 'Failed to load EPIC images.'}
                    </p>
                </div>
            )}

            {!isLoading && !isError && data && (
                <EpicGallery images={data} />
            )}
        </div>
    )
}
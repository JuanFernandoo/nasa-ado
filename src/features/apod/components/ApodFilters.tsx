import { cn } from "@/shared/utils/cn"
import { today } from "@/shared/utils/date.utils"

interface ApodFiltersProps {
    startDate: string
    endDate: string
    searchText: string
    onStartDateChange: (value: string) => void
    onEndDateChange: (value: string) => void
    onSearchChange: (value: string) => void
}

const inputClass = cn(
    'w-full rounded-lg border border-slate-700 bg-slate-900',
    'px-3 py-2 text-sm text-slate-100 placeholder-slate-500',
    'focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500',
    'transition-colors',
)

export function ApodFilters({ startDate, endDate, searchText, onStartDateChange, onEndDateChange, onSearchChange, }: ApodFiltersProps) {
    return (
        <section aria-label="Filter astronomy pictures" className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="start-date" className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                        Desde
                    </label>
                    <input
                        id="start-date"
                        type="date"
                        value={startDate}
                        max={endDate}
                        onChange={(e) => { onStartDateChange(e.target.value) }}
                        className={inputClass}
                        aria-label="Start date"
                    />
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="end-date" className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                        Hasta
                    </label>
                    <input
                        id="end-date"
                        type="date"
                        value={endDate}
                        max={today}
                        onChange={(e) => { onEndDateChange(e.target.value) }}
                        className={inputClass}
                        aria-label="End date"
                    />
                </div>

                <div className="flex flex-2 flex-col gap-1.5">
                    <label htmlFor="search-apod" className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                        Buscar
                    </label>
                    <input
                        id="search-apod"
                        type="search"
                        value={searchText}
                        onChange={(e) => { onSearchChange(e.target.value) }}
                        placeholder="Buscar por descripción o título"
                        className={inputClass}
                        aria-label="Buscar imagenes de la Nasa"
                    />
                </div>
            </div>
        </section>
    )
}
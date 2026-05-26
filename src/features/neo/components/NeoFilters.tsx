import { cn } from "@/shared/utils/cn";
import type { NeoFilters, SortField } from "../types/neo.types";
import { today } from "@/shared/utils/date.utils";

interface NeoFiltersProps {
    filters: NeoFilters
    onChange: <K extends keyof NeoFilters>(key: K, value: NeoFilters[K]) => void
}

const inputClass = cn(
    'w-full rounded-lg border border-slate-700 bg-slate-900',
    'px-3 py-2 text-sm text-slate-100',
    'focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500',
    'transition-colors',
)


const SORT_OPTIONS: { value: SortField; label: string }[] = [
    { value: 'date', label: 'Date' },
    { value: 'name', label: 'Name' },
    { value: 'distance', label: 'Distance' },
    { value: 'velocity', label: 'Velocity' },
    { value: 'diameter', label: 'Diameter' },
]

export function NeoFilters({ filters, onChange }: NeoFiltersProps) {
    return (
        <section aria-label="Filter asteroids" className="mb-8 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="neo-start" className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        From
                    </label>
                    <input
                        id="neo-start"
                        type="date"
                        value={filters.startDate}
                        max={filters.endDate}
                        onChange={(e) => { onChange('startDate', e.target.value) }}
                        className={inputClass}
                    />
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="neo-end" className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        To (max 7 days)
                    </label>
                    <input
                        id="neo-end"
                        type="date"
                        value={filters.endDate}
                        max={today}
                        onChange={(e) => { onChange('endDate', e.target.value) }}
                        className={inputClass}
                    />
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="neo-sort" className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Sort by
                    </label>
                    <select
                        id="neo-sort"
                        value={filters.sortField}
                        onChange={(e) => { onChange('sortField', e.target.value as SortField) }}
                        className={inputClass}
                    >
                        {SORT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Direction
                    </span>
                    <div className="flex overflow-hidden rounded-lg border border-slate-700">
                        {(['asc', 'desc'] as const).map((dir) => (
                            <button
                                key={dir}
                                onClick={() => { onChange('sortDirection', dir) }}
                                aria-pressed={filters.sortDirection === dir}
                                className={cn(
                                    'flex-1 py-2 text-sm font-medium transition-colors',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                                    filters.sortDirection === dir
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800',
                                )}
                            >
                                {dir === 'asc' ? '↑ Asc' : '↓ Desc'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <label className="flex cursor-pointer items-center gap-3">
                <input
                    type="checkbox"
                    checked={filters.onlyHazardous}
                    onChange={(e) => { onChange('onlyHazardous', e.target.checked) }}
                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 accent-orange-500"
                />
                <span className="text-sm text-slate-300">
                    Show only potentially hazardous asteroids
                </span>
            </label>
        </section>
    )
}

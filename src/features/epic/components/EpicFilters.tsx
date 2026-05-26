import { cn } from '@/shared/utils/cn'
import { today } from '@/shared/utils/date.utils'

interface EpicFiltersProps {
    date: string
    onDateChange: (date: string) => void
    onReset: () => void
}

const inputClass = cn(
    'rounded-lg border border-slate-700 bg-slate-900',
    'px-3 py-2 text-sm text-slate-100',
    'focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500',
    'transition-colors',
)

export function EpicFilters({ date, onDateChange, onReset }: EpicFiltersProps) {
    return (
        <section aria-label="Filter EPIC images" className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="epic-date"
                        className="text-xs font-medium uppercase tracking-wide text-slate-400"
                    >
                        Search by date
                    </label>
                    <input
                        id="epic-date"
                        type="date"
                        value={date}
                        max={today}
                        onChange={(e) => { onDateChange(e.target.value) }}
                        className={inputClass}
                    />
                </div>

                {date && (
                    <button
                        onClick={onReset}
                        className={cn(
                            'rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400',
                            'hover:border-slate-500 hover:text-white transition-colors',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                        )}
                    >
                        Show latest
                    </button>
                )}
            </div>
        </section>
    )
}
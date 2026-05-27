import { cn } from "@/shared/utils/cn";
import { CAMERAS, ROVERS, type DateMode, type MarsFilters, type RoverName } from "../types/mars.types";
import { today } from "@/shared/utils/date.utils";

interface MarsFiltersProps {
    filters: MarsFilters
    onChange: <K extends keyof MarsFilters>(key: K, value: MarsFilters[K]) => void
}


const inputClass = cn(
    'w-full rounded-lg border border-slate-700 bg-slate-900',
    'px-3 py-2 text-sm text-slate-100',
    'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
    'transition-colors',
)

export function MarsFilters({ filters, onChange }: MarsFiltersProps) {
    const cameras = CAMERAS[filters.rover]
    return (
        <section aria-label="Filtrar fotos del rover de Marte" className="mb-8 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="rover-select" className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Rover
                    </label>
                    <select
                        id="rover-select"
                        value={filters.rover}
                        onChange={(e) => { onChange('rover', e.target.value as RoverName) }}
                        className={inputClass}
                    >
                        {ROVERS.map((r) => (
                            <option key={r} value={r}>
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="camera-select" className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Camara
                    </label>
                    <select
                        id="camera-select"
                        value={filters.camera}
                        onChange={(e) => { onChange('camera', e.target.value) }}
                        className={inputClass}
                    >
                        {cameras.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Modo de fecha
                    </span>
                    <div className="flex rounded-lg border border-slate-700 overflow-hidden">
                        {(['earth', 'sol'] as DateMode[]).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => { onChange('dateMode', mode) }}
                                className={cn(
                                    'flex-1 py-2 text-sm font-medium transition-colors',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                                    filters.dateMode === mode
                                        ? 'bg-accent text-white'
                                        : 'bg-space-900text-slate-400 hover:bg-slate-800',
                                )}
                                aria-pressed={filters.dateMode === mode}
                            >
                                {mode === 'earth' ? 'Fecha de la Tierra' : 'Sol'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex max-w-xs flex-col gap-1.5">
                {filters.dateMode === 'earth' ? (
                    <>
                        <label htmlFor="earth-date" className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Fecha de la tierra
                        </label>
                        <input
                            id="earth-date"
                            type="date"
                            value={filters.earthDate}
                            max={today}
                            onChange={(e) => { onChange('earthDate', e.target.value) }}
                            className={inputClass}
                        />
                    </>
                ) : (
                    <>
                        <label htmlFor="sol-input" className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Sol (día marciano)'
                        </label>
                        <input
                            id="sol-input"
                            type="number"
                            value={filters.sol}
                            min={0}
                            onChange={(e) => { onChange('sol', Number(e.target.value)) }}
                            className={inputClass}
                        />
                    </>
                )}
            </div>
        </section>
    )
}

import { cn } from "@/shared/utils/cn";
import type { FlatAsteroid, SortDirection, SortField } from "../types/neo.types";

interface AsteroidTableProps {
    asteroids: FlatAsteroid[]
    sortField: SortField
    sortDirection: SortDirection
    onSort: (field: SortField) => void
}

function SortIcon({ field, current, direction }: {
    field: SortField
    current: SortField
    direction: SortDirection
}) {
    if (field !== current) return <span className="text-slate-600" aria-hidden="true">↕</span>
    return <span className="text-orange-400" aria-hidden="true">{direction === 'asc' ? '↑' : '↓'}</span>
}

const COLUMNS: { key: SortField; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'date', label: 'Date' },
    { key: 'diameter', label: 'Diameter (km)' },
    { key: 'velocity', label: 'Velocity (km/h)' },
    { key: 'distance', label: 'Distance (km)' },
]

export function AsteroidTable({ asteroids, sortField, sortDirection, onSort }: AsteroidTableProps) {
    if (asteroids.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <span className="text-5xl" aria-hidden="true">☄️</span>
                <h3 className="text-lg font-semibold text-slate-300">No asteroids found</h3>
                <p className="text-sm text-slate-500">Try adjusting the date range or filters.</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-sm" role="table">
                <caption className="sr-only">
                    Near Earth Objects — {String(asteroids.length)} asteroids
                </caption>
                <thead className="border-b border-slate-800 bg-slate-900">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                            Hazardous
                        </th>
                        {COLUMNS.map(({ key, label }) => (
                            <th
                                key={key}
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400"
                            >
                                <button
                                    onClick={() => { onSort(key) }}
                                    className={cn(
                                        'flex items-center gap-1 transition-colors hover:text-white',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded',
                                        sortField === key && 'text-orange-400',
                                    )}
                                    aria-label={`Sort by ${label}`}
                                >
                                    {label}
                                    <SortIcon field={key} current={sortField} direction={sortDirection} />
                                </button>
                            </th>
                        ))}
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                            Info
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {asteroids.map((asteroid) => (
                        <tr
                            key={asteroid.id}
                            className={cn(
                                'transition-colors hover:bg-slate-800/50',
                                asteroid.isHazardous && 'bg-red-500/5',
                            )}
                        >
                            <td className="px-4 py-3 text-center">
                                {asteroid.isHazardous ? (
                                    <span
                                        className="inline-flex items-center rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400"
                                        role="img"
                                        aria-label="Potentially hazardous"
                                    >
                                        ⚠ Yes
                                    </span>
                                ) : (
                                    <span
                                        className="inline-flex items-center rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400"
                                        role="img"
                                        aria-label="Not hazardous"
                                    >
                                        ✓ No
                                    </span>
                                )}
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-200">{asteroid.name}</td>
                            <td className="px-4 py-3 text-slate-400">{asteroid.date}</td>
                            <td className="px-4 py-3 text-slate-400">
                                {asteroid.diameterMinKm.toFixed(3)} – {asteroid.diameterMaxKm.toFixed(3)}
                            </td>
                            <td className="px-4 py-3 text-slate-400">
                                {asteroid.velocityKph.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                            </td>
                            <td className="px-4 py-3 text-slate-400">
                                {asteroid.distanceKm.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                            </td>
                            <td className="px-4 py-3">
                                <a
                                    href={asteroid.nasaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        'text-xs text-orange-400 hover:text-orange-300 underline',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded',
                                    )}
                                    aria-label={`NASA details for ${asteroid.name}`}
                                >
                                    NASA JPL
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}
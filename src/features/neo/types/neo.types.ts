export type SortField = 'date' | 'name' | 'distance' | 'velocity' | 'diameter'
export type SortDirection = 'asc' | 'desc'

export interface NeoFilters {
    startDate: string
    endDate: string
    onlyHazardous: boolean
    sortField: SortField
    sortDirection: SortDirection
}

export interface FlatAsteroid {
    id: string
    name: string
    date: string
    isHazardous: boolean
    diameterMinKm: number
    diameterMaxKm: number
    velocityKph: number
    distanceKm: number
    nasaUrl: string
}
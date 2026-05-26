import { apiNasa } from "@/lib/axios"
import type { FlatAsteroid } from "../types/neo.types"
import { neoResponseSchema } from "../schemas/neo.schema"

interface FetchNeoParams {
    startDate: string
    endDate: string
    signal?: AbortSignal
}

export async function fetchNeo({ startDate, endDate, signal }: FetchNeoParams): Promise<FlatAsteroid[]> {
    const { data } = await apiNasa.get<unknown>('/neo/rest/v1/feed', {
        params: {
            start_date: startDate,
            end_date: endDate,
        },
        ...(signal && { signal }),
    })

    const parsed = neoResponseSchema.safeParse(data)
    if (!parsed.success) {
        throw new Error('Unexpected data format from NASA NeoWs API')
    }

    const flattened: FlatAsteroid[] = []

    for (const [date, asteroids] of Object.entries(parsed.data.near_earth_objects)) {
        for (const asteroid of asteroids) {
            const approach = asteroid.close_approach_data[0]
            if (!approach) continue

            flattened.push({
                id: asteroid.id,
                name: asteroid.name.replace(/[()]/g, '').trim(),
                date,
                isHazardous: asteroid.is_potentially_hazardous_asteroid,
                diameterMinKm: asteroid.estimated_diameter.kilometers.estimated_diameter_min,
                diameterMaxKm: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
                velocityKph: parseFloat(approach.relative_velocity.kilometers_per_hour),
                distanceKm: parseFloat(approach.miss_distance.kilometers),
                nasaUrl: asteroid.nasa_jpl_url,
            })
        }
    }

    return flattened.sort((a, b) => a.date.localeCompare(b.date))
}
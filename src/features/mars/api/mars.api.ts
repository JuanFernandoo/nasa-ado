import { marsApiClient } from '@/lib/axios'
import { marsPhotosResponseSchema, type MarsPhoto } from '../schemas/mars.schema'
import type { RoverName } from '../types/mars.types'

interface FetchMarsPhotosParams {
    rover: RoverName
    earthDate?: string
    sol?: number
    camera?: string
    signal?: AbortSignal
}

export async function fetchMarsPhotos({
    rover,
    earthDate,
    sol,
    camera,
    signal,
}: FetchMarsPhotosParams): Promise<MarsPhoto[]> {
    const { data } = await marsApiClient.get<unknown>(
        `/api/v1/rovers/${rover}/photos`,
        {
            params: {
                ...(earthDate ? { earth_date: earthDate } : { sol: sol ?? 1000 }),
                ...(camera ? { camera } : {}),
                page: 1,
            },
            ...(signal && { signal }),
        },
    )

    const parsed = marsPhotosResponseSchema.safeParse(data)

    if (!parsed.success) {
        throw new Error('Unexpected data format')
    }

    return parsed.data.photos
}
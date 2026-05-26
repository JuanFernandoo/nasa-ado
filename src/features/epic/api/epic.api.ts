import { epicApiClient } from '@/lib/axios'
import { epicListSchema, type EpicImage } from '../schemas/epic.schema'
import { env } from '@/lib/env'

interface FetchEpicParams {
    date?: string
    signal?: AbortSignal
}

export async function fetchEpicImages({ date, signal }: FetchEpicParams): Promise<EpicImage[]> {
    const endpoint = date
        ? `/api/natural/date/${date}`
        : '/api/natural'

    const { data } = await epicApiClient.get<unknown>(endpoint, {
        ...(signal && { signal }),
    })

    const parsed = epicListSchema.safeParse(data)
    if (!parsed.success) {
        throw new Error('Unexpected data format from NASA EPIC API')
    }

    return parsed.data
}

export function buildEpicImageUrl(image: EpicImage): string {
    const [datePart] = image.date.split(' ')
    const date = datePart ?? image.date
    const [year = '', month = '', day = ''] = date.split('-')

    return `${env.VITE_NASA_EPIC_URL}/archive/natural/${year}/${month}/${day}/png/${image.image}.png`
}

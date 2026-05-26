import { apiNasa } from "@/lib/axios"
import { apodListSchema, type ApodItem } from "../schemas/apod.schema"
import z from "zod"

interface FetchApodParams {
    startDate: string
    endDate: string
    signal?: AbortSignal
}

export async function fetchApodRange({ startDate, endDate, signal }: FetchApodParams): Promise<ApodItem[]> {
    const { data } = await apiNasa.get<unknown>('/planetary/apod', {
        params: {
            start_date: startDate,
            end_date: endDate,
            thumbs: true,
        },
        ...(signal && { signal }),
    })

    const parsed = apodListSchema.safeParse(data)

    if (!parsed.success) {
        console.error('❌ Invalid environment variables:')
        console.error(JSON.stringify(z.treeifyError(parsed.error), null, 2))
        throw new Error('Invalid environment variables')
    }

    return parsed.data.reverse()
}
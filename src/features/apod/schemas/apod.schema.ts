import { z } from 'zod'

export const apodItemSchema = z.object({
  date: z.string(),
  title: z.string(),
  explanation: z.string(),
  url: z.string(),
  hdurl: z.string().optional(),
  media_type: z.enum(['image', 'video']),
  copyright: z.string().optional(),
  thumbnail_url: z.string().optional(),
})

export const apodListSchema = z.array(apodItemSchema)

export type ApodItem = z.infer<typeof apodItemSchema>
export type MediaType = ApodItem['media_type']
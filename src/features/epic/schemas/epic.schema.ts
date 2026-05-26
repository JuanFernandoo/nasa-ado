import { z } from 'zod'

export const epicImageSchema = z.object({
  identifier: z.string(),
  caption: z.string(),
  image: z.string(),      
  date: z.string(),
  centroid_coordinates: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
})

export const epicListSchema = z.array(epicImageSchema)

export type EpicImage = z.infer<typeof epicImageSchema>
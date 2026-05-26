import { z } from 'zod'

const diameterRangeSchema = z.object({
    estimated_diameter_min: z.number(),
    estimated_diameter_max: z.number(),
})

const closeApproachSchema = z.object({
    close_approach_date: z.string(),
    relative_velocity: z.object({
        kilometers_per_hour: z.string(),
    }),
    miss_distance: z.object({
        kilometers: z.string(),
    }),
})

export const asteroidSchema = z.object({
    id: z.string(),
    name: z.string(),
    nasa_jpl_url: z.string(),
    is_potentially_hazardous_asteroid: z.boolean(),
    estimated_diameter: z.object({
        kilometers: diameterRangeSchema,
    }),
    close_approach_data: z.array(closeApproachSchema),
})

export const neoResponseSchema = z.object({
    near_earth_objects: z.record(z.string(), z.array(asteroidSchema)),
})

export type Asteroid = z.infer<typeof asteroidSchema>
export type CloseApproach = z.infer<typeof closeApproachSchema>
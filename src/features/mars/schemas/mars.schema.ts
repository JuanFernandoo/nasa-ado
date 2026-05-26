import { z } from 'zod'

export const cameraSchema = z.object({
    id: z.number(),
    name: z.string(),
    rover_id: z.number(),
    full_name: z.string(),
})

export const roverSchema = z.object({
    id: z.number(),
    name: z.string(),
    landing_date: z.string().nullable(),
    launch_date: z.string().nullable(),
    status: z.string().nullable(),
})

export const marsPhotoSchema = z.object({
    id: z.number(),
    sol: z.number(),
    camera: cameraSchema,
    img_src: z.string(),
    earth_date: z.string(),
    rover: roverSchema,
})

export const marsPhotosResponseSchema = z.object({
    photos: z.array(marsPhotoSchema),
})

export type MarsPhoto = z.infer<typeof marsPhotoSchema>
export type MarsCamera = z.infer<typeof cameraSchema>
export type MarsRover = z.infer<typeof roverSchema>
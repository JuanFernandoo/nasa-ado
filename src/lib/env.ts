import z from "zod";

const envSchema = z.object({
    VITE_NASA_API_KEY: z.string().min(1, "The API KEY is required"),
    VITE_NASA_BASE_URL: z.string().default("https://api.nasa.gov"),
    VITE_NASA_ROVERS_URL: z.string().default("https://api.nasa.gov"),
    VITE_NASA_EPIC_URL: z.string().default("https://epic.gsfc.nasa.gov")

})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
    console.error('Invalid environment variables:')
    console.error(z.treeifyError(parsed.error))
    throw new Error('Invalid environment variables')
}

export const env = parsed.data
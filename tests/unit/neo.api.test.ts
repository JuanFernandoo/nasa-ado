import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { fetchNeo } from '@/features/neo/api/neo.api'
import { ENDPOINTS } from '@/lib/endpoints'
import { server } from '../mocks/server'

describe('fetchNeo — data transformation', () => {
    it('flattens near_earth_objects record into a flat array', async () => {
        const result = await fetchNeo({
            startDate: '2024-01-01',
            endDate: '2024-01-07',
        })

        expect(Array.isArray(result)).toBe(true)
        expect(result).toHaveLength(2)
    })

    it('maps all required FlatAsteroid fields correctly', async () => {
        const result = await fetchNeo({
            startDate: '2024-01-01',
            endDate: '2024-01-07',
        })

        const asteroid = result[0]
        expect(asteroid).toBeDefined()

        expect(typeof asteroid?.id).toBe('string')
        expect(typeof asteroid?.name).toBe('string')
        expect(typeof asteroid?.date).toBe('string')
        expect(typeof asteroid?.isHazardous).toBe('boolean')
        expect(typeof asteroid?.diameterMinKm).toBe('number')
        expect(typeof asteroid?.diameterMaxKm).toBe('number')
        expect(typeof asteroid?.velocityKph).toBe('number')
        expect(typeof asteroid?.distanceKm).toBe('number')
        expect(typeof asteroid?.nasaUrl).toBe('string')
    })

    it('correctly identifies hazardous asteroids', async () => {
        const result = await fetchNeo({
            startDate: '2024-01-01',
            endDate: '2024-01-07',
        })

        const hazardous = result.filter((a) => a.isHazardous)
        const safe = result.filter((a) => !a.isHazardous)

        expect(hazardous).toHaveLength(1)
        expect(safe).toHaveLength(1)
    })

    it('strips parentheses from asteroid names', async () => {
        const result = await fetchNeo({
            startDate: '2024-01-01',
            endDate: '2024-01-07',
        })

        result.forEach((asteroid) => {
            expect(asteroid.name).not.toMatch(/[()]/g)
        })
    })

    it('parses velocity and distance as numbers from string fields', async () => {
        const result = await fetchNeo({
            startDate: '2024-01-01',
            endDate: '2024-01-07',
        })

        const first = result[0]
        expect(first).toBeDefined()
        if (!first) return
        expect(typeof first.velocityKph).toBe('number')
        expect(typeof first.distanceKm).toBe('number')
        expect(first.velocityKph).toBe(25000.5)
        expect(first.distanceKm).toBe(1500000.75)
    })

    it('throws when API returns unexpected shape', async () => {
        server.use(
            http.get(`${ENDPOINTS.NASA_BASE}/neo/rest/v1/feed`, () => {
                return HttpResponse.json({ invalid: 'shape' })
            }),
        )

        await expect(
            fetchNeo({ startDate: '2024-01-01', endDate: '2024-01-07' }),
        ).rejects.toThrow('Unexpected data format from NASA NeoWs API')
    })
})
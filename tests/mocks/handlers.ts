import { http, HttpResponse } from 'msw'
import { ENDPOINTS } from '@/lib/endpoints'
import {
    apodFixtures,
    marsPhotoFixtures,
    asteroidFixtures,
    epicFixtures,
} from './fixtures'

export const handlers = [
    http.get(`${ENDPOINTS.NASA_BASE}/planetary/apod`, () => {
        return HttpResponse.json(apodFixtures)
    }),

    http.get(`${ENDPOINTS.MARS_BASE}/api/v1/rovers/:rover/photos`, () => {
        return HttpResponse.json({ photos: marsPhotoFixtures })
    }),

    http.get(`${ENDPOINTS.NASA_BASE}/neo/rest/v1/feed`, () => {
        return HttpResponse.json({
            near_earth_objects: { '2024-01-01': asteroidFixtures },
        })
    }),

    http.get(`${ENDPOINTS.EPIC_BASE}/api/natural`, () => {
        return HttpResponse.json(epicFixtures)
    }),
]
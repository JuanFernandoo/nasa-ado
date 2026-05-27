import axios, { type AxiosInstance } from 'axios'
import { env } from './env'
import { ENDPOINTS } from './endpoints'

function attachErrorInterceptor(client: AxiosInstance): void {
  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 429) return Promise.reject(new Error('Rate limit exceeded'))
        if (status === 403) return Promise.reject(new Error('Invalid API key'))
        if (status && status >= 500) return Promise.reject(new Error('Server error'))
      }
      return Promise.reject(error instanceof Error ? error : new Error(String(error)))
    },
  )
}

export const apiNasa = axios.create({
  baseURL: ENDPOINTS.NASA_BASE,
  timeout: 15000,
})

apiNasa.interceptors.request.use((config) => {
  config.params = {
    ...config.params as Record<string, unknown>,
    api_key: env.VITE_NASA_API_KEY,
  }
  return config
})

attachErrorInterceptor(apiNasa)

export const marsApiClient = axios.create({
  baseURL: ENDPOINTS.MARS_BASE,
  timeout: 15000,
})

attachErrorInterceptor(marsApiClient)

export const epicApiClient = axios.create({
  baseURL: ENDPOINTS.EPIC_BASE,
  timeout: 15000,
})

attachErrorInterceptor(epicApiClient)
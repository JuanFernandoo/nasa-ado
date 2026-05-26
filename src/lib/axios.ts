import axios from "axios";
import { env } from "./env";

export const apiNasa = axios.create({
    baseURL: env.VITE_NASA_BASE_URL,
    timeout: 15000
})

apiNasa.interceptors.request.use((config) => {
    config.params = {
        ...config.params as Record<string, unknown>,
        api_key: env.VITE_NASA_API_KEY,
    }
    return config
})

apiNasa.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status
            if (status === 429) {
                return Promise.reject(new Error("Rate limit exceeded"))
            }
            if (status === 403) {
                return Promise.reject(new Error('The API key is invalid'))
            }
            if (status && status >= 500) {
                return Promise.reject(new Error("Server error"))
            }
        }
        return Promise.reject(error instanceof Error ? error : new Error(String(error)))
    }
)
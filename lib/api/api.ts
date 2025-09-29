import axios, { AxiosError } from "axios"

export interface ApiValidationError {
  field: string
  message: string
}

export interface ApiErrorShape {
  message: string
  status?: number
  errors?: ApiValidationError[]
}

const baseURL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api"

const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

let authToken: string | null = null
let unauthorizedHandler: (() => void) | null = null

export const setAuthToken = (token: string | null) => {
  authToken = token
}

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  unauthorizedHandler = handler
}

apiClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && unauthorizedHandler) {
      unauthorizedHandler()
    }
    return Promise.reject(error)
  },
)

export const parseApiError = (error: unknown): ApiErrorShape => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const data = error.response?.data as Record<string, unknown> | undefined

    if (data) {
      const message = typeof data.message === "string" ? data.message : "Something went wrong"
      const errors = Array.isArray(data.errors)
        ? (data.errors as ApiValidationError[]).map((item) => ({
            field: item.field,
            message: item.message,
          }))
        : undefined

      return {
        message,
        status,
        errors,
      }
    }

    return {
      message: error.message || "Network error",
      status,
    }
  }

  return {
    message: error instanceof Error ? error.message : "Unknown error",
  }
}

export default apiClient

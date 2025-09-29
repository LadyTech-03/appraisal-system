import apiClient, { parseApiError } from "./api"

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  employeeId: string
  email: string
  password: string
  name: string
  role: string
  division?: string
  unit?: string
  managerId?: string
  phone?: string
}

export const authApi = {
  async login(payload: LoginPayload) {
    try {
      const response = await apiClient.post("/auth/login", payload)
      return response.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async register(payload: RegisterPayload) {
    try {
      const response = await apiClient.post("/auth/register", payload)
      return response.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async getProfile() {
    try {
      const response = await apiClient.get("/auth/me")
      return response.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async logout() {
    try {
      const response = await apiClient.post("/auth/logout")
      return response.data
    } catch (error) {
      throw parseApiError(error)
    }
  },
}

export type { LoginPayload, RegisterPayload }


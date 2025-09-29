import apiClient, { parseApiError } from "./api"

export const usersApi = {
  async getCurrentUser() {
    try {
      const response = await apiClient.get("/auth/me")
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async getUsers(params?: Record<string, unknown>) {
    try {
      const response = await apiClient.get("/users", { params })
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async getRoles() {
    try {
      const response = await apiClient.get("/users/roles")
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async getTeam(managerId: string) {
    try {
      const response = await apiClient.get(`/users/${managerId}/team`)
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },
}


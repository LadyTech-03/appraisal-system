import apiClient, { parseApiError } from "./api"

export const appraisalsApi = {
  async getMyAppraisals(params?: Record<string, unknown>) {
    try {
      const response = await apiClient.get("/appraisals", { params })
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async getTeamAppraisals(params?: Record<string, unknown>) {
    try {
      const response = await apiClient.get("/appraisals/team", { params })
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async getAppraisalStatistics() {
    try {
      const response = await apiClient.get("/appraisals/statistics")
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async getDashboardOverview() {
    try {
      const response = await apiClient.get("/appraisals/overview/me")
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },
}



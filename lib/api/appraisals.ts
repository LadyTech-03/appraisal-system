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

  async getCurrentAppraisal(params?: Record<string, unknown>) {
    try {
      const response = await apiClient.get("/appraisals/current", { params })
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async updateManagerStep(employeeId: string, step: string) {
    try {
      const response = await apiClient.post("/appraisals/manager-step", { employeeId, step })
      return response.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async submitAppraisal() {
    try {
      const response = await apiClient.post("/appraisals/submit")
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async getSubmittedAppraisals() {
    try {
      const response = await apiClient.get("/appraisals/me/submitted")
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async approveAppraisal(id: string, comments?: string) {
    try {
      const response = await apiClient.put(`/appraisals/${id}/approve`, { comments })
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async rejectAppraisal(id: string, comments: string) {
    try {
      const response = await apiClient.put(`/appraisals/${id}/reject`, { comments })
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async completeAppraisal(id: string) {
    try {
      const response = await apiClient.put(`/appraisals/${id}/complete`)
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async getMyAppraisalHistory() {
    try {
      const response = await apiClient.get("/appraisals/me/history")
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async getAppraisalById(id: string) {
    try {
      const response = await apiClient.get(`/appraisals/${id}`)
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async updateAppraisalStatus(id: string, status: string) {
    try {
      const response = await apiClient.patch(`/appraisals/${id}/status`, { status })
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },
}




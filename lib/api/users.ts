import apiClient, { parseApiError } from "./api"

export interface CreateUserData {
  title: string
  first_name: string
  surname: string
  other_names?: string
  gender: string
  employee_id: string
  email: string
  position?: string
  role: string
  division?: string
  unit?: string
  grade?: string
  notch?: string
  appointment_date?: string
  phone?: string
  manager_id?: string
}

export interface CreateUserResponse {
  id: string
  employee_id: string
  email: string
  first_name: string
  surname: string
  role: string
  temp_password?: string // OTP returned for admin to share
}

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

  async createUser(userData: CreateUserData): Promise<CreateUserResponse> {
    try {
      const response = await apiClient.post("/users", userData)
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async updateUser(userId: string, userData: Partial<CreateUserData>) {
    try {
      const response = await apiClient.put(`/users/${userId}`, userData)
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

  async getTeam(manager_id: string) {
    try {
      const response = await apiClient.get(`/users/${manager_id}/team`)
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },

  async uploadSignature(file: File) {
    try {
      const formData = new FormData()
      formData.append("signature", file)
      const response = await apiClient.post("/users/signature", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data?.data
    } catch (error) {
      throw parseApiError(error)
    }
  },
}

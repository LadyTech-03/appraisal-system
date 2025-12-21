import apiClient, { parseApiError } from "./api"

export interface AppraisalPeriod {
    section_name: string
    is_available: boolean
    opens_at?: string
    message?: string
}

export const appraisalPeriodsApi = {
    /**
     * Get availability status for all sections
     */
    async getAvailability(): Promise<AppraisalPeriod[]> {
        try {
            const response = await apiClient.get("/appraisal-periods")
            return response.data.data
        } catch (error) {
            throw parseApiError(error)
        }
    },

    /**
     * Get availability status for a specific section
     */
    async getSectionAvailability(sectionName: string): Promise<AppraisalPeriod> {
        try {
            const response = await apiClient.get(`/appraisal-periods/${sectionName}`)
            return response.data.data
        } catch (error) {
            throw parseApiError(error)
        }
    },

    /**
     * Update availability for a section (Admin only)
     */
    async updateAvailability(
        sectionName: string,
        data: Partial<{
            isAvailable: boolean
            opensAt: string
            message: string
        }>
    ): Promise<AppraisalPeriod> {
        try {
            const response = await apiClient.put(`/appraisal-periods/${sectionName}`, data)
            return response.data.data
        } catch (error) {
            throw parseApiError(error)
        }
    },
}

import apiClient from "./api"

export interface FinalSectionsData {
    appraiserComments?: string
    appraiserSignatureUrl?: string
    appraiserDate?: string
    careerDevelopmentComments?: string
    assessmentDecision?: string
    appraiseeComments?: string
    appraiseeSignatureUrl?: string
    appraiseeDate?: string
}

export interface FinalSections extends FinalSectionsData {
    id: string
    user_id: string
    appraiser_comments?: string
    appraiser_signature_url?: string
    appraiser_date?: string
    career_development_comments?: string
    assessment_decision?: string
    appraisee_comments?: string
    appraisee_signature_url?: string
    appraisee_date?: string
    created_at: string
    updated_at: string
}

/**
 * Create new final sections record
 */
export async function createFinalSections(data: FinalSectionsData): Promise<FinalSections> {
    const response = await apiClient.post<{ success: boolean; data: FinalSections }>("/final-sections", data)
    return response.data.data
}

/**
 * Update existing final sections record
 */
export async function updateFinalSections(id: string, data: Partial<FinalSectionsData>): Promise<FinalSections> {
    const response = await apiClient.put<{ success: boolean; data: FinalSections }>(`/final-sections/${id}`, data)
    return response.data.data
}

/**
 * Get final sections by ID
 */
export async function getFinalSectionsById(id: string): Promise<FinalSections> {
    const response = await apiClient.get<{ success: boolean; data: FinalSections }>(`/final-sections/${id}`)
    return response.data.data
}

/**
 * Get current user's final sections records
 */
export async function getMyFinalSections(): Promise<FinalSections[]> {
    const response = await apiClient.get<{ success: boolean; data: FinalSections[] }>("/final-sections/me")
    return response.data.data
}

/**
 * Delete final sections record
 */
export async function deleteFinalSections(id: string): Promise<void> {
    await apiClient.delete(`/final-sections/${id}`)
}

export async function getFinalSectionsByUserId(userId: string): Promise<FinalSections[]> {
    const response = await apiClient.get<{ success: boolean; data: FinalSections[] }>(`/final-sections/user/${userId}`)
    return response.data.data
}


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
    appraiseeAgreementDecision?: string
    hodComments?: string
    hodName?: string
    hodSignatureUrl?: string
    hodDate?: string
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
    appraisee_agreement_decision?: string
    appraisal_id?: string
    created_at: string
    updated_at: string
    hod_comments?: string
    hod_name?: string
    hod_signature_url?: string
    hod_date?: string
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

export async function getFinalSectionsByUserId(user_id: string): Promise<FinalSections[]> {
    const response = await apiClient.get<{ success: boolean; data: FinalSections[] }>(`/final-sections/user/${user_id}`)
    return response.data.data
}


import apiClient from "./api"

export interface KeyResultArea {
    id: string
    keyResultArea: string
    targets: string
    resourcesRequired: string
}

export interface KeyCompetency {
    id: string
    competency: string
}

export interface PerformancePlanningData {
    keyResultAreas: KeyResultArea[]
    keyCompetencies?: KeyCompetency[]
    appraiseeSignatureUrl?: string
    appraiserSignatureUrl?: string
}

export interface PerformancePlanning extends PerformancePlanningData {
    id: string
    user_id: string
    key_result_areas: KeyResultArea[]
    key_competencies?: KeyCompetency[]
    appraisee_signature_url?: string
    appraiser_signature_url?: string
    created_at: string
    updated_at: string
}

/**
 * Create new performance planning record
 */
export async function createPerformancePlanning(data: PerformancePlanningData): Promise<PerformancePlanning> {
    const response = await apiClient.post<{ success: boolean; data: PerformancePlanning }>("/performance-planning", data)
    return response.data.data
}

/**
 * Update existing performance planning record
 */
export async function updatePerformancePlanning(id: string, data: Partial<PerformancePlanningData>): Promise<PerformancePlanning> {
    const response = await apiClient.put<{ success: boolean; data: PerformancePlanning }>(`/performance-planning/${id}`, data)
    return response.data.data
}

/**
 * Get performance planning by ID
 */
export async function getPerformancePlanningById(id: string): Promise<PerformancePlanning> {
    const response = await apiClient.get<{ success: boolean; data: PerformancePlanning }>(`/performance-planning/${id}`)
    return response.data.data
}

/**
 * Get current user's performance planning records
 */
export async function getMyPerformancePlanning(): Promise<PerformancePlanning[]> {
    const response = await apiClient.get<{ success: boolean; data: PerformancePlanning[] }>("/performance-planning/me")
    return response.data.data
}

/**
 * Delete performance planning record
 */
export async function deletePerformancePlanning(id: string): Promise<void> {
    await apiClient.delete(`/performance-planning/${id}`)
}

/**
 * Get performance planning by User ID
 */
export async function getPerformancePlanningByUserId(userId: string): Promise<PerformancePlanning[]> {
    const response = await apiClient.get<{ success: boolean; data: PerformancePlanning[] }>(`/performance-planning/user/${userId}`)
    return response.data.data
}

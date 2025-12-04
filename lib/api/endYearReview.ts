import apiClient from "./api"

export interface TargetEvaluation {
    id: string
    target: string
    performanceAssessment: string
    weightOfTarget: number
    score: number
    comments: string
}

export interface Calculations {
    totalWeight: number
    totalScore: number
    average: number
    finalScore: number
}

export interface EndYearReviewData {
    targets: TargetEvaluation[]
    calculations?: Calculations
    appraiseeSignatureUrl?: string
    appraiseeDate?: string
}

export interface EndYearReview extends EndYearReviewData {
    id: string
    user_id: string
    targets: TargetEvaluation[]
    calculations?: Calculations
    appraisee_signature_url?: string
    appraisee_date?: string
    appraiser_signature_url?: string
    appraiser_date?: string
    created_at: string
    updated_at: string
}

/**
 * Create new end-year review record
 */
export async function createEndYearReview(data: EndYearReviewData): Promise<EndYearReview> {
    const response = await apiClient.post<{ success: boolean; data: EndYearReview }>("/end-year-review", data)
    return response.data.data
}

/**
 * Update existing end-year review record
 */
export async function updateEndYearReview(id: string, data: Partial<EndYearReviewData>): Promise<EndYearReview> {
    const response = await apiClient.put<{ success: boolean; data: EndYearReview }>(`/end-year-review/${id}`, data)
    return response.data.data
}

/**
 * Get end-year review by ID
 */
export async function getEndYearReviewById(id: string): Promise<EndYearReview> {
    const response = await apiClient.get<{ success: boolean; data: EndYearReview }>(`/end-year-review/${id}`)
    return response.data.data
}

/**
 * Get current user's end-year review records
 */
export async function getMyEndYearReview(): Promise<EndYearReview[]> {
    const response = await apiClient.get<{ success: boolean; data: EndYearReview[] }>("/end-year-review/me")
    return response.data.data
}

/**
 * Delete end-year review record
 */
export async function deleteEndYearReview(id: string): Promise<void> {
    await apiClient.delete(`/end-year-review/${id}`)
}

/**
 * Get end-year review by User ID
 */
export async function getEndYearReviewByUserId(userId: string): Promise<EndYearReview[]> {
    const response = await apiClient.get<{ success: boolean; data: EndYearReview[] }>(`/end-year-review/user/${userId}`)
    return response.data.data
}

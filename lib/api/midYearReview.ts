import apiClient from "./api"

export interface ReviewItem {
    id: string
    description: string
    progressReview: string
    remarks: string
}

export interface MidYearReviewData {
    targets: ReviewItem[]
    competencies: ReviewItem[]
    appraiseeSignatureUrl?: string
    appraiserSignatureUrl?: string
    appraiseeDate?: string
    appraiserDate?: string
}

export interface MidYearReview extends MidYearReviewData {
    id: string
    user_id: string
    targets: ReviewItem[]
    competencies: ReviewItem[]
    appraisee_signature_url?: string
    appraisee_date?: string
    appraiser_signature_url?: string
    appraiser_date?: string
    created_at: string
    updated_at: string
}

/**
 * Create new mid-year review record
 */
export async function createMidYearReview(data: MidYearReviewData): Promise<MidYearReview> {
    const response = await apiClient.post<{ success: boolean; data: MidYearReview }>("/mid-year-review", data)
    return response.data.data
}

/**
 * Update existing mid-year review record
 */
export async function updateMidYearReview(id: string, data: Partial<MidYearReviewData>): Promise<MidYearReview> {
    const response = await apiClient.put<{ success: boolean; data: MidYearReview }>(`/mid-year-review/${id}`, data)
    return response.data.data
}

/**
 * Get mid-year review by ID
 */
export async function getMidYearReviewById(id: string): Promise<MidYearReview> {
    const response = await apiClient.get<{ success: boolean; data: MidYearReview }>(`/mid-year-review/${id}`)
    return response.data.data
}

/**
 * Get current user's mid-year review records
 */
export async function getMyMidYearReview(): Promise<MidYearReview[]> {
    const response = await apiClient.get<{ success: boolean; data: MidYearReview[] }>("/mid-year-review/me")
    return response.data.data
}

/**
 * Delete mid-year review record
 */
export async function deleteMidYearReview(id: string): Promise<void> {
    await apiClient.delete(`/mid-year-review/${id}`)
}

/**
 * Get mid-year review by User ID
 */
export async function getMidYearReviewByUserId(user_id: string): Promise<MidYearReview[]> {
    const response = await apiClient.get<{ success: boolean; data: MidYearReview[] }>(`/mid-year-review/user/${user_id}`)
    return response.data.data
}

import apiClient from "./api"

export interface CompetencyItem {
    id: string
    description: string
    weight: number
    score: number
    weightedScore: number
    comments: string
}

export interface CompetencyCategory {
    id: string
    name: string
    items: CompetencyItem[]
    total: number
    average: number
}

export interface AnnualAppraisalData {
    coreCompetencies: CompetencyCategory[]
    nonCoreCompetencies: CompetencyCategory[]
    performanceAssessmentScore?: number
    coreCompetenciesAverage?: number
    nonCoreCompetenciesAverage?: number
    overallTotal?: number
    overallScorePercentage?: number
    appraiserSignatureUrl?: string
    appraiserDate?: string
}

export interface AnnualAppraisal extends AnnualAppraisalData {
    id: string
    user_id: string
    core_competencies: CompetencyCategory[]
    non_core_competencies: CompetencyCategory[]
    performance_assessment_score?: number
    core_competencies_average?: number
    non_core_competencies_average?: number
    overall_total?: number
    overall_score_percentage?: number
    appraisee_signature_url?: string
    appraisee_date?: string
    appraiser_signature_url?: string
    appraiser_date?: string
    created_at: string
    updated_at: string
}

export interface PerformanceAssessment {
    calculations: {
        finalScore: number
        coreCompetencies: {
            total: number
            average: number
        }
        nonCoreCompetencies: {
            total: number
            average: number
        }
        overallTotal: number
        overallScorePercentage: number
    }
}

/**
 * Create new annual appraisal record
 */
export async function createAnnualAppraisal(data: AnnualAppraisalData): Promise<AnnualAppraisal> {
    const response = await apiClient.post<{ success: boolean; data: AnnualAppraisal }>("/annual-appraisal", data)
    return response.data.data
}

/**
 * Update existing annual appraisal record
 */
export async function updateAnnualAppraisal(id: string, data: Partial<AnnualAppraisalData>): Promise<AnnualAppraisal> {
    const response = await apiClient.put<{ success: boolean; data: AnnualAppraisal }>(`/annual-appraisal/${id}`, data)
    return response.data.data
}

/**
 * Get annual appraisal by ID
 */
export async function getAnnualAppraisalById(id: string): Promise<AnnualAppraisal> {
    const response = await apiClient.get<{ success: boolean; data: AnnualAppraisal }>(`/annual-appraisal/${id}`)
    return response.data.data
}

/**
 * Get current user's annual appraisal records
 */
export async function getMyAnnualAppraisal(): Promise<AnnualAppraisal[]> {
    const response = await apiClient.get<{ success: boolean; data: AnnualAppraisal[] }>("/annual-appraisal/me")
    return response.data.data
}

/**
 * Delete annual appraisal record
 */
export async function deleteAnnualAppraisal(id: string): Promise<void> {
    await apiClient.delete(`/annual-appraisal/${id}`)
}

/**
 * Get annual appraisal by User ID
 */
export async function getAnnualAppraisalByUserId(userId: string): Promise<AnnualAppraisal[]> {
    const response = await apiClient.get<{ success: boolean; data: AnnualAppraisal[] }>(`/annual-appraisal/user/${userId}`)
    return response.data.data
}

/**
 * Get performance assessment by User ID
 */
export async function getPerformanceAssessment(userId: string): Promise<PerformanceAssessment[]> {
    const response = await apiClient.get<{ success: boolean; data: PerformanceAssessment[] }>(`/annual-appraisal/performance-assessment/${userId}`)
    return response.data.data
}


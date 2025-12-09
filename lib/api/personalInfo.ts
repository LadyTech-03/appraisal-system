import apiClient from "./api"

export interface PersonalInfoData {
    periodFrom: string
    periodTo: string
    title: string
    otherTitle?: string
    surname: string
    firstName: string
    otherNames?: string
    gender: string
    presentJobTitle: string
    gradeSalary: string
    division: string
    dateOfAppointment: string
    trainingRecords: Array<{
        institution: string
        date: string
        programme: string
    }>
    // Appraiser fields (nullable)
    appraiserTitle?: string
    appraiserOtherTitle?: string
    appraiserSurname?: string
    appraiserFirstName?: string
    appraiserOtherNames?: string
    appraiserPosition?: string
}

export interface PersonalInfo {
    id: string
    user_id: string
    period_from: string
    period_to: string
    title: string
    other_title?: string
    surname: string
    first_name: string
    other_names?: string
    gender: string
    present_job_title: string
    grade_salary: string
    division: string
    date_of_appointment: string
    training_records: Array<{
        institution: string
        date: string
        programme: string
    }>
    // Appraiser fields (nullable)
    appraiser_title?: string
    appraiser_other_title?: string
    appraiser_surname?: string
    appraiser_first_name?: string
    appraiser_other_names?: string
    appraiser_position?: string
    created_at: string
    updated_at: string
    appraisal_id?: string
    status?: string
    manager_status?: string

    user_name: string
    user_email: string
    employee_id: string
}

/**
 * Create new personal info record
 */
export async function createPersonalInfo(data: PersonalInfoData): Promise<PersonalInfo> {
    const response = await apiClient.post<{ success: boolean; data: PersonalInfo }>("/personal-info", data)
    return response.data.data
}

/**
 * Update existing personal info record
 */
export async function updatePersonalInfo(id: string, data: Partial<PersonalInfoData>): Promise<PersonalInfo> {
    const response = await apiClient.put<{ success: boolean; data: PersonalInfo }>(`/personal-info/${id}`, data)
    return response.data.data
}

/**
 * Get personal info by ID
 */
export async function getPersonalInfoById(id: string): Promise<PersonalInfo> {
    const response = await apiClient.get<{ success: boolean; data: PersonalInfo }>(`/personal-info/${id}`)
    return response.data.data
}

/**
 * Get current user's personal info records
 */
export async function getMyPersonalInfo(): Promise<PersonalInfo[]> {
    const response = await apiClient.get<{ success: boolean; data: PersonalInfo[] }>("/personal-info/me")
    return response.data.data
}

/**
 * Get team appraisals (for managers)
 */
export async function getTeamAppraisals(): Promise<PersonalInfo[]> {
    const response = await apiClient.get<{ success: boolean; data: PersonalInfo[] }>("/personal-info/team")
    return response.data.data
}

/**
 * Get personal info by user ID
 */
export async function getPersonalInfoByUserId(userId: string): Promise<PersonalInfo[]> {
    const response = await apiClient.get<{ success: boolean; data: PersonalInfo[] }>(`/personal-info/user/${userId}`)
    return response.data.data
}

/**
 * Delete personal info record
 */
export async function deletePersonalInfo(id: string): Promise<void> {
    await apiClient.delete(`/personal-info/${id}`)
}

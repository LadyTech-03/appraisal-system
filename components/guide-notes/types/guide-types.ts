export interface TrainingRecord {
    institution: string
    date: string
    programme: string
}

export interface Section1AContent {
    // Static fields are implied, no config needed
    // This interface can be extended if needed for future customization
    placeholder?: string // For future extensibility
}

export interface Section1BContent {
    // Static fields are implied
    placeholder?: string // For future extensibility
}

export interface PerformancePlanningRow {
    keyResultArea: string
    targets: string
    resourcesRequired: string
}

export interface Section2Content {
    rows: PerformancePlanningRow[]
}

export interface MidYearReviewRow {
    no: string
    item: string // target or competency
    progressReview: string
    remarks: string
}

export interface Section3Content {
    targets: MidYearReviewRow[]
    competencies: MidYearReviewRow[]
}

export interface EndOfYearReviewRow {
    no: string
    target: string
    performanceAssessment: string // "Rate 1-5, see Sec 5"
    weightOfTarget: string
    score: string // "Assessment x Weight"
    comments: string
}

export interface Section4Content {
    rows: EndOfYearReviewRow[]
}

export interface GuideContent {
    category: string
    categoryLabel: string
    section1A: Section1AContent
    section1B: Section1BContent
    section2: Section2Content
    section3: Section3Content
    section4: Section4Content
    // Future sections can be added here
}

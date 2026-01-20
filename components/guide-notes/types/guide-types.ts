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

export interface CompetencyRow {
    no?: string
    competency: string
    weight: string // (W)
    score: string // (S) Score on Scale 1-5
    calculation: string // W × S
    comments: string
}

export interface Section5Content {
    coreCompetencies: CompetencyRow[]
    nonCoreCompetencies: CompetencyRow[]
}

export interface Section6Content {
    exampleComment: string
}

export interface Section7Content {
    examplePlan: string
    instructions?: string
}

export interface Section8Content {
    // Static section - same content for all categories
}

export interface Section9Content {
    exampleComment: string
}

export interface Section10Content {
    section10Title?: string
    section10Description?: string
    signatureLabel?: string
    exampleComment?: string
}

export interface GuideContent {
    category: string
    categoryLabel: string
    section1A: Section1AContent
    section1B: Section1BContent
    section2: Section2Content
    section3: Section3Content
    section4: Section4Content
    section5: Section5Content
    section6: Section6Content
    section7: Section7Content
    section8: Section8Content
    section9: Section9Content
    section10: Section10Content
    // Future sections can be added here
}

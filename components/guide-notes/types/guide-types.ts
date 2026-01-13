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

export interface GuideContent {
    category: string
    categoryLabel: string
    section1A: Section1AContent
    section1B: Section1BContent
    section2: Section2Content
    // Future sections can be added here
    // section3?: Section3Content
}

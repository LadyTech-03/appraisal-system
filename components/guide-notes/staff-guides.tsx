"use client"

import { guideContentConfig } from "./config/guide-content-config"
import { Section1AAppraiseeInfo } from "./sections/section-1a-appraisee-info"
import { Section1BAppraiserInfo } from "./sections/section-1b-appraiser-info"

interface StaffGuideProps {
  category: string
}

export function StaffGuide({ category }: StaffGuideProps) {
  const content = guideContentConfig[category]

  if (!content) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-8 text-center">
        <p>Guide not found for this category.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Guide Notes for {content.categoryLabel}</h2>
        <p className="text-muted-foreground">
          This guide provides instructions for completing the performance appraisal form.
        </p>
      </div>

      {/* Section 1A: Appraisee Personal Information */}
      <Section1AAppraiseeInfo />

      {/* Section 1B: Appraiser Information */}
      <Section1BAppraiserInfo />

      {/* Future sections will be added here as reusable components */}
      {/* Example:
      <Section2KeyResultAreas content={content.section2} />
      <Section3PerformanceIndicators content={content.section3} />
      */}
    </div>
  )
}

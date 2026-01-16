"use client"

import { guideContentConfig } from "./config/guide-content-config"
import { Section1AAppraiseeInfo } from "./sections/section-1a-appraisee-info"
import { Section1BAppraiserInfo } from "./sections/section-1b-appraiser-info"
import { Section2PerformancePlanning } from "./sections/section-2-performance-planning"
import { Section3MidYearReview } from "./sections/section-3-midyear-review"
import { Section4EndOfYearReview } from "./sections/section-4-endofyear-review"
import { Section5AnnualAppraisal } from "./sections/section-5-annual-appraisal"
import { Section6AppraiserComments } from "./sections/section-6-appraiser-comments"
import { Section7CareerDevelopment } from "./sections/section-7-career-development"
import { Section8AssessmentDecision } from "./sections/section-8-assessment-decision"
import { Section9AppraiseeComments } from "./sections/section-9-appraisee-comments"
import { Section10HODComments } from "./sections/section-10-hod-comments"
import { GeneralGuideNotes } from "./general-guide-notes"


interface StaffGuideProps {
  category: string
}

export function StaffGuide({ category }: StaffGuideProps) {
  const content = guideContentConfig[category]

  if (!content) {
    return (
      <GeneralGuideNotes />
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

      {/* Section 2: Performance Planning */}
      {content.section2.rows.length > 0 && (
        <Section2PerformancePlanning content={content.section2} />
      )}

      {/* Section 3: Mid-Year Review */}
      {(content.section3.targets.length > 0 || content.section3.competencies.length > 0) && (
        <Section3MidYearReview content={content.section3} />
      )}

      {/* Section 4: End-of-Year Review */}
      {content.section4.rows.length > 0 && (
        <Section4EndOfYearReview content={content.section4} />
      )}

      {/* Section 5: Annual Appraisal */}
      {(content.section5.coreCompetencies.length > 0 || content.section5.nonCoreCompetencies.length > 0) && (
        <Section5AnnualAppraisal content={content.section5} />
      )}

      {/* Section 6: Appraiser's Comments */}
      {content.section6.exampleComment && (
        <Section6AppraiserComments content={content.section6} />
      )}

      {/* Section 7: Career Development */}
      {content.section7.examplePlan && (
        <Section7CareerDevelopment content={content.section7} />
      )}

      {/* Section 8: Assessment Decision */}
      <Section8AssessmentDecision />

      {/* Section 9: Appraisee's Comments */}
      {content.section9.exampleComment && (
        <Section9AppraiseeComments content={content.section9} />
      )}

      {/* Section 10: HOD Comments */}
      {content.section10.exampleComment && (
        <Section10HODComments content={content.section10} />
      )}
    </div>
  )
}

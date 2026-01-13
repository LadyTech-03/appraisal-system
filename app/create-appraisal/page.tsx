"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { AppraiseePersonalInfoForm } from "@/components/appraisee-personal-info-form"
import { PerformancePlanningForm } from "@/components/performance-planning-form"
import { MidYearReviewForm } from "@/components/mid-year-review-form"
import { EndYearReviewForm } from "@/components/end-year-review-form"
import { AnnualAppraisalForm } from "@/components/annual-appraisal-form"
import { FinalSectionsForm } from "@/components/final-sections-form"
import { FormUnavailable } from "@/components/form-unavailable"
import { GuideNotesLayout, useGuideNotes } from "@/components/guide-notes/guide-notes-selector"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Info, Loader, Loader2 } from "lucide-react"
import { appraisalPeriodsApi, type AppraisalPeriod } from "@/lib/api/appraisalPeriods"
import { toast } from "sonner"

const steps = [
  { id: 'personal-info', name: 'Personal Information', status: 'personalInfo' },
  { id: 'performance-planning', name: 'Performance Planning', status: 'performancePlanning' },
  { id: 'mid-year-review', name: 'Mid Year Review', status: 'midYearReview' },
  { id: 'end-year-review', name: 'End Year Review', status: 'endYearReview' },
  // { id: 'annual-appraisal', name: 'Annual Appraisal', status: 'annualAppraisal' },
  { id: 'final-sections', name: 'Final Sections', status: 'finalSections' },
]

export default function CreateAppraisalPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated } = useAuthStore()
  const guideState = useGuideNotes()
  const [currentStep, setCurrentStep] = useState<'personal-info' | 'performance-planning' | 'mid-year-review' | 'end-year-review' | 'annual-appraisal' | 'final-sections'>('personal-info')
  const [appraisalData, setAppraisalData] = useState<any>({
    personalInfo: null,
    performancePlanning: null,
    midYearReview: null,
    endYearReview: null,
    annualAppraisal: null,
    finalSections: null
  })
  const [availability, setAvailability] = useState<{ [key: string]: AppraisalPeriod }>({})
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
  }, [isAuthenticated, router])

  // Fetch availability on mount
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const periods = await appraisalPeriodsApi.getAvailability()
        const availabilityMap = periods.reduce((acc, period) => {
          acc[period.section_name] = period
          return acc
        }, {} as { [key: string]: AppraisalPeriod })
        console.log(availabilityMap, 'available periods')
        setAvailability(availabilityMap)
      } catch (error) {
        console.error('Failed to fetch availability:', error)
        toast.error('Failed to load form availability status')
      } finally {
        setIsLoadingAvailability(false)
      }
    }

    if (isAuthenticated) {
      fetchAvailability()
    }
  }, [isAuthenticated])

  // Check for step parameter in URL
  useEffect(() => {
    const stepParam = searchParams.get('step')
    if (stepParam) {
      const stepMap: { [key: string]: typeof currentStep } = {
        '1': 'personal-info',
        '2': 'performance-planning',
        '3': 'mid-year-review',
        '4': 'end-year-review',
        '5': 'final-sections',
      }
      const step = stepMap[stepParam]
      if (step) {
        setCurrentStep(step)
      }
    }
  }, [searchParams])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isLoadingAvailability) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  const handlePersonalInfoNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, personalInfo: data }))
    setCurrentStep('performance-planning')
  }

  const handlePerformancePlanningNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, performancePlanning: data }))
    setCurrentStep('mid-year-review')
  }

  const handleMidYearReviewNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, midYearReview: data }))
    setCurrentStep('end-year-review')
  }

  const handleEndYearReviewNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, endYearReview: data }))
    if (data.isReviewMode) {
      setCurrentStep('annual-appraisal')
    } else {
      setCurrentStep('final-sections')
    }
  }

  const handleAnnualAppraisalNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, annualAppraisal: data }))
    setCurrentStep('final-sections')
  }

  const handleFinalSectionsNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, finalSections: data }))
    // Final submission - redirect to appraisals page
    router.push("/appraisals")
  }

  const handleBackToPersonalInfo = () => {
    setCurrentStep('personal-info')
  }

  const handleBackToPerformancePlanning = () => {
    setCurrentStep('performance-planning')
  }

  const handleBackToMidYearReview = () => {
    setCurrentStep('mid-year-review')
  }

  const handleBackToEndYearReview = () => {
    setCurrentStep('end-year-review')
  }

  // Helper to check if a section is available
  const getSectionAvailability = (stepId: string) => {
    const sectionMap: { [key: string]: string } = {
      'personal-info': 'personal_info',
      'performance-planning': 'performance_planning',
      'mid-year-review': 'mid_year_review',
      'end-year-review': 'end_year_review',
      'final-sections': 'final_sections'
    }
    const sectionName = sectionMap[stepId]
    return availability[sectionName] || { is_available: true, message: '' }
  }

  const isStepAvailable = (stepId: string) => {
    const section = getSectionAvailability(stepId)
    return section.is_available
  }

  const handleBackToAnnualAppraisal = () => {
    setCurrentStep('annual-appraisal')
  }

  return (
    <div className="h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <GuideNotesLayout guideState={guideState}>
          <main className="flex-1 p-6 space-y-6 overflow-auto">

            {/* Progress Indicator */}
            <div className="w-full max-w-4xl mx-auto mb-8 px-4">
              <div className="relative">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full" />

                {/* Progress Line */}
                <div
                  className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${(steps.findIndex(s => s.id === currentStep) / (steps.length - 1)) * 100}%`
                  }}
                />

                {/* Steps */}
                <div className="relative flex justify-between items-center w-full">
                  {steps.map((step, index) => {
                    const currentIndex = steps.findIndex(s => s.id === currentStep)
                    const isCompleted = index < currentIndex || appraisalData[step.status]
                    const isActive = step.id === currentStep
                    const isPending = index > currentIndex

                    return (
                      <div key={step.id} className="flex flex-col items-center gap-2 group cursor-default">
                        {/* Step Circle */}
                        <div
                          className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 bg-background
                          ${isCompleted
                              ? 'bg-primary border-primary text-primary-foreground scale-110'
                              : isActive
                                ? 'border-primary text-primary scale-125 ring-4 ring-primary/20'
                                : 'border-gray-300 text-gray-400'
                            }
                        `}
                        >
                          {isCompleted ? (
                            <Check className="w-4 h-4" strokeWidth={3} />
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>

                        {/* Step Label */}
                        <span className={`absolute top-10 text-xs font-semibold whitespace-nowrap transition-colors duration-300
                        ${isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}
                      `}>
                          {step.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="flex p-6 space-y-6 justify-center">
              {/* Form Content */}
              {currentStep === 'personal-info' ? (
                isStepAvailable('personal-info') ? (
                  <AppraiseePersonalInfoForm
                    onNext={handlePersonalInfoNext}
                    onBack={handleBackToPersonalInfo}
                  />
                ) : (
                  <FormUnavailable
                    sectionName="personal_info"
                    message={getSectionAvailability('personal-info').message || ''}
                    opensAt={getSectionAvailability('personal-info').opens_at}
                    onBack={() => router.push('/dashboard')}
                  />
                )
              ) : currentStep === 'performance-planning' ? (
                isStepAvailable('performance-planning') ? (
                  <PerformancePlanningForm
                    onNext={handlePerformancePlanningNext}
                    onBack={handleBackToPersonalInfo}
                  />
                ) : (
                  <FormUnavailable
                    sectionName="performance_planning"
                    message={getSectionAvailability('performance-planning').message || ''}
                    opensAt={getSectionAvailability('performance-planning').opens_at}
                    onBack={handleBackToPersonalInfo}
                  />
                )
              ) : currentStep === 'mid-year-review' ? (
                isStepAvailable('mid-year-review') ? (
                  <MidYearReviewForm
                    onNext={handleMidYearReviewNext}
                    onBack={handleBackToPerformancePlanning}
                  />
                ) : (
                  <FormUnavailable
                    sectionName="mid_year_review"
                    message={getSectionAvailability('mid-year-review').message || ''}
                    opensAt={getSectionAvailability('mid-year-review').opens_at}
                    onBack={handleBackToPerformancePlanning}
                  />
                )
              ) : currentStep === 'end-year-review' ? (
                isStepAvailable('end-year-review') ? (
                  <EndYearReviewForm
                    onNext={handleEndYearReviewNext}
                    onBack={handleBackToMidYearReview}
                  />
                ) : (
                  <FormUnavailable
                    sectionName="end_year_review"
                    message={getSectionAvailability('end-year-review').message || ''}
                    opensAt={getSectionAvailability('end-year-review').opens_at}
                    onBack={handleBackToMidYearReview}
                  />
                )
              ) : currentStep === 'annual-appraisal' ? (
                <AnnualAppraisalForm
                  onNext={handleAnnualAppraisalNext}
                  onBack={handleBackToEndYearReview}
                />
              ) : (
                isStepAvailable('final-sections') ? (
                  <FinalSectionsForm
                    onNext={handleFinalSectionsNext}
                    onBack={handleBackToEndYearReview}
                  />
                ) : (
                  <FormUnavailable
                    sectionName="final_sections"
                    message={getSectionAvailability('final-sections').message || ''}
                    opensAt={getSectionAvailability('final-sections').opens_at}
                    onBack={handleBackToEndYearReview}
                  />
                )
              )}
            </div>
          </main>
        </GuideNotesLayout>
      </div>
    </div>
  )
}


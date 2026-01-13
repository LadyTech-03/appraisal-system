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
    if(data.isReviewMode){
      setCurrentStep('annual-appraisal')
    }else{
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
          <div className="max-w-full mx-auto flex flex-wrap items-center gap-4 justify-center ">
            {steps.map((step)=>(
              <div key={step.id} className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentStep === step.id 
                  ? 'bg-primary text-primary-foreground' 
                  : appraisalData[step.status] 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-gray-200 text-gray-600'
              }`}>
                <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                  {appraisalData[step.status] ? <Check className="w-4 h-4 text-white" /> : ''}
                </span>  
                <span>{step.name}</span>
              </div>
            ))}
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


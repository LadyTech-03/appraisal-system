"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Loader2, Check } from "lucide-react"
import { getPersonalInfoByUserId, PersonalInfo } from "@/lib/api/personalInfo"
import { appraisalsApi } from "@/lib/api/appraisals"
import { PerformancePlanningForm } from "@/components/performance-planning-form"
import { MidYearReviewForm } from "@/components/mid-year-review-form"
import { EndYearReviewForm } from "@/components/end-year-review-form"
import { AnnualAppraisalForm } from "@/components/annual-appraisal-form"
import { FinalSectionsForm } from "@/components/final-sections-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AppraiseePersonalInfoForm } from "@/components/appraisee-personal-info-form"
import { GuideNotesLayout, useGuideNotes } from "@/components/guide-notes/guide-notes-selector"

type Step = 'personal-info' | 'performance-planning' | 'mid-year-review' | 'end-year-review' | 'annual-appraisal' | 'final-sections' | null

const steps = [
  { id: 'personal-info', name: 'Personal Information', status: 'personalInfo' },
  { id: 'performance-planning', name: 'Performance Planning', status: 'performancePlanning' },
  { id: 'mid-year-review', name: 'Mid Year Review', status: 'midYearReview' },
  { id: 'end-year-review', name: 'End Year Review', status: 'endYearReview' },
  { id: 'annual-appraisal', name: 'Annual Appraisal', status: 'annualAppraisal' },
  { id: 'final-sections', name: 'Final Sections', status: 'finalSections' },
]

export default function TeamMemberAppraisalPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const guideState = useGuideNotes()
  const user_id = params?.user_id as string
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [currentStep, setCurrentStep] = useState<Step>(null)
  const [appraisalData, setAppraisalData] = useState<any>({
    personalInfo: null,
    performancePlanning: null,
    midYearReview: null,
    endYearReview: null,
    annualAppraisal: null,
    finalSections: null
  })
  const [savedStep, setSavedStep] = useState<string | null>(null)
  const [showResumeDialog, setShowResumeDialog] = useState(false)
  const [gettingLockStatus, setGettingLockStatus ] = useState(false)
  const [lockStatus, setLockStatus] = useState<{
    personalInfo?: { locked: boolean; lockedAt?: string };
    performancePlanning?: { locked: boolean; lockedAt?: string };
    midYearReview?: { locked: boolean; lockedAt?: string };
    endYearReview?: { locked: boolean; lockedAt?: string };
    finalSections?: { locked: boolean; lockedAt?: string };
    annualAppraisal?: { locked: boolean; lockedAt?: string };
  } | null>(null)

  useEffect(()=>{
    const getLockStatus = async () => {
      // Also fetch lock status
        try {
          setGettingLockStatus(true)
          const locks = await appraisalsApi.getFormLockStatus(user_id)
          setLockStatus(locks)
          console.log(locks, 'lock status')
        } catch (lockError) {
          console.log('Could not fetch lock status:', lockError)
        } finally {
          setGettingLockStatus(false);
        }
    }

    getLockStatus()
  },[user])


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

  // Check for in-progress appraisal and show resume dialog
  useEffect(() => {
    const checkCurrentAppraisal = async () => {
      // Skip if URL already has a step parameter
      if (searchParams.get('step')) return

      try {
        // Pass role=manager and employeeId to get manager's step for this employee's appraisal
        const currentAppraisal = await appraisalsApi.getCurrentAppraisal({
          role: 'manager',
          employeeId: user_id
        })
        if (currentAppraisal && currentAppraisal.currentStep) {
          setSavedStep(currentAppraisal.currentStep)
          setShowResumeDialog(true)
        } else {
          setCurrentStep('personal-info')
        }
      } catch (error) {
        console.log('No current appraisal found or error:', error)
        setCurrentStep('personal-info')
      }
    }

    if (user && user_id && !gettingLockStatus) {
      checkCurrentAppraisal()
    }
  }, [user, user_id, searchParams])

  // Fetch team member's personal info
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (!user_id) {
        console.log("No user ID provided")
        return
      }

      try {
        setIsLoading(true)
        const data = await getPersonalInfoByUserId(user_id)
        if (data && data.length > 0) {
          setPersonalInfo(data[0])
        }
      } catch (error) {
        console.error("Error fetching personal info:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchPersonalInfo()
    }
  }, [user_id, user])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
      </div>
    )
  }

  const handlePersonalInfoNext = async (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, personalInfo: data }))
    setCurrentStep('performance-planning')
    // Update manager's current step on server
    try {
      await appraisalsApi.updateManagerStep(user_id, 'performance-planning')
    } catch (error) {
      console.log('Failed to update manager step:', error)
    }
  }

  const handlePerformancePlanningNext = async (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, performancePlanning: data }))
    setCurrentStep('mid-year-review')
    try {
      await appraisalsApi.updateManagerStep(user_id, 'mid-year-review')
    } catch (error) {
      console.log('Failed to update manager step:', error)
    }
  }

  const handleMidYearReviewNext = async (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, midYearReview: data }))
    setCurrentStep('end-year-review')
    try {
      await appraisalsApi.updateManagerStep(user_id, 'end-year-review')
    } catch (error) {
      console.log('Failed to update manager step:', error)
    }
  }

  const handleEndYearReviewNext = async (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, endYearReview: data }))
    setCurrentStep('annual-appraisal')
    try {
      await appraisalsApi.updateManagerStep(user_id, 'annual-appraisal')
    } catch (error) {
      console.log('Failed to update manager step:', error)
    }
  }

  const handleAnnualAppraisalNext = async (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, annualAppraisal: data }))
    setCurrentStep('final-sections')
    try {
      await appraisalsApi.updateManagerStep(user_id, 'final-sections')
    } catch (error) {
      console.log('Failed to update manager step:', error)
    }
  }

  const handleFinalSectionsNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, finalSections: data }))
    // Redirect back to team appraisals
    router.push("/team-appraisals")
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

  const handleBackToAnnualAppraisal = () => {
    setCurrentStep('annual-appraisal')
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 'personal-info':
        return 'Personal Information'
      case 'performance-planning':
        return 'Performance Planning'
      case 'mid-year-review':
        return 'Mid-Year Review'
      case 'end-year-review':
        return 'End-of-Year Review'
      case 'annual-appraisal':
        return 'Annual Appraisal'
      case 'final-sections':
        return 'Final Sections'
      default:
        return ''
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 'personal-info':
        return 'Review and complete personal information'
      case 'performance-planning':
        return 'Review and complete performance planning targets'
      case 'mid-year-review':
        return 'Review mid-year progress and provide feedback'
      case 'end-year-review':
        return 'Evaluate end-of-year performance and calculate scores'
      case 'annual-appraisal':
        return 'Assess competencies and overall performance'
      case 'final-sections':
        return 'Complete final comments, career development, and assessment decision'
      default:
        return ''
    }
  }
  // Get display name for a step
  const getStepDisplayName = (stepId: string) => {
    const step = steps.find(s => s.id === stepId)
    return step?.name || stepId
  }

  // Handle resume confirmation
  const handleResumeAppraisal = () => {
    if (savedStep) {
      setCurrentStep(savedStep as typeof currentStep)
    }
    setShowResumeDialog(false)
  }

  // Handle start over
  const handleStartOver = () => {
    setShowResumeDialog(false)
    setCurrentStep('personal-info')
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Topbar />

          {currentStep && (
            <GuideNotesLayout guideState={guideState}>
              <main className="flex-1 p-6 space-y-6">
                {/* Progress Indicator */}
                <div className="w-full max-w-4xl mx-auto mb-12 px-4">
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

                {/* Team Member Info */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">Loading appraisal...</span>
                  </div>
                ) : personalInfo ? (
                  <>
                    {/* Form Content */}
                    {
                      currentStep === 'personal-info' ? (
                        <AppraiseePersonalInfoForm
                          onNext={handlePersonalInfoNext}
                          onBack={() => router.push("/team-appraisals")}
                          isReviewMode={true}
                          reviewUserId={user_id}
                          isLocked={lockStatus?.personalInfo?.locked || false}
                        />
                      ) : currentStep === 'performance-planning' ? (
                        <PerformancePlanningForm
                          onNext={handlePerformancePlanningNext}
                          onBack={handleBackToPersonalInfo}
                          isReviewMode={true}
                          reviewUserId={user_id}
                          isLocked={lockStatus?.performancePlanning?.locked || false}
                        />
                      ) : currentStep === 'mid-year-review' ? (
                        <MidYearReviewForm
                          onNext={handleMidYearReviewNext}
                          onBack={handleBackToPerformancePlanning}
                          isReviewMode={true}
                          reviewUserId={user_id}
                          isLocked={lockStatus?.midYearReview?.locked || false}
                        />
                      ) : currentStep === 'end-year-review' ? (
                        <EndYearReviewForm
                          onNext={handleEndYearReviewNext}
                          onBack={handleBackToMidYearReview}
                          isReviewMode={true}
                          reviewUserId={user_id}
                          isLocked={lockStatus?.endYearReview?.locked || false}
                        />
                      ) : currentStep === 'annual-appraisal' ? (
                        <AnnualAppraisalForm
                          onNext={handleAnnualAppraisalNext}
                          onBack={handleBackToEndYearReview}
                          isReviewMode={true}
                          reviewUserId={user_id}
                          isLocked={lockStatus?.annualAppraisal?.locked || false}
                        />
                      ) : (
                        <FinalSectionsForm
                          onNext={handleFinalSectionsNext}
                          onBack={handleBackToAnnualAppraisal}
                          isReviewMode={true}
                          reviewUserId={user_id}
                          isLocked={lockStatus?.finalSections?.locked || false}
                        />
                      )}
                  </>
                ) : (
                  <Card className="glass-card">
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">No appraisal found for this team member.</p>
                    </CardContent>
                  </Card>
                )}
              </main>
            </GuideNotesLayout>
          )}
        </div>
      </div>

      {/* Resume Confirmation Dialog */}
      <AlertDialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resume Your Review?</AlertDialogTitle>
            <AlertDialogDescription>
              You have an in-progress review for this team member. You were on <strong>{getStepDisplayName(savedStep || '')}</strong>.
              Would you like to resume from where you left off?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleStartOver}>Start Over</AlertDialogCancel>
            <AlertDialogAction onClick={handleResumeAppraisal}>Resume</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

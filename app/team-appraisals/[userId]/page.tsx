"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Loader2 } from "lucide-react"
import { getPersonalInfoByUserId, PersonalInfo } from "@/lib/api/personalInfo"
import { PerformancePlanningForm } from "@/components/performance-planning-form"
import { MidYearReviewForm } from "@/components/mid-year-review-form"
import { EndYearReviewForm } from "@/components/end-year-review-form"
import { AnnualAppraisalForm } from "@/components/annual-appraisal-form"
import { FinalSectionsForm } from "@/components/final-sections-form"
import { AppraiseePersonalInfoForm } from "@/components/appraisee-personal-info-form"

type Step = 'personal-info' | 'performance-planning' | 'mid-year-review' | 'end-year-review' | 'annual-appraisal' | 'final-sections'

export default function TeamMemberAppraisalPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params?.userId as string
  const { user, isAuthenticated, token } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [currentStep, setCurrentStep] = useState<Step>('personal-info')
  const [appraisalData, setAppraisalData] = useState<any>({
    personalInfo: null,
    performancePlanning: null,
    midYearReview: null,
    endYearReview: null,
    annualAppraisal: null,
    finalSections: null
  })

  useEffect(() => {
    if (!isAuthenticated && !token) {
        if (!useAuthStore.getState().isAuthenticated) {
            console.log("User is not authenticated")
          router.push("/login")
        }
    }
  }, [isAuthenticated, token, router])

  // Fetch team member's personal info
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (!userId) {
        console.log("No user ID provided")
        return
      }

      try {
        setIsLoading(true)
        const data = await getPersonalInfoByUserId(userId)
        if (data && data.length > 0) {
          setPersonalInfo(data[0])
        }
      } catch (error) {
        console.error("Error fetching personal info:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchPersonalInfo()
    }
  }, [userId, isAuthenticated])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
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
    setCurrentStep('annual-appraisal')
  }

  const handleAnnualAppraisalNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, annualAppraisal: data }))
    setCurrentStep('final-sections')
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/team-appraisals")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Team Appraisals
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">Review Appraisal - {getStepTitle()}</h1>
                <p className="text-muted-foreground">{getStepDescription()}</p>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center gap-2">
              <User className="h-3 w-3" />
              Review Mode
            </Badge>
          </div>

          {/* Team Member Info */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading appraisal...</span>
            </div>
          ) : personalInfo ? (
            <>
              {/* <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <span>Appraisee Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-semibold">{personalInfo.user_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Job Title</p>
                      <p className="font-semibold">{personalInfo.present_job_title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Employee ID</p>
                      <p className="font-semibold">{personalInfo.employee_id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Division</p>
                      <p className="font-semibold">{personalInfo.division}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Appraisal Period</p>
                      <p className="font-semibold">
                        {new Date(personalInfo.period_from).toLocaleDateString()} - {new Date(personalInfo.period_to).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Grade/Salary</p>
                      <p className="font-semibold">{personalInfo.grade_salary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              {/* Form Content */}
              {
              currentStep === 'personal-info' ? (
                <AppraiseePersonalInfoForm 
                  onNext={handlePersonalInfoNext}
                  onBack={() => router.push("/team-appraisals")}
                  isReviewMode={true}
                  reviewUserId={userId}
                />
              ) : currentStep === 'performance-planning' ? (
                <PerformancePlanningForm 
                  onNext={handlePerformancePlanningNext}
                  onBack={handleBackToPersonalInfo}
                  isReviewMode={true}
                  reviewUserId={userId}
                />
              ) : currentStep === 'mid-year-review' ? (
                <MidYearReviewForm 
                  onNext={handleMidYearReviewNext}
                  onBack={handleBackToPerformancePlanning}
                  isReviewMode={true}
                  reviewUserId={userId}
                />
              ) : currentStep === 'end-year-review' ? (
                <EndYearReviewForm 
                  onNext={handleEndYearReviewNext}
                  onBack={handleBackToMidYearReview}
                  isReviewMode={true}
                  reviewUserId={userId}
                />
              ) : currentStep === 'annual-appraisal' ? (
                <AnnualAppraisalForm 
                  onNext={handleAnnualAppraisalNext}
                  onBack={handleBackToEndYearReview}
                  isReviewMode={true}
                  reviewUserId={userId}
                />
              ) : (
                <FinalSectionsForm 
                  onNext={handleFinalSectionsNext}
                  onBack={handleBackToAnnualAppraisal}
                  isReviewMode={true}
                  reviewUserId={userId}
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
      </div>
    </div>
  )
}

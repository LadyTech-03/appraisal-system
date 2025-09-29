"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { AppraiseePersonalInfoForm } from "@/components/appraisee-personal-info-form"
import { PerformancePlanningForm } from "@/components/performance-planning-form"
import { MidYearReviewForm } from "@/components/mid-year-review-form"
import { EndYearReviewForm } from "@/components/end-year-review-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"

export default function CreateAppraisalPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [currentStep, setCurrentStep] = useState<'personal-info' | 'performance-planning' | 'mid-year-review' | 'end-year-review'>('personal-info')
  const [appraisalData, setAppraisalData] = useState<any>({
    personalInfo: null,
    performancePlanning: null,
    midYearReview: null,
    endYearReview: null
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
  }, [isAuthenticated, router])

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
    
    // Complete appraisal data
    const completeAppraisalData = { ...appraisalData, endYearReview: data }
    console.log("Complete appraisal data:", completeAppraisalData)
    
    // TODO: Save appraisal to database/backend
    // For now, we'll redirect to appraisals page
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">Create New Appraisal</h1>
                <p className="text-muted-foreground">
                  {currentStep === 'personal-info' 
                    ? "Fill in the appraisee's personal information to start the appraisal process"
                    : currentStep === 'performance-planning'
                    ? "Define performance goals and key result areas for the appraisal period"
                    : currentStep === 'mid-year-review'
                    ? "Review progress on targets and competencies at mid-year"
                    : "Evaluate performance against targets and calculate final scores"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center space-x-4 justify-center">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'personal-info' 
                ? 'bg-primary text-primary-foreground' 
                : appraisalData.personalInfo 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-gray-200 text-gray-600'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                {appraisalData.personalInfo ? <Check className="w-4 h-4 text-white" /> : '1'}
              </span>
              <span>Personal Information</span>
            </div>
            <div className={`w-8 h-0.5 ${
              appraisalData.personalInfo ? 'bg-green-300' : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'performance-planning' 
                ? 'bg-primary text-primary-foreground' 
                : appraisalData.performancePlanning 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-gray-200 text-gray-600'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                {appraisalData.performancePlanning ? <Check className="w-4 h-4 text-white" /> : '2'}
              </span>
              <span>Performance Planning</span>
            </div>
            <div className={`w-8 h-0.5 ${
              appraisalData.performancePlanning ? 'bg-green-300' : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'mid-year-review' 
                ? 'bg-primary text-primary-foreground' 
                : appraisalData.midYearReview 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-gray-200 text-gray-600'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                {appraisalData.midYearReview ? <Check className="w-4 h-4 text-white" /> : '3'}
              </span>
              <span>Mid-Year Review</span>
            </div>
            <div className={`w-8 h-0.5 ${
              appraisalData.midYearReview ? 'bg-green-300' : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'end-year-review' 
                ? 'bg-primary text-primary-foreground' 
                : appraisalData.endYearReview 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-gray-200 text-gray-600'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                {appraisalData.endYearReview ? <Check className="w-4 h-4 text-white" /> : '4'}
              </span>
              <span>End-of-Year Review</span>
            </div>
          </div>

          {/* Form Content */}
          {currentStep === 'personal-info' ? (
            <AppraiseePersonalInfoForm onNext={handlePersonalInfoNext} />
          ) : currentStep === 'performance-planning' ? (
            <PerformancePlanningForm 
              onNext={handlePerformancePlanningNext}
              onBack={handleBackToPersonalInfo}
            />
          ) : currentStep === 'mid-year-review' ? (
            <MidYearReviewForm 
              onNext={handleMidYearReviewNext}
              onBack={handleBackToPerformancePlanning}
            />
          ) : (
            <EndYearReviewForm 
              onNext={handleEndYearReviewNext}
              onBack={handleBackToMidYearReview}
            />
          )}
        </main>
      </div>
    </div>
  )
}


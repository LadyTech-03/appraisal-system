"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuthStore, useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { AppraiseePersonalInfoForm } from "@/components/appraisee-personal-info-form"
import { AppraiserInfoForm } from "@/components/appraiser-info-form"
import { PerformancePlanningForm } from "@/components/performance-planning-form"
import { MidYearReviewForm } from "@/components/mid-year-review-form"
import { EndYearReviewForm } from "@/components/end-year-review-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Save, Send } from "lucide-react"
import { GuideNotesLayout, useGuideNotes } from "@/components/guide-notes/guide-notes-selector"


export default function AppraisalReviewPage() {
  const router = useRouter()
  const params = useParams()
  const { user, isAuthenticated } = useAuthStore()
  const { appraisals, users } = useAppStore()
  const [currentStep, setCurrentStep] = useState<'personal-info' | 'appraiser-info' | 'performance-planning' | 'mid-year-review' | 'end-year-review'>('personal-info')
  const [appraisalData, setAppraisalData] = useState<any>(null)
  const [appraiserData, setAppraiserData] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const guideState = useGuideNotes()
  

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Find the appraisal by ID
    const appraisal = appraisals.find(a => a.id === params.id)
    if (!appraisal) {
      router.push("/team-appraisals")
      return
    }

    // Check if user is the appraiser for this appraisal
    const employee = users.find(u => u.id === appraisal.employee_id)
    if (!employee || !user?.id) {
      router.push("/team-appraisals")
      return
    }

    // Load appraisal data
    setAppraisalData(appraisal)
    setIsLoading(false)
  }, [isAuthenticated, user, appraisals, users, params.id, router])

  if (!isAuthenticated || !user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
      </div>
    )
  }

  if (!appraisalData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Appraisal Not Found</h2>
          <p className="text-muted-foreground mb-4">The appraisal you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/team-appraisals")}>
            Back to Team Appraisals
          </Button>
        </div>
      </div>
    )
  }

  const employee = users.find(u => u.id === appraisalData.employee_id)

  const handlePersonalInfoNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, personalInfo: data }))
    setCurrentStep('appraiser-info')
  }

  const handleAppraiserInfoNext = (data: any) => {
    setAppraiserData(data)
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
    // TODO: Save reviewed appraisal
    console.log("Reviewed appraisal data:", { ...appraisalData, endYearReview: data, appraiserData })
    // TODO: Navigate to success page or back to team appraisals
  }

  const handleBackToPersonalInfo = () => {
    setCurrentStep('personal-info')
  }

  const handleBackToAppraiserInfo = () => {
    setCurrentStep('appraiser-info')
  }

  const handleBackToPerformancePlanning = () => {
    setCurrentStep('performance-planning')
  }

  const handleBackToMidYearReview = () => {
    setCurrentStep('mid-year-review')
  }

  const handleSaveDraft = () => {
    // TODO: Save as draft
    console.log("Saving draft...")
  }

  const handleSubmitReview = () => {
    // TODO: Submit review
    console.log("Submitting review...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-6 space-y-6">
        <GuideNotesLayout guideState={guideState}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push("/team-appraisals")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Team Appraisals
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">Review Appraisal</h1>
                <p className="text-muted-foreground">
                  Reviewing appraisal for {employee?.name} • {employee?.employee_id}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleSubmitReview}>
                <Send className="h-4 w-4 mr-2" />
                Submit Review
              </Button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'personal-info' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-green-100 text-green-700 border border-green-300'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                <Check className="w-4 h-4 text-white" />
              </span>
              <span>Personal Information</span>
            </div>
            <div className="w-8 h-0.5 bg-green-300"></div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'appraiser-info' 
                ? 'bg-primary text-primary-foreground' 
                : currentStep === 'performance-planning' || currentStep === 'mid-year-review' || currentStep === 'end-year-review'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                {currentStep === 'appraiser-info' ? '2' : <Check className="w-4 h-4 text-white" />}
              </span>
              <span>Appraiser Information</span>
            </div>
            <div className={`w-8 h-0.5 ${
              currentStep === 'performance-planning' || currentStep === 'mid-year-review' || currentStep === 'end-year-review'
                ? 'bg-green-300' 
                : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'performance-planning' 
                ? 'bg-primary text-primary-foreground' 
                : currentStep === 'mid-year-review' || currentStep === 'end-year-review'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                {currentStep === 'performance-planning' ? '3' : <Check className="w-4 h-4 text-white" />}
              </span>
              <span>Performance Planning</span>
            </div>
            <div className={`w-8 h-0.5 ${
              currentStep === 'mid-year-review' || currentStep === 'end-year-review'
                ? 'bg-green-300' 
                : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'mid-year-review' 
                ? 'bg-primary text-primary-foreground' 
                : currentStep === 'end-year-review'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                {currentStep === 'mid-year-review' ? '4' : <Check className="w-4 h-4 text-white" />}
              </span>
              <span>Mid-Year Review</span>
            </div>
            <div className={`w-8 h-0.5 ${
              currentStep === 'end-year-review'
                ? 'bg-green-300' 
                : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'end-year-review' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                {currentStep === 'end-year-review' ? '5' : '5'}
              </span>
              <span>End-of-Year Review</span>
            </div>
          </div>

          {/* Form Content */}
          {currentStep === 'personal-info' ? (
            <AppraiseePersonalInfoForm 
              onNext={handlePersonalInfoNext}
              initialData={appraisalData.personalInfo}
            />
          ) : currentStep === 'appraiser-info' ? (
            <AppraiserInfoForm 
              onDataChange={setAppraiserData}
              initialData={appraiserData}
            />
          ) : currentStep === 'performance-planning' ? (
            <PerformancePlanningForm 
              onNext={handlePerformancePlanningNext}
              onBack={handleBackToAppraiserInfo}
              isReviewMode={true}
              initialData={appraisalData.performancePlanning}
            />
          ) : currentStep === 'mid-year-review' ? (
            <MidYearReviewForm 
              onNext={handleMidYearReviewNext}
              onBack={handleBackToPerformancePlanning}
              isReviewMode={true}
              initialData={appraisalData.midYearReview}
            />
          ) : (
            <EndYearReviewForm 
              onNext={handleEndYearReviewNext}
              onBack={handleBackToMidYearReview}
              isReviewMode={true}
              initialData={appraisalData.endYearReview}
            />
          )}

          {/* Appraiser Information Section - Only show after personal info */}
          {currentStep !== 'personal-info' && currentStep !== 'appraiser-info' && (
            <div className="mt-8">
              <AppraiserInfoForm 
                onDataChange={setAppraiserData}
                initialData={appraiserData}
              />
            </div>
          )}
        </GuideNotesLayout>
        </main>
      </div>
    </div>
  )
}

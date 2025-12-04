"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  createAnnualAppraisal,
  updateAnnualAppraisal,
  getMyAnnualAppraisal,
  getAnnualAppraisalByUserId,
  deleteAnnualAppraisal,
  AnnualAppraisalData,
  CompetencyCategory,
  CompetencyItem
} from "@/lib/api/annualAppraisal"
import { usersApi } from "@/lib/api/users"
import { authApi } from "@/lib/api/auth"

// Initial Core Competencies structure
const initialCoreCompetencies: CompetencyCategory[] = [
  {
    id: "org-mgmt",
    name: "Organisation and Management",
    items: [
      { id: "1", description: "Ability to plan, organise and manage work load.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Ability to work systematically and maintain quality.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "3", description: "Ability to manage others to achieve shared goals.", weight: 0.3, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "innovation",
    name: "Innovation and Strategic Thinking",
    items: [
      { id: "1", description: "Support for organisational change", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Ability to think broadly and demonstrate creativity.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "3", description: "Originality in thinking", weight: 0.3, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "leadership",
    name: "Leadership and Decision Making",
    items: [
      { id: "1", description: "Ability to initiate action and provide direction to others", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Accept responsibility and decision-making.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "3", description: "Ability to exercise good judgment", weight: 0.3, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "developing",
    name: "Developing and Improving",
    items: [
      { id: "1", description: "Commitment to organization development", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Commitment to customer satisfaction", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "3", description: "Commitment to personnel development", weight: 0.3, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "communication",
    name: "Communication (oral, written & electronic)",
    items: [
      { id: "1", description: "Ability to communicate decisively clearly and fluently", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Ability to negotiate and manage conflict effectively.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "3", description: "Ability to relate and network across different levels and departments", weight: 0.3, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "job-knowledge",
    name: "Job Knowledge and Technical Skills",
    items: [
      { id: "1", description: "Demonstration of correct mental, physical and manual skills.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Demonstration of cross-functional awareness.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "3", description: "Building, applying and sharing of necessary expertise and technology.", weight: 0.3, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "supporting",
    name: "Supporting and Cooperating",
    items: [
      { id: "1", description: "Ability to work effectively with teams, clients and staff.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Ability to show support to others.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "3", description: "Ability to adhere to organisation's principles, ethics and values.", weight: 0.3, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "maximising",
    name: "Maximising and maintaining Productivity",
    items: [
      { id: "1", description: "Ability to motivate and inspire others.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Ability to accept challenges and execute them with confidence.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "3", description: "Ability to manage pressure and setbacks effectively.", weight: 0.3, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "budgets",
    name: "Developing / Managing budgets and saving cost",
    items: [
      { id: "1", description: "Firm awareness of financial issues and accountabilities.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Understanding of business processes and customer priorities.", weight: 0.3, score: 0, weightedScore: 0, comments: "" },
      { id: "3", description: "Executing result-based actions.", weight: 0.3, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  }
]

// Initial Non-Core Competencies structure
const initialNonCoreCompetencies: CompetencyCategory[] = [
  {
    id: "develop-staff",
    name: "Ability to Develop Staff",
    items: [
      { id: "1", description: "Able to develop others (subordinates).", weight: 0.1, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Able to provide guidance and support to staff for their development", weight: 0.1, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "personal-development",
    name: "Commitment to Own Personal Development and Training",
    items: [
      { id: "1", description: "Eagerness for self development.", weight: 0.1, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Inner drive to supplement training from organization.", weight: 0.1, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "customer-satisfaction",
    name: "Delivering Results and Ensuring Customer Satisfaction",
    items: [
      { id: "1", description: "Ensuring customer satisfaction.", weight: 0.1, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Ensuring the delivery of quality service and products", weight: 0.1, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "organisational-goals",
    name: "Following Instructions and Working Towards Organisational Goals",
    items: [
      { id: "1", description: "Keeping to laid -down regulations and procedures.", weight: 0.1, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Willingness to act on 'customer feedback' for customer satisfaction", weight: 0.1, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "respect-commitment",
    name: "Respect and Commitment",
    items: [
      { id: "1", description: "Respect for superiors, colleagues and customers.", weight: 0.1, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Commitment to work and Organisational Development.", weight: 0.1, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  },
  {
    id: "team-work",
    name: "Ability to Work Effectively in a Team",
    items: [
      { id: "1", description: "Ability to function in a team.", weight: 0.1, score: 0, weightedScore: 0, comments: "" },
      { id: "2", description: "Ability to work in a team.", weight: 0.1, score: 0, weightedScore: 0, comments: "" }
    ],
    total: 0,
    average: 0
  }
]

export function AnnualAppraisalForm({
  onNext,
  onBack,
  isReviewMode = false,
  initialData,
  reviewUserId
}: {
  onNext: (data: any) => void
  onBack: () => void
  isReviewMode?: boolean
  initialData?: any
  reviewUserId?: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [isClearingForm, setIsClearingForm] = useState(false)
  const [isUploadingSignature, setIsUploadingSignature] = useState(false)
  const [existingAppraisalId, setExistingAppraisalId] = useState<string | null>(null)
  const [userSignatureUrl, setUserSignatureUrl] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    coreCompetencies: initialData?.coreCompetencies || initialCoreCompetencies,
    nonCoreCompetencies: initialData?.nonCoreCompetencies || initialNonCoreCompetencies,
    appraiseeSignatureUrl: initialData?.appraiseeSignatureUrl || null as string | null,
    appraiseeDate: initialData?.appraiseeDate || ""
  })

  // Calculate totals and averages using useMemo to avoid infinite loops
  const calculatedData = useMemo(() => {
    // Calculate Core Competencies
    const updatedCoreCompetencies = formData.coreCompetencies.map((category: CompetencyCategory) => {
      const items = category.items.map((item: CompetencyItem) => ({
        ...item,
        weightedScore: item.score * item.weight
      }))
      const total = items.reduce((sum, item) => sum + item.weightedScore, 0)
      const average = items.length > 0 ? total / items.reduce((sum, item) => sum + item.weight, 0) : 0
      return { ...category, items, total, average }
    })

    // Calculate Non-Core Competencies
    const updatedNonCoreCompetencies = formData.nonCoreCompetencies.map((category: CompetencyCategory) => {
      const items = category.items.map((item: CompetencyItem) => ({
        ...item,
        weightedScore: item.score * item.weight
      }))
      const total = items.reduce((sum, item) => sum + item.weightedScore, 0)
      const average = items.length > 0 ? total / items.reduce((sum, item) => sum + item.weight, 0) : 0
      return { ...category, items, total, average }
    })

    // Calculate overall averages
    const coreAverages = updatedCoreCompetencies.map((c: CompetencyCategory) => c.average)
    const coreCompetenciesAverage = coreAverages.length > 0 
      ? coreAverages.reduce((sum: number, avg: number) => sum + avg, 0) / coreAverages.length 
      : 0

    const nonCoreAverages = updatedNonCoreCompetencies.map((c: CompetencyCategory) => c.average)
    const nonCoreCompetenciesAverage = nonCoreAverages.length > 0 
      ? nonCoreAverages.reduce((sum: number, avg: number) => sum + avg, 0) / nonCoreAverages.length 
      : 0

    // Get performance assessment score from previous step (placeholder for now)
    const performanceAssessmentScore = initialData?.performanceAssessmentScore || 0

    const overallTotal = performanceAssessmentScore + coreCompetenciesAverage + nonCoreCompetenciesAverage
    const overallScorePercentage = (overallTotal / 5) * 100

    return {
      coreCompetencies: updatedCoreCompetencies,
      nonCoreCompetencies: updatedNonCoreCompetencies,
      calculations: {
        performanceAssessmentScore,
        coreCompetenciesAverage: Math.round(coreCompetenciesAverage * 100) / 100,
        nonCoreCompetenciesAverage: Math.round(nonCoreCompetenciesAverage * 100) / 100,
        overallTotal: Math.round(overallTotal * 100) / 100,
        overallScorePercentage: Math.round(overallScorePercentage * 100) / 100
      }
    }
  }, [formData.coreCompetencies, formData.nonCoreCompetencies, initialData?.performanceAssessmentScore])

  // Load draft and user profile on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load user profile for signature
        const profile = await authApi.getProfile()
        if (profile?.data?.signatureUrl) {
          setUserSignatureUrl(profile.data.signatureUrl)
        }

        // Load existing draft
        let appraisals
        if (isReviewMode && reviewUserId) {
          appraisals = await getAnnualAppraisalByUserId(reviewUserId)
        } else {
          appraisals = await getMyAnnualAppraisal()
        }
        if (appraisals && appraisals.length > 0) {
          const latestAppraisal = appraisals[0]
          setFormData({
            coreCompetencies: latestAppraisal.core_competencies || initialCoreCompetencies,
            nonCoreCompetencies: latestAppraisal.non_core_competencies || initialNonCoreCompetencies,
            appraiseeSignatureUrl: latestAppraisal.appraisee_signature_url || null,
            appraiseeDate: latestAppraisal.appraisee_date ? latestAppraisal.appraisee_date.slice(0, 10) : ""
          })
          setExistingAppraisalId(latestAppraisal.id)
          toast.info("Loaded your draft annual appraisal")
        }
      } catch (error) {
        console.log("Error loading data:", error)
      }
    }
    loadData()
  }, [])

  const updateCompetencyScore = (
    type: 'core' | 'nonCore',
    categoryId: string,
    itemId: string,
    score: number
  ) => {
    const key = type === 'core' ? 'coreCompetencies' : 'nonCoreCompetencies'
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].map((category: CompetencyCategory) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item: CompetencyItem) =>
                item.id === itemId ? { ...item, score } : item
              )
            }
          : category
      )
    }))
  }

  const updateCompetencyComments = (
    type: 'core' | 'nonCore',
    categoryId: string,
    itemId: string,
    comments: string
  ) => {
    const key = type === 'core' ? 'coreCompetencies' : 'nonCoreCompetencies'
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].map((category: CompetencyCategory) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item: CompetencyItem) =>
                item.id === itemId ? { ...item, comments } : item
              )
            }
          : category
      )
    }))
  }

  const handleSignatureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "image/png") {
      setIsUploadingSignature(true)
      try {
        const result = await usersApi.uploadSignature(file)
        setUserSignatureUrl(result.signatureUrl)
        toast.success("Signature uploaded successfully")
      } catch (error) {
        toast.error("Failed to upload signature")
      } finally {
        setIsUploadingSignature(false)
      }
    } else if (file) {
      toast.error("Please upload a PNG image")
    }
  }

  const handleSign = () => {
    if (userSignatureUrl) {
      setFormData(prev => ({
        ...prev,
        appraiseeSignatureUrl: userSignatureUrl
      }))
      toast.success("Form signed successfully")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const payload: AnnualAppraisalData = {
        coreCompetencies: calculatedData.coreCompetencies,
        nonCoreCompetencies: calculatedData.nonCoreCompetencies,
        performanceAssessmentScore: calculatedData.calculations.performanceAssessmentScore,
        coreCompetenciesAverage: calculatedData.calculations.coreCompetenciesAverage,
        nonCoreCompetenciesAverage: calculatedData.calculations.nonCoreCompetenciesAverage,
        overallTotal: calculatedData.calculations.overallTotal,
        overallScorePercentage: calculatedData.calculations.overallScorePercentage,
        appraiseeSignatureUrl: formData.appraiseeSignatureUrl || undefined,
        appraiseeDate: formData.appraiseeDate || undefined
      }

      let savedAppraisal
      if (existingAppraisalId) {
        savedAppraisal = await updateAnnualAppraisal(existingAppraisalId, payload)
        toast.success("Annual appraisal updated successfully!")
      } else {
        savedAppraisal = await createAnnualAppraisal(payload)
        setExistingAppraisalId(savedAppraisal.id)
        toast.success("Annual appraisal saved successfully!")
      }

      onNext({ ...formData, calculations: calculatedData.calculations, annualAppraisalId: savedAppraisal.id })
    } catch (error) {
      toast.error("Failed to save annual appraisal")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearForm = async () => {
    setIsClearingForm(true)
    try {
      if (existingAppraisalId) {
        await deleteAnnualAppraisal(existingAppraisalId)
        toast.success("Form cleared and draft deleted")
      } else {
        toast.success("Form cleared")
      }
      setFormData({
        coreCompetencies: initialCoreCompetencies,
        nonCoreCompetencies: initialNonCoreCompetencies,
        appraiseeSignatureUrl: null,
        appraiseeDate: ""
      })
      setExistingAppraisalId(null)
    } catch (error) {
      toast.error("Failed to clear form")
    } finally {
      setIsClearingForm(false)
    }
  }

  const renderCompetencyCategory = (
    category: CompetencyCategory,
    type: 'core' | 'nonCore'
  ) => (
    <div key={category.id} className="space-y-2">
      <div className="font-semibold text-base bg-gray-50 p-2 rounded">
        {category.name}
      </div>
      {category.items.map((item) => (
        <div key={item.id} className="grid grid-cols-12 gap-2 items-start text-sm">
          <div className="col-span-5 pl-4">
            <p className="leading-relaxed">{item.description}</p>
          </div>
          <div className="col-span-1 text-center">
            <span className="font-medium">{item.weight}</span>
          </div>
          <div className="col-span-1">
            <select
              value={item.score}
              onChange={(e) => updateCompetencyScore(type, category.id, item.id, parseInt(e.target.value))}
              className="w-full h-8 text-xs border rounded px-1"
            >
              <option value={0}>-</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="col-span-1 text-center">
            <span className="font-medium">{item.weightedScore.toFixed(2)}</span>
          </div>
          <div className="col-span-4">
            <Textarea
              value={item.comments}
              onChange={(e) => updateCompetencyComments(type, category.id, item.id, e.target.value)}
              placeholder="Comments..."
              className="min-h-8 resize-none text-sm"
              rows={1}
            />
          </div>
        </div>
      ))}
      <div className="grid grid-cols-12 gap-2 items-center text-sm font-semibold bg-gray-100 p-2 rounded">
        <div className="col-span-5"></div>
        <div className="col-span-1"></div>
        <div className="col-span-1"></div>
        <div className="col-span-1 text-center">
          Total: {category.total.toFixed(2)}
        </div>
        <div className="col-span-4">
          Average: {category.average.toFixed(2)}
        </div>
      </div>
    </div>
  )

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-amber-800 text-white rounded-lg p-2">
          SECTION 5: Annual Appraisal
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Core Competencies */}
          <Card className="p-4">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm font-semibold">
                A/. CORE COMPETENCIES
              </Badge>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 text-sm font-semibold border-b pb-2">
                <div className="col-span-5">Competency</div>
                <div className="col-span-1 text-center">(W) weight</div>
                <div className="col-span-1 text-center">(S) Score on Scale</div>
                <div className="col-span-1 text-center">W × S</div>
                <div className="col-span-4">COMMENTS</div>
              </div>

              {/* Core Competencies Categories */}
              {calculatedData.coreCompetencies.map((category: CompetencyCategory) => renderCompetencyCategory(category, 'core'))}

              {/* Core Competencies Average */}
              <div className="grid grid-cols-12 gap-2 items-center text-base font-bold bg-blue-100 p-3 rounded">
                <div className="col-span-8">Average of ALL averages for CORE COMPETENCIES (N) =</div>
                <div className="col-span-4 text-right">{calculatedData.calculations.coreCompetenciesAverage.toFixed(2)}</div>
              </div>
            </div>
          </Card>

          {/* Non-Core Competencies */}
          <Card className="p-4">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm font-semibold">
                B. NON-CORE COMPETENCIES
              </Badge>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 text-sm font-semibold border-b pb-2">
                <div className="col-span-5">Competency</div>
                <div className="col-span-1 text-center">(W) weight</div>
                <div className="col-span-1 text-center">(S) Score on Scale</div>
                <div className="col-span-1 text-center">W × S</div>
                <div className="col-span-4">COMMENTS</div>
              </div>

              {/* Non-Core Competencies Categories */}
              {calculatedData.nonCoreCompetencies.map((category: CompetencyCategory) => renderCompetencyCategory(category, 'nonCore'))}

              {/* Non-Core Competencies Average */}
              <div className="grid grid-cols-12 gap-2 items-center text-sm font-bold bg-blue-100 p-3 rounded">
                <div className="col-span-8">Average of ALL averages for NON-CORE COMPETENCIES (O) =</div>
                <div className="col-span-4 text-right">{calculatedData.calculations.nonCoreCompetenciesAverage.toFixed(2)}</div>
              </div>
            </div>
          </Card>

          {/* Overall Assessment */}
          <Card className="p-4 bg-gray-50">
            <div className="space-y-3">
              <h3 className="font-bold text-lg">OVERALL ASSESSMENT</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">PERFORMANCE ASSESSMENT (M)</span>
                  <span className="font-bold">{calculatedData.calculations.performanceAssessmentScore.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">CORE COMPETENCIES ASSESSMENT (N)</span>
                  <span className="font-bold">{calculatedData.calculations.coreCompetenciesAverage.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">NON-CORE COMPETENCIES ASSESSMENT (O)</span>
                  <span className="font-bold">{calculatedData.calculations.nonCoreCompetenciesAverage.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-gray-400 pb-2 pt-2">
                  <span className="font-bold">OVERALL TOTAL</span>
                  <span className="font-bold text-lg">{calculatedData.calculations.overallTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center bg-blue-100 p-3 rounded">
                  <span className="font-bold">OVERALL ASSESSMENT/SCORE (Z) = T/5 X 100 =</span>
                  <span className="font-bold text-xl">{calculatedData.calculations.overallScorePercentage.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Signatures Section */}
          <div className="space-y-4">
            {/* <h3 className="text-lg font-semibold">Signatures</h3> */}
            
            <div className="gap-6">
              {/* Appraisee Signature */}
              {/* <Card className="p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="bg-amber-800 text-white p-2 rounded text-sm font-medium text-center">
                    APPRAISEE'S SIGNATURE
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <div className="mb-0">
                    {userSignatureUrl ? (
                      <div className="space-y-2">
                        {!formData.appraiseeSignatureUrl ? (
                          <>
                            <p className="text-sm text-muted-foreground">You have a signature on file</p>
                            <Button type="button" onClick={handleSign} variant="default" size="sm">
                              Sign
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-green-600 font-bold">✓ Signed</span>
                              <Button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, appraiseeSignatureUrl: null }))}
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs text-red-500"
                              >
                                Remove
                              </Button>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-sm">Signature:</Label>
                              <Card className="p-2 border-none shadow-none">
                                <Image
                                  src={formData.appraiseeSignatureUrl}
                                  alt="Appraisee Signature"
                                  width={100}
                                  height={50}
                                  className="max-h-12 max-w-full object-contain"
                                />
                              </Card>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="appraisee-signature" className="text-sm">
                          Upload Signature to Profile (PNG)
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="appraisee-signature"
                            type="file"
                            accept=".png"
                            onChange={handleSignatureUpload}
                            disabled={isUploadingSignature}
                            className="h-8 text-xs"
                          />
                          {isUploadingSignature && <Loader2 className="h-4 w-4 animate-spin" />}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="appraisee-date" className="text-sm">Date (dd/mm/yyyy)</Label>
                    <Input
                      id="appraisee-date"
                      type="date"
                      value={formData.appraiseeDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, appraiseeDate: e.target.value }))}
                      className="h-8 text-xs"
                      required
                    />
                  </div>
                </CardContent>
              </Card> */}

              {/* Appraiser Signature - Disabled for now */}
              <Card className="p-4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="bg-amber-800 text-white p-2 rounded text-sm font-medium text-center">
                    APPRAISER'S SIGNATURE
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <div className="space-y-1">
                    <Label className="text-sm">Upload Signature (PNG)</Label>
                    <Input type="file" accept=".png" disabled={!isReviewMode} className="h-8 text-xs" />
                    <p className="text-xs text-muted-foreground">
                      Completed by appraiser during review
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-sm">Date (dd/mm/yyyy)</Label>
                    <Input type="date" disabled={!isReviewMode} className="h-8 text-xs" />
                    <p className="text-xs text-muted-foreground">
                      Completed by appraiser during review
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              size="lg"
              className="px-8"
              disabled={isLoading || isClearingForm}
            >
              Back to Previous Section
            </Button>

            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="outline" size="lg" disabled={isLoading || isClearingForm}>
                    {isClearingForm ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Clearing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear Form
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Form?</AlertDialogTitle>
                    <AlertDialogDescription>
                      {existingAppraisalId
                        ? "This will delete your saved draft..."
                        : "This will clear all form fields..."}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearForm}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Clear Form
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                type="submit"
                size="lg"
                className="px-8"
                disabled={isLoading || isClearingForm}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {existingAppraisalId ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  "Continue to Next Section"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

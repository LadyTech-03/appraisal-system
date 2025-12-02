"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Loader2 } from "lucide-react"
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
  createEndYearReview,
  updateEndYearReview,
  getMyEndYearReview,
  deleteEndYearReview,
  EndYearReviewData
} from "@/lib/api/endYearReview"
import { usersApi } from "@/lib/api/users"
import { authApi } from "@/lib/api/auth"

interface TargetEvaluation {
  id: string
  target: string
  performanceAssessment: string
  weightOfTarget: number
  score: number
  comments: string
}

export function EndYearReviewForm({ 
  onNext, 
  onBack,
  isReviewMode = false,
  initialData
}: { 
  onNext: (data: any) => void
  onBack: () => void
  isReviewMode?: boolean
  initialData?: any
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [isClearingForm, setIsClearingForm] = useState(false)
  const [isUploadingSignature, setIsUploadingSignature] = useState(false)
  const [existingEndYearReviewId, setExistingEndYearReviewId] = useState<string | null>(null)
  const [userSignatureUrl, setUserSignatureUrl] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    targets: initialData?.targets || [
      { id: "1", target: "", performanceAssessment: "", weightOfTarget: 5, score: 0, comments: "" }
    ] as TargetEvaluation[],
    appraiseeSignatureUrl: initialData?.appraiseeSignatureUrl || null as string | null,
    appraiseeDate: initialData?.appraiseeDate || ""
  })

  // Calculate totals and averages
  const [calculations, setCalculations] = useState({
    totalWeight: 0,
    totalScore: 0,
    average: 0,
    finalScore: 0
  })

  useEffect(() => {
    const totalWeight = formData.targets.reduce((sum, target) => sum + target.weightOfTarget, 0)
    const totalScore = formData.targets.reduce((sum, target) => sum + (target.score * target.weightOfTarget), 0)
    const average = totalWeight > 0 ? totalScore / totalWeight : 0
    const finalScore = average * 0.6

    setCalculations({
      totalWeight,
      totalScore,
      average: Math.round(average * 100) / 100,
      finalScore: Math.round(finalScore * 100) / 100
    })
  }, [formData.targets])

  // Load draft and user profile on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load user profile for signature
        const profile = await authApi.getProfile()
        console.log(profile, 'This')
        if (profile?.data?.signatureUrl) {
          setUserSignatureUrl(profile.data.signatureUrl)
        }

        // Load existing draft
        const reviews = await getMyEndYearReview()
        if (reviews && reviews.length > 0) {
          const latestReview = reviews[0]
          setFormData({
            targets: latestReview.targets.map((item: any, index: number) => ({
                ...item,
                id: item.id || (index + 1).toString()
            })),
            appraiseeSignatureUrl: latestReview.appraisee_signature_url || null,
            appraiseeDate: latestReview.appraisee_date ? latestReview.appraisee_date.slice(0, 10) : ""
          })
          setExistingEndYearReviewId(latestReview.id)
          toast.info("Loaded your draft end-year review")
        }
      } catch (error) {
        console.log("Error loading data:", error)
      }
    }
    loadData()
  }, [])

  const addTarget = () => {
    if (formData.targets.length < 9) {
      const newId = (formData.targets.length + 1).toString()
      setFormData(prev => ({
        ...prev,
        targets: [
          ...prev.targets,
          { id: newId, target: "", performanceAssessment: "", weightOfTarget: 5, score: 0, comments: "" }
        ]
      }))
    }
  }

  const removeTarget = (id: string) => {
    if (formData.targets.length > 1) {
      setFormData(prev => ({
        ...prev,
        targets: prev.targets.filter(target => target.id !== id)
      }))
    }
  }

  const updateTarget = (id: string, field: keyof TargetEvaluation, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      targets: prev.targets.map(target =>
        target.id === id ? { ...target, [field]: value } : target
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
      const payload: EndYearReviewData = {
          targets: formData.targets,
          calculations: calculations,
          appraiseeSignatureUrl: formData.appraiseeSignatureUrl || undefined,
          appraiseeDate: formData.appraiseeDate || undefined
      }

      let savedReview
      if (existingEndYearReviewId) {
          savedReview = await updateEndYearReview(existingEndYearReviewId, payload)
          toast.success("End-year review updated successfully!")
      } else {
          savedReview = await createEndYearReview(payload)
          setExistingEndYearReviewId(savedReview.id)
          toast.success("End-year review saved successfully!")
      }
      
      onNext({ ...formData, calculations, endYearReviewId: savedReview.id })
    } catch (error) {
        toast.error("Failed to save end-year review")
    } finally {
        setIsLoading(false)
    }
  }

  const handleClearForm = async () => {
      setIsClearingForm(true)
      try {
          if (existingEndYearReviewId) {
              await deleteEndYearReview(existingEndYearReviewId)
              toast.success("Form cleared and draft deleted")
          } else {
              toast.success("Form cleared")
          }
          setFormData({
            targets: [
                { id: "1", target: "", performanceAssessment: "", weightOfTarget: 5, score: 0, comments: "" }
            ],
            appraiseeSignatureUrl: null,
            appraiseeDate: ""
          })
          setExistingEndYearReviewId(null)
      } catch (error) {
          toast.error("Failed to clear form")
      } finally {
          setIsClearingForm(false)
      }
  }

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader className="">
        <CardTitle className="text-xl font-bold bg-amber-800 text-white rounded-lg p-2">
          SECTION 4: End-of-Year Review Form
        </CardTitle>
        <div className="space-y-1 mt-2">
          <p className="text-sm text-muted-foreground">
            This is to be completed in December by the Appraiser and Appraisee.
          </p>
          <p className="text-sm text-muted-foreground">
            Please refer to page <strong>8</strong> of the manual for guidance to the scoring.
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* End-of-Year Review Title */}
          <div className="text-center">
            <h2 className="text-lg font-semibold">END-OF-YEAR REVIEW FORM</h2>
          </div>

          {/* Targets Evaluation Table */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-sm font-semibold">
                  TARGETS EVALUATION
                </Badge>
                {formData.targets.length < 9 && (
                  <Button
                    type="button"
                    onClick={addTarget}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Target
                  </Button>
                )}
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 text-xs font-semibold border-b pb-2">
                <div className="col-span-1">NO.</div>
                <div className="col-span-3">TARGET</div>
                <div className="col-span-3">PERFORMANCE ASSESSMENT</div>
                <div className="col-span-1">WEIGHT OF TARGET</div>
                <div className="col-span-1">SCORE</div>
                <div className="col-span-2">COMMENTS</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Target Rows */}
              {formData.targets.map((target, index) => (
                <div key={target.id} className="grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-1 flex items-center justify-center pt-2">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <div className="col-span-3">
                    <Textarea
                      value={target.target}
                      onChange={(e) => updateTarget(target.id, "target", e.target.value)}
                      placeholder="Enter target"
                      className="min-h-10 resize-none text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <Textarea
                      value={target.performanceAssessment}
                      onChange={(e) => updateTarget(target.id, "performanceAssessment", e.target.value)}
                      placeholder="Enter performance assessment..."
                      className="min-h-10 resize-none text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      type="number"
                      value={target.weightOfTarget}
                      onChange={(e) => updateTarget(target.id, "weightOfTarget", parseInt(e.target.value) || 0)}
                      className="h-10 text-sm text-center"
                      disabled
                      min="0"
                      max="10"
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      type="number"
                      value={target.score}
                      onChange={(e) => updateTarget(target.id, "score", parseInt(e.target.value) || 0)}
                      className="h-10 text-sm text-center"
                      disabled
                      min="0"
                      max="10"
                    />
                  </div>
                   <div className={`col-span-2 ${!isReviewMode ? 'opacity-50' : ''}`}>
                     <Textarea
                       value={target.comments}
                       onChange={(e) => updateTarget(target.id, "comments", e.target.value)}
                       placeholder={isReviewMode ? "Enter appraiser's comments" : "Appraiser's comments (disabled)"}
                       className="min-h-10 resize-none text-sm"
                       disabled={!isReviewMode}
                     />
                   </div>
                  <div className="col-span-1 flex items-center justify-center pt-2">
                    {formData.targets.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTarget(target.id)}
                        className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {/* Calculation Rows */}
              <div className="space-y-2 pt-4 border-t">
                {/* TOTAL (Q) */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1"></div>
                  <div className="col-span-3"></div>
                  <div className="col-span-3"></div>
                  <div className="col-span-1 text-xs font-semibold">TOTAL (Q)</div>
                  <div className="col-span-1 text-xs font-semibold text-center bg-gray-100 p-2 rounded">
                    {calculations.totalScore}
                  </div>
                  <div className="col-span-2"></div>
                  <div className="col-span-1"></div>
                </div>

                {/* (A) AVERAGE (Q/n) */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1"></div>
                  <div className="col-span-3"></div>
                  <div className="col-span-3"></div>
                  <div className="col-span-1 text-xs font-semibold">(A) AVERAGE (Q/n)</div>
                  <div className="col-span-1 text-xs font-semibold text-center bg-gray-100 p-2 rounded">
                    {calculations.average}
                  </div>
                  <div className="col-span-2"></div>
                  <div className="col-span-1"></div>
                </div>

                {/* (M) = (A) x 0.6 */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1"></div>
                  <div className="col-span-3"></div>
                  <div className="col-span-3"></div>
                  <div className="col-span-1 text-xs font-semibold">(M) = (A) x 0.6</div>
                  <div className="col-span-1 text-xs font-semibold text-center bg-blue-100 p-2 rounded">
                    {calculations.finalScore}
                  </div>
                  <div className="col-span-2"></div>
                  <div className="col-span-1"></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Signatures Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Signatures</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appraisee Signature */}
              <Card className="p-4">
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
                                        <Button type="button" onClick={() => setFormData(prev => ({ ...prev, appraiseeSignatureUrl: null }))} variant="ghost" size="sm" className="h-6 text-xs text-red-500">
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
                            <Label htmlFor="appraisee-signature" className="text-sm">Upload Signature to Profile (PNG)</Label>
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
              </Card>

               {/* Appraiser Signature */}
               <Card className={`p-4 ${!isReviewMode ? 'opacity-50' : ''}`}>
                 <CardHeader className="p-0 pb-4">
                   <CardTitle className={`${isReviewMode ? 'bg-amber-800' : 'bg-gray-600'} text-white p-2 rounded text-sm font-medium text-center`}>
                     APPRAISER'S SIGNATURE
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="p-0 space-y-3">
                   <div className="space-y-1">
                     <Label className="text-sm">Upload Signature (PNG)</Label>
                     <Input
                       type="file"
                       accept=".png"
                       disabled={!isReviewMode}
                       className="h-8 text-xs"
                     />
                     {!isReviewMode && (
                       <p className="text-xs text-muted-foreground">
                         Completed by appraiser during review
                       </p>
                     )}
                   </div>
                   
                   <div className="space-y-1">
                     <Label className="text-sm">Date (dd/mm/yyyy)</Label>
                     <Input
                       type="date"
                       disabled={!isReviewMode}
                       className="h-8 text-xs"
                     />
                     {!isReviewMode && (
                       <p className="text-xs text-muted-foreground">
                         Completed by appraiser during review
                       </p>
                     )}
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
                      {isClearingForm ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Clearing...</> : <><Trash2 className="mr-2 h-4 w-4" /> Clear Form</>}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear Form?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {existingEndYearReviewId ? "This will delete your saved draft..." : "This will clear all form fields..."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearForm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Clear Form
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-8"
                  disabled={isLoading || isClearingForm || !formData.appraiseeSignatureUrl || !formData.appraiseeDate}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {existingEndYearReviewId ? "Updating..." : "Saving..."}
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

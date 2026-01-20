"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, Info, Loader2, Trash2 } from "lucide-react"
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
  createFinalSections,
  updateFinalSections,
  getMyFinalSections,
  deleteFinalSections,
  FinalSectionsData,
  getFinalSectionsByUserId
} from "@/lib/api/finalSections"
import { usersApi } from "@/lib/api/users"
import { authApi } from "@/lib/api/auth"
import { useRouter } from "next/navigation"
import { appraisalsApi } from "@/lib/api/appraisals"

export function FinalSectionsForm({
  onNext,
  onBack,
  isReviewMode = false,
  reviewUserId,
  initialData
}: {
  onNext: (data: any) => void
  onBack: () => void
  isReviewMode?: boolean
  reviewUserId?: string
  initialData?: any
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isClearingForm, setIsClearingForm] = useState(false)
  const [isUploadingSignature, setIsUploadingSignature] = useState(false)
  const [existingFinalSectionsId, setExistingFinalSectionsId] = useState<string | null>(null)
  const [appraiserSignatureUrl, setAppraiserSignatureUrl] = useState<string | null>(null)
  const [appraiseeSignatureUrl, setAppraiseeSignatureUrl] = useState<string | null>(null)
  const [hodSignatureUrl, setHodSignatureUrl] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)


  const [formData, setFormData] = useState({
    appraisalId: "",
    appraiserComments: initialData?.appraiserComments || "",
    appraiserSignatureUrl: initialData?.appraiserSignatureUrl || null as string | null,
    appraiserDate: initialData?.appraiserDate || "",
    careerDevelopmentComments: initialData?.careerDevelopmentComments || "",
    assessmentDecision: initialData?.assessmentDecision || "",
    appraiseeComments: initialData?.appraiseeComments || "",
    appraiseeSignatureUrl: initialData?.appraiseeSignatureUrl || null as string | null,
    appraiseeDate: initialData?.appraiseeDate || "",
    appraiseeAgreementDecision: initialData?.appraiseeAgreementDecision || "",
    hodComments: initialData?.hodComments || "",
    hodName: initialData?.hodName || "",
    hodSignatureUrl: initialData?.hodSignatureUrl || null as string | null,
    hodDate: initialData?.hodDate || ""
  })

  // Check if appraiser has completed sections 6, 7, and 8
  const isAppraiserSectionsComplete = formData.appraiserComments &&
    formData.careerDevelopmentComments &&
    formData.assessmentDecision

  // Load draft and user profile on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load user profile for signature
        const profile = await authApi.getProfile()
        console.log(profile, 'user profile')
        if (profile?.data?.signature_url && !isReviewMode) {
          setAppraiseeSignatureUrl(profile.data.signature_url)
        } else if (profile?.data?.signature_url && isReviewMode) {
          setAppraiserSignatureUrl(profile.data.signature_url)
          setHodSignatureUrl(profile.data.signature_url)
        }

        // Load existing draft
        let finalSections
        if (isReviewMode && reviewUserId) {
          finalSections = await getFinalSectionsByUserId(reviewUserId)
          console.log(finalSections, 'first log')
          if (finalSections && finalSections.length > 0) {
            setAppraiseeSignatureUrl(finalSections[0].appraisee_signature_url || null)
            setUserId(finalSections[0].user_id || null)
          }
        } else {
          finalSections = await getMyFinalSections()
          console.log(finalSections, 'second log')
          if (finalSections && finalSections.length > 0) {
            setAppraiserSignatureUrl(finalSections[0].appraiser_signature_url || null)
            setHodSignatureUrl(finalSections[0].hod_signature_url || null)
          }
        }
        if (finalSections && finalSections.length > 0) {
          const latestSection = finalSections[0]
          setFormData({
            appraisalId: latestSection.appraisal_id || "",
            appraiserComments: latestSection.appraiser_comments || "",
            appraiserSignatureUrl: latestSection.appraiser_signature_url || null,
            appraiserDate: latestSection.appraiser_date ? latestSection.appraiser_date.slice(0, 10) : "",
            careerDevelopmentComments: latestSection.career_development_comments || "",
            assessmentDecision: latestSection.assessment_decision || "",
            appraiseeComments: latestSection.appraisee_comments || "",
            appraiseeSignatureUrl: latestSection.appraisee_signature_url || null,
            appraiseeDate: latestSection.appraisee_date ? latestSection.appraisee_date.slice(0, 10) : "",
            appraiseeAgreementDecision: latestSection.appraisee_agreement_decision || "",
            hodComments: latestSection.hod_comments || "",
            hodName: latestSection.hod_name || "",
            hodSignatureUrl: latestSection.hod_signature_url || null,
            hodDate: latestSection.hod_date ? latestSection.hod_date.slice(0, 10) : ""
          })
          setExistingFinalSectionsId(latestSection.id)
          toast.info("Loaded your draft final sections")
        }
      } catch (error) {
        console.log("Error loading data:", error)
      }
    }
    loadData()
  }, [])

  const handleSignatureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "image/png") {
      setIsUploadingSignature(true)
      try {
        const result = await usersApi.uploadSignature(file)
        setAppraiserSignatureUrl(result.signatureUrl)
        setHodSignatureUrl(result.signatureUrl)
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
    if (appraiseeSignatureUrl && !isReviewMode) {
      setFormData(prev => ({
        ...prev,
        appraiseeSignatureUrl: appraiseeSignatureUrl
      }))
      toast.success("Form signed successfully")
    } else if (appraiserSignatureUrl && isReviewMode) {
      setFormData(prev => ({
        ...prev,
        appraiserSignatureUrl: appraiserSignatureUrl,
        hodSignatureUrl: appraiserSignatureUrl
      }))
      toast.success("Form signed successfully")
    }
  }

  const handleClearSignatures = () => {
    if (appraiseeSignatureUrl && !isReviewMode) {
      setAppraiseeSignatureUrl(null)
      setFormData(prev => ({
        ...prev,
        appraiseeSignatureUrl: null
      }))
    }
    if (appraiserSignatureUrl && isReviewMode) {
      setAppraiserSignatureUrl(null)
      setHodSignatureUrl(null)
      setFormData(prev => ({
        ...prev,
        appraiserSignatureUrl: null
      }))
    }
    toast.success("Signatures cleared successfully")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const payload: FinalSectionsData = {
        userId: isReviewMode && reviewUserId ? reviewUserId : undefined, // Pass appraisee's ID in review mode
        appraiserComments: formData.appraiserComments || undefined,
        appraiserSignatureUrl: formData.appraiserSignatureUrl || undefined,
        appraiserDate: formData.appraiserDate || undefined,
        careerDevelopmentComments: formData.careerDevelopmentComments || undefined,
        assessmentDecision: formData.assessmentDecision || undefined,
        appraiseeComments: formData.appraiseeComments || undefined,
        appraiseeSignatureUrl: formData.appraiseeSignatureUrl || undefined,
        appraiseeDate: formData.appraiseeDate || undefined,
        appraiseeAgreementDecision: formData.appraiseeAgreementDecision || undefined,
        hodComments: formData.hodComments || undefined,
        hodName: formData.hodName || undefined,
        hodSignatureUrl: formData.hodSignatureUrl || undefined,
        hodDate: formData.hodDate || undefined
      }

      let savedSections
      if (existingFinalSectionsId) {
        savedSections = await updateFinalSections(existingFinalSectionsId, payload)
        toast.success("Section updated successfully!")
        if (isReviewMode) {
          appraisalsApi.updateAppraisalStatus(formData.appraisalId, "reviewed")
        } else {
          appraisalsApi.updateAppraisalStatus(formData.appraisalId, "submitted")
        }
      } else {
        savedSections = await createFinalSections(payload)
        setExistingFinalSectionsId(savedSections.id)
        appraisalsApi.updateAppraisalStatus(formData.appraisalId, "submitted")
        toast.success("Final sections saved successfully!")
      }

      // Appraisal is automatically submitted via the service
      toast.success("Appraisal submitted successfully!")

      // Redirect
      if (isReviewMode) {
        router.push("/team-appraisals")
      } else {
        router.push("/appraisals")
      }
    } catch (error) {
      console.error("Error saving final sections:", error)
      toast.error("Failed to save final sections. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const payload: FinalSectionsData = {
        userId: isReviewMode && reviewUserId ? reviewUserId : undefined, // Pass appraisee's ID in review mode
        appraiserComments: formData.appraiserComments || undefined,
        appraiserSignatureUrl: formData.appraiserSignatureUrl || undefined,
        appraiserDate: formData.appraiserDate || undefined,
        careerDevelopmentComments: formData.careerDevelopmentComments || undefined,
        assessmentDecision: formData.assessmentDecision || undefined,
        appraiseeComments: formData.appraiseeComments || undefined,
        appraiseeSignatureUrl: formData.appraiseeSignatureUrl || undefined,
        appraiseeDate: formData.appraiseeDate || undefined,
        appraiseeAgreementDecision: formData.appraiseeAgreementDecision || undefined,
        hodComments: formData.hodComments || undefined,
        hodName: formData.hodName || undefined,
        hodSignatureUrl: formData.hodSignatureUrl || undefined,
        hodDate: formData.hodDate || undefined
      }

      let savedSections
      if (existingFinalSectionsId) {
        savedSections = await updateFinalSections(existingFinalSectionsId, payload)
      } else {
        savedSections = await createFinalSections(payload)
        setExistingFinalSectionsId(savedSections.id)
      }

      console.log(savedSections, 'savedSections')

      // Appraisal is automatically submitted via the service
      // toast.success("Appraisal submitted successfully!")

      // Redirect with return path
      if (isReviewMode) {
        router.push(`/appraisal-print/${savedSections.appraisal_id}?returnTo=team-appraisals/${userId}&step=5`)
      } else {
        router.push(`/appraisal-print/${savedSections.appraisal_id}?returnTo=create-appraisal&step=5`)
      }
    } catch (error) {
      console.error("Error saving final sections:", error)
      toast.error("Failed to save final sections. Please try again.")
    } finally {
      setIsLoading(false)
    }

  }

  const handleClearForm = async () => {
    setIsClearingForm(true)
    try {
      if (existingFinalSectionsId) {
        await deleteFinalSections(existingFinalSectionsId)
        toast.success("Form cleared and draft deleted")
      } else {
        toast.success("Form cleared")
      }
      setFormData({
        appraisalId: "",
        appraiserComments: "",
        appraiserSignatureUrl: null,
        appraiserDate: "",
        careerDevelopmentComments: "",
        assessmentDecision: "",
        appraiseeComments: "",
        appraiseeSignatureUrl: null,
        appraiseeDate: "",
        appraiseeAgreementDecision: "",
        hodComments: "",
        hodName: "",
        hodSignatureUrl: null,
        hodDate: ""
      })
      setExistingFinalSectionsId(null)
    } catch (error) {
      toast.error("Failed to clear form")
    } finally {
      setIsClearingForm(false)
    }
  }

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 6: Appraiser's Comments */}
          <Card className={`p-4 ${!isReviewMode ? 'opacity-70' : ''}`}>
            <div className="space-y-4">
              <div className="bg-amber-800 text-white p-2 rounded">
                <h3 className="font-bold">SECTION 6: Annual Appraisal</h3>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">
                  Appraiser's Comments on Performance Plan Achievements
                </Label>
                <p className="text-sm text-muted-foreground">
                  (Comment on Performance Plan achievements and additional contributions made)
                </p>
                <Textarea
                  value={formData.appraiserComments}
                  onChange={(e) => setFormData(prev => ({ ...prev, appraiserComments: e.target.value }))}
                  placeholder={isReviewMode ? "Enter appraiser's comments..." : "Completed by appraiser during review"}
                  className="min-h-32 resize-none"
                  disabled={!isReviewMode}
                  rows={8}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label className="font-semibold">APPRAISER'S SIGNATURE</Label>
                  {appraiserSignatureUrl ? (
                    <div className="space-y-2">
                      {!formData.appraiserSignatureUrl ? (
                        <>
                          <p className="text-sm text-muted-foreground">You have a signature on file</p>
                          <Button type="button" onClick={handleSign} variant="default" size="sm">
                            Sign
                          </Button>
                        </>
                      ) : (
                        <>
                          {isReviewMode && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-green-600 font-bold">✓ Signed</span>
                              <Button
                                type="button"
                                onClick={handleClearSignatures}
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs text-red-500"
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                          <div className="">
                            <Image
                              src={formData.appraiserSignatureUrl}
                              alt="Appraiser Signature"
                              width={120}
                              height={120}
                              className="max-h-20 max-w-full object-contain"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="appraiser-signature" className="text-sm">
                        Upload Signature
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="appraiser-signature"
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
                <div className="space-y-2">
                  <Label className="font-semibold">DATE (dd/mm/yyyy)</Label>
                  <Input
                    type="date"
                    value={formData.appraiserDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, appraiserDate: e.target.value }))}
                    className="h-12"
                    disabled={!isReviewMode}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Section 7: Career Development */}
          <Card className={`p-4 ${!isReviewMode ? 'opacity-70' : ''}`}>
            <div className="space-y-4">
              <div className="bg-amber-800 text-white p-2 rounded">
                <h3 className="font-bold">SECTION 7: Career Development</h3>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold underline">
                  Training and Development - Comments and Plan
                </Label>
                <p className="text-sm text-muted-foreground">
                  (To be completed by the Appraiser in discussion with the employee)
                </p>
                <Textarea
                  value={formData.careerDevelopmentComments}
                  onChange={(e) => setFormData(prev => ({ ...prev, careerDevelopmentComments: e.target.value }))}
                  placeholder={isReviewMode ? "Enter training and development comments..." : "Completed by appraiser during review"}
                  className="min-h-24 resize-none"
                  disabled={!isReviewMode}
                  rows={6}
                />
              </div>
            </div>
          </Card>

          {/* Section 8: Assessment Decision */}
          <Card className={`p-4 ${!isReviewMode ? 'opacity-70' : ''}`}>
            <div className="space-y-4">
              <div className="bg-amber-800 text-white p-2 rounded">
                <h3 className="font-bold">SECTION 8: ASSESSMENT DECISION</h3>
              </div>

              <div className="space-y-3">
                <p className="text-sm">
                  Assess the Appraisee's potential to perform the duties of the next grade, taking account of the assessment of performance in <strong>Section 5</strong> above.)
                </p>

                <RadioGroup
                  value={formData.assessmentDecision}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, assessmentDecision: value }))}
                  disabled={!isReviewMode}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="outstanding" className="mt-1" />
                    <Label htmlFor="outstanding" className="font-normal cursor-pointer">
                      <span className="font-semibold">Outstanding</span> - should be promoted as soon as possible (promotion out-of-turn, study visits, commendations, salary increments and etc.)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="suitable" className="mt-1" />
                    <Label htmlFor="suitable" className="font-normal cursor-pointer">
                      <span className="font-semibold">Suitable for promotion</span> (encourage through mentoring, coaching, training and etc.)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="likely-ready" className="mt-1" />
                    <Label htmlFor="likely-ready" className="font-normal cursor-pointer">
                      <span className="font-semibold">Likely to be ready for promotion in 2 to 3 years</span> (encourage through mentoring, coaching, training and etc)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="not-ready" className="mt-1" />
                    <Label htmlFor="not-ready" className="font-normal cursor-pointer">
                      <span className="font-semibold">Not ready for promotion for at least 3years</span> (forfeit yearly increment, reassignment and etc.)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="unlikely" className="mt-1" />
                    <Label htmlFor="unlikely" className="font-normal cursor-pointer">
                      <span className="font-semibold">Unlikely to be promoted further:</span> (apply sanctions: demotion, dismissal, removal and etc)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>

          {/* Section 9: Appraisee's Comments */}
          <Card className={`p-4 ${isReviewMode ? 'opacity-50' : ''}`}>
            <div className="space-y-4">
              <div className="bg-amber-800 text-white p-2 rounded">
                <h3 className="font-bold">SECTION 9: Appraisee's Comments</h3>
              </div>

              {/* Show waiting message if appraiser hasn't completed their sections (only for appraisees) */}
              {!isReviewMode && !isAppraiserSectionsComplete ? (
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-md text-center space-y-4">
                  <div className="flex flex-col items-center gap-3">
                    <Info className="h-12 w-12 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-lg">Waiting for Appraiser Review</h4>
                      <p className="text-sm mt-2">
                        Your appraiser needs to complete Sections 6, 7, and 8 before you can provide your comments and agreement decision.
                      </p>
                      <p className="text-sm mt-1">
                        You will be notified once your appraiser has completed their review.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => router.push('/appraisals')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Click here to see your appraisals
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Agreement Question - Only shown when NOT in review mode */}
                  {!isReviewMode && (
                    <div className="space-y-3 pb-4 border-b">
                      <Label className="font-semibold text-base">
                        Do you agree with your appraiser's comments and decisions? <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.appraiseeAgreementDecision}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, appraiseeAgreementDecision: value }))}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="agree-yes" />
                          <Label htmlFor="agree-yes" className="font-normal cursor-pointer">
                            Yes, I agree
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="agree-no" />
                          <Label htmlFor="agree-no" className="font-normal cursor-pointer">
                            No, I disagree
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}


                  {/* Comments and Signature - Only show in review mode OR after agreement decision is made */}
                  {(isReviewMode || formData.appraiseeAgreementDecision) && (
                    <>
                      <div className="space-y-2">
                        <Textarea
                          value={formData.appraiseeComments}
                          onChange={(e) => setFormData(prev => ({ ...prev, appraiseeComments: e.target.value }))}
                          placeholder="Enter your comments..."
                          className="min-h-24 resize-none"
                          rows={6}
                          disabled={isReviewMode}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-2">
                          <Label className="font-semibold">APPRAISEE'S SIGNATURE</Label>
                          {appraiseeSignatureUrl ? (
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
                                  {!isReviewMode && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <span className="text-green-600 font-bold">✓ Signed</span>
                                      <Button
                                        type="button"
                                        onClick={handleClearSignatures}
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 text-xs text-red-500"
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                  )}
                                  <div className="">
                                    <Image
                                      src={formData.appraiseeSignatureUrl}
                                      alt="Appraisee Signature"
                                      width={120}
                                      height={120}
                                      className="max-h-20 max-w-full object-contain"
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Label htmlFor="appraisee-signature" className="text-sm">
                                Upload Signature
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
                        <div className="space-y-2">
                          <Label className="font-semibold">DATE (dd/mm/yyyy)</Label>
                          <Input
                            type="date"
                            value={formData.appraiseeDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, appraiseeDate: e.target.value }))}
                            className="h-12"
                            required
                            disabled={isReviewMode}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </Card>

          {/* Section 10: HOD Comments */}
          {isReviewMode && (
          <Card className={`p-4 ${!isReviewMode ? 'opacity-70' : ''}`}>
            <div className="space-y-4">
              <div className="bg-amber-800 text-white p-2 rounded">
                <h3 className="font-bold">SECTION 10: Head of Department's Comments</h3>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-md text-sm text-blue-800 flex items-start gap-2">
                <Info className="h-5 w-5 shrink-0" />
                <p>This section will be completed by your Head of Department.</p>
              </div>

              <div className="space-y-3 pt-2">
                <Label className="font-semibold">Select your position</Label>
                <RadioGroup
                  defaultValue="hod"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  disabled={!isReviewMode}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dg" id="dg" />
                    <Label htmlFor="dg" className="font-normal cursor-pointer">Director-General (DG)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ddgms" id="ddgms" />
                    <Label htmlFor="ddgms" className="font-normal cursor-pointer">Deputy Director-General, MS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ddgo" id="ddgo" />
                    <Label htmlFor="ddgo" className="font-normal cursor-pointer">Deputy Director-General, Ops</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hod" id="hod" />
                    <Label htmlFor="hod" className="font-normal cursor-pointer">Head of Division</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rd" id="rd" />
                    <Label htmlFor="rd" className="font-normal cursor-pointer">Regional Director</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="principal" id="principal" />
                    <Label htmlFor="principal" className="font-normal cursor-pointer">Principal</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Textarea
                  value={formData.hodComments}
                  onChange={(e) => setFormData(prev => ({ ...prev, hodComments: e.target.value }))}
                  placeholder="Enter HOD comments..."
                  className="min-h-32 resize-none"
                  rows={7}
                  disabled={!isReviewMode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label className="font-semibold">NAME</Label>
                  <Input
                    type="text"
                    value={formData.hodName}
                    onChange={(e) => setFormData(prev => ({ ...prev, hodName: e.target.value }))}
                    placeholder="Enter HOD name"
                    className="h-12"
                    disabled={!isReviewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">SIGNATURE</Label>
                  {hodSignatureUrl ? (
                    <div className="space-y-2">
                      {!formData.hodSignatureUrl ? (
                        <>
                          {/* <p className="text-sm text-muted-foreground">You have a signature on file</p> */}
                          <Button type="button" onClick={handleSign} variant="default" size="sm">
                            Sign
                          </Button>
                        </>
                      ) : (
                        <>
                          {isReviewMode && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-green-600 font-bold">✓ Signed</span>
                              <Button
                                type="button"
                                onClick={handleClearSignatures}
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs text-red-500"
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                          <div className="">
                            <Image
                              src={formData.hodSignatureUrl}
                              alt="HOD Signature"
                              width={120}
                              height={120}
                              className="max-h-20 max-w-full object-contain"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="appraiser-signature" className="text-sm">
                        Upload Signature
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="appraiser-signature"
                          type="file"
                          accept=".png"
                          onChange={handleSignatureUpload}
                          disabled={isUploadingSignature || !isReviewMode}
                          className="h-8 text-xs"
                        />
                        {isUploadingSignature && <Loader2 className="h-4 w-4 animate-spin" />}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">DATE (dd/mm/yyyy)</Label>
                  <Input
                    type="date"
                    value={formData.hodDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hodDate: e.target.value }))}
                    className="h-12"
                    disabled={!isReviewMode}
                  />
                </div>
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label className="font-semibold">NAME AND HOD'S SIGNATURE</Label>
                  <Input
                    type="text"
                    value={formData.hodName}
                    onChange={(e) => setFormData(prev => ({ ...prev, hodName: e.target.value }))}
                    placeholder="Enter HOD name"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">DATE (dd/mm/yyyy)</Label>
                  <Input
                    type="date"
                    value={formData.hodDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hodDate: e.target.value }))}
                    className="h-12"
                  />
                </div>
              </div> */}
            </div>
          </Card>

          )}

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
                      {existingFinalSectionsId
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
                type="button"
                size="lg"
                disabled={isLoading || isClearingForm}
                onClick={handlePreview}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>

              <Button
                type="submit"
                size="lg"
                className="px-8"
                disabled={isLoading || isClearingForm}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {existingFinalSectionsId ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    {isReviewMode ? "Submit Appraisal" : "Done"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

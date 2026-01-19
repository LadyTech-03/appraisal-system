"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Upload, Loader2, PlusCircle } from "lucide-react"
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
  createPerformancePlanning,
  updatePerformancePlanning,
  getMyPerformancePlanning,
  getPerformancePlanningByUserId,
  deletePerformancePlanning,
  PerformancePlanningData
} from "@/lib/api/performancePlanning"
import { usersApi } from "@/lib/api/users"
import { authApi } from "@/lib/api/auth"

import { removeBackground } from "@imgly/background-removal"

interface KeyResultArea {
  id: string
  keyResultArea: string
  targets: string
  resourcesRequired: string
}

interface KeyCompetency {
  id: string
  competency: string
}

export function PerformancePlanningForm({
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
  const [existingPerformancePlanningId, setExistingPerformancePlanningId] = useState<string | null>(null)
  const [appraiseeSignatureUrl, setAppraiseeSignatureUrl] = useState<string | null>(null)
  const [appraiserSignatureUrl, setAppraiserSignatureUrl] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    keyResultAreas: initialData?.keyResultAreas || [
      { id: "1", keyResultArea: "", targets: "", resourcesRequired: "" }
    ] as KeyResultArea[],
    keyCompetencies: initialData?.keyCompetencies || [
      { id: "1", competency: "" }
    ] as KeyCompetency[],
    appraiseeSignatureUrl: initialData?.appraiseeSignatureUrl || null as string | null,
    appraiserSignatureUrl: initialData?.appraiserSignatureUrl || null as string | null
  })

  // Load draft and user profile on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load user profile for signature
        const profile = await authApi.getProfile()
        if (profile?.data?.signature_url && !isReviewMode) {
          setAppraiseeSignatureUrl(profile.data.signature_url)
        } else if (profile?.data?.signature_url && isReviewMode) {
          setAppraiserSignatureUrl(profile.data.signature_url)
        }

        // Load existing draft
        let plans
        if (isReviewMode && reviewUserId) {
          plans = await getPerformancePlanningByUserId(reviewUserId)
          setAppraiseeSignatureUrl(plans[0].appraisee_signature_url || null)
        } else {
          plans = await getMyPerformancePlanning()
          setAppraiserSignatureUrl(plans[0].appraiser_signature_url || null)
        }
        if (plans && plans.length > 0) {
          const latestPlan = plans[0]
          setFormData({
            keyResultAreas: latestPlan.key_result_areas.map((kra: any, index: number) => ({
              ...kra,
              id: kra.id || (index + 1).toString()
            })),
            keyCompetencies: latestPlan.key_competencies?.map((kc: any, index: number) => ({
              ...kc,
              id: kc.id || (index + 1).toString()
            })) || [{ id: "1", competency: "" }],
            appraiseeSignatureUrl: latestPlan.appraisee_signature_url || null,
            appraiserSignatureUrl: latestPlan.appraiser_signature_url || null
          })
          setExistingPerformancePlanningId(latestPlan.id)
          toast.info("Loaded your draft performance planning")
        }
      } catch (error) {
        console.log("Error loading data:", error)
      }
    }
    loadData()
  }, [])

  const addKeyResultArea = () => {
    if (formData.keyResultAreas.length < 5) {
      const newId = (formData.keyResultAreas.length + 1).toString()
      setFormData(prev => ({
        ...prev,
        keyResultAreas: [
          ...prev.keyResultAreas,
          { id: newId, keyResultArea: "", targets: "", resourcesRequired: "" }
        ]
      }))
    } else {
      toast.warning("Cannot add more than 5 targets")
    }
  }

  const removeKeyResultArea = (id: string) => {
    if (formData.keyResultAreas.length > 1) {
      setFormData(prev => ({
        ...prev,
        keyResultAreas: prev.keyResultAreas.filter((area: KeyResultArea) => area.id !== id)
      }))
    }
  }

  const updateKeyResultArea = (id: string, field: keyof KeyResultArea, value: string) => {
    setFormData(prev => ({
      ...prev,
      keyResultAreas: prev.keyResultAreas.map((area: KeyResultArea) =>
        area.id === id ? { ...area, [field]: value } : area
      )
    }))
  }

  const addKeyCompetency = () => {
    if (formData.keyCompetencies.length < 10) {
      const newId = (formData.keyCompetencies.length + 1).toString()
      setFormData(prev => ({
        ...prev,
        keyCompetencies: [
          ...prev.keyCompetencies,
          { id: newId, competency: "" }
        ]
      }))
    } else {
      toast.warning("Cannot add more than 10 competencies")
    }
  }

  const removeKeyCompetency = (id: string) => {
    if (formData.keyCompetencies.length > 1) {
      setFormData(prev => ({
        ...prev,
        keyCompetencies: prev.keyCompetencies.filter((comp: KeyCompetency) => comp.id !== id)
      }))
    }
  }

  const updateKeyCompetency = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      keyCompetencies: prev.keyCompetencies.map((comp: KeyCompetency) =>
        comp.id === id ? { ...comp, competency: value } : comp
      )
    }))
  }

  // const handleSignatureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]
  //   const isAppraisee = !isReviewMode

  //   if (file) {
  //     setIsUploadingSignature(true)
  //     try {
  //       toast.info("Uploading signature")
  //       const blob = await removeBackground(file)
  //       const processedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".png", { type: "image/png" })

  //       const result = await usersApi.uploadSignature(processedFile)
  //       if (isAppraisee) {
  //         setAppraiseeSignatureUrl(result.signatureUrl)
  //       } else {
  //         setAppraiserSignatureUrl(result.signatureUrl)
  //       }
  //       toast.success("Signature uploaded successfully")
  //     } catch (error) {
  //       console.error("Signature processing error:", error)
  //       toast.error("Failed to upload signature")
  //     } finally {
  //       setIsUploadingSignature(false)
  //     }
  //   }
  // }

    const handleSignatureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const isAppraisee = !isReviewMode
    if (file && file.type === "image/png") {
        setIsUploadingSignature(true)
        try {
            const result = await usersApi.uploadSignature(file)
            if (isAppraisee) {
                setAppraiseeSignatureUrl(result.signatureUrl)
            } else {
                setAppraiserSignatureUrl(result.signatureUrl)
            }
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
    }
    if (appraiserSignatureUrl && isReviewMode) {
      setFormData(prev => ({
        ...prev,
        appraiserSignatureUrl: appraiserSignatureUrl
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
      const payload: PerformancePlanningData = {
        keyResultAreas: formData.keyResultAreas,
        keyCompetencies: formData.keyCompetencies,
        appraiseeSignatureUrl: formData.appraiseeSignatureUrl || undefined,
        appraiserSignatureUrl: formData.appraiserSignatureUrl || undefined
      }

      let savedPlan
      if (existingPerformancePlanningId) {
        savedPlan = await updatePerformancePlanning(existingPerformancePlanningId, payload)
        toast.success("Performance planning updated successfully!")
      } else {
        savedPlan = await createPerformancePlanning(payload)
        setExistingPerformancePlanningId(savedPlan.id)
        toast.success("Performance planning saved successfully!")
      }

      onNext({ ...formData, performancePlanningId: savedPlan.id })
    } catch (error) {
      toast.error("Failed to save performance planning")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearForm = async () => {
    setIsClearingForm(true)
    try {
      if (existingPerformancePlanningId) {
        await deletePerformancePlanning(existingPerformancePlanningId)
        toast.success("Form cleared and draft deleted")
      } else {
        toast.success("Form cleared")
      }
      setFormData({
        keyResultAreas: [
          { id: "1", keyResultArea: "", targets: "", resourcesRequired: "" }
        ],
        keyCompetencies: [
          { id: "1", competency: "" }
        ],
        appraiseeSignatureUrl: null,
        appraiserSignatureUrl: null
      })
      setExistingPerformancePlanningId(null)
    } catch (error) {
      toast.error("Failed to clear form")
    } finally {
      setIsClearingForm(false)
    }
  }

  const tableHeader = [
    {
      title: "KEY RESULT AREAS",
      subtitle: "(Not more than 5 - To be drawn from employees Job Description)",
      class: "col-span-4 border rounded-md p-2"
    },
    {
      title: "TARGETS",
      subtitle: "(Results to be achieved, should be specific, measurable, realistic and time-framed)",
      class: "col-span-4 border rounded-md p-2"
    },
    {
      title: "RESOURCES REQUIRED",
      subtitle: "",
      class: "col-span-3 border rounded-md p-2"
    },
    {
      title: "",
      subtitle: "",
      class: "col-span-1"
    },
  ]

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader className="">
        <CardTitle className="text-xl font-bold bg-amber-800 text-white rounded-lg p-2">
          SECTION 2: Performance Planning Form
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          To be agreed between the appraiser and the employee at the start of the annual appraisal cycle or when a new employee is engaged.
        </p>
      </CardHeader>
      <CardContent className="px-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Key Result Areas Table */}
          <div className="">
            {/* Table Header */}
            <Card className="py-2 bg-transparent shadow-none border-none">
              <div className="grid grid-cols-12 gap-2 font-semibold text-sm">
                {tableHeader.map((header, index) => (
                  <div key={index} className={`${header.class} flex flex-col items-center justify-center`}>
                    {/* <Badge variant="secondary" className="mb-2">{header.title}</Badge> */}
                    <h3 className="text-base font-bold">{header.title}</h3>
                    <p className="text-xs text-center font-normal text-muted-foreground">
                      {header.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Table Rows */}
            {formData.keyResultAreas.map((area: KeyResultArea, index: number) => (
              <Card key={area.id} className="py-2 bg-transparent border-none shadow-none">
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4 space-y-2">
                    <Textarea
                      value={area.keyResultArea}
                      onChange={(e) => updateKeyResultArea(area.id, "keyResultArea", e.target.value)}
                      placeholder=""
                      className="min-h-10 resize-none"
                      required
                    />
                  </div>
                  <div className="col-span-4 space-y-2">
                    <Textarea
                      value={area.targets}
                      onChange={(e) => updateKeyResultArea(area.id, "targets", e.target.value)}
                      placeholder=""
                      className="min-h-10 resize-none"
                      required
                    />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Textarea
                      value={area.resourcesRequired}
                      onChange={(e) => updateKeyResultArea(area.id, "resourcesRequired", e.target.value)}
                      placeholder=""
                      className="min-h-10 resize-none"
                    />
                  </div>
                  <div className="col-span-1 flex items-start justify-center">
                    {formData.keyResultAreas.length > 1 && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="">
                            Edit
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Target?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove this target?
                              <br /><br />
                              <strong>Key Result Area:</strong> {area.keyResultArea || "(empty)"}<br />
                              <strong>Target:</strong> {area.targets || "(empty)"}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => removeKeyResultArea(area.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Yes, Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            <Button
              type="button"
              onClick={addKeyResultArea}
              className="col-span-2 flex items-center gap-2 mt-4 w-full"
              disabled={formData.keyResultAreas.length >= 10}
            >
              <Plus className="h-4 w-4" />
              Add Targets
            </Button>
          </div>

          {/* Key Competencies Required */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-semibold">Key Competencies Required</Label>
                <p className="text-xs text-muted-foreground italic">(Refer to Section 5)</p>
              </div>

            </div>
            <div className="grid grid-cols-12 gap-0">
              {formData.keyCompetencies.map((comp: KeyCompetency) => (
                <Card key={comp.id} className="col-span-12 bg-transparent shadow-none border-none py-2">
                  <div className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Textarea
                        value={comp.competency}
                        onChange={(e) => updateKeyCompetency(comp.id, e.target.value)}
                        placeholder="Enter key competency"
                        className="min-h-10 resize-none"
                        required
                      />
                    </div>
                    {formData.keyCompetencies.length > 1 && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="">
                            Edit
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Competency?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove this competency?
                              <br /><br />
                              <strong>Competency:</strong> {comp.competency || "(empty)"}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => removeKeyCompetency(comp.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Yes, Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </Card>
              ))}

              <Button
                type="button"
                onClick={addKeyCompetency}
                className="col-span-12 flex items-center gap-2 mt-4"
              >
                <Plus className="h-4 w-4" />
                Add Competency
              </Button>
            </div>
          </div>

          {/* Signatures Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Signatures</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appraisee Signature */}
              <Card className={`p-4 ${isReviewMode ? 'opacity-50' : ''}`}>
                <CardHeader className="p-0 pb-4">
                  <CardTitle className={`${!isReviewMode ? 'bg-amber-800' : 'bg-gray-600'} text-white p-2 rounded text-sm font-medium text-center`}>
                    APPRAISEE'S SIGNATURE
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <div className="mb-0">
                    {appraiseeSignatureUrl ? (
                      <div className="space-y-2">
                        {!formData.appraiseeSignatureUrl ? (
                          <>
                            {/* <p className="text-sm text-muted-foreground">You have a signature on file</p> */}
                            <Button type="button" onClick={handleSign} variant="default" size="sm">
                              Sign
                            </Button>
                          </>
                        ) : (
                          <>
                            {!isReviewMode && (
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-green-600 font-bold">✓ Signed</span>
                                <Button type="button" onClick={handleClearSignatures} variant="ghost" size="sm" className="h-6 text-xs text-red-500">
                                  Remove
                                </Button>
                              </div>
                            )}
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
                        <Label htmlFor="appraisee-signature" className="text-sm">Upload Signature</Label>
                        <div className="flex gap-2">
                          <Input
                            id="appraisee-signature"
                            type="file"
                            accept="image/*"
                            onChange={handleSignatureUpload}
                            disabled={isUploadingSignature}
                            className="h-8 text-xs"
                          />
                          {isUploadingSignature && <Loader2 className="h-4 w-4 animate-spin" />}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-1">
                    {/* <p className="text-xs text-muted-foreground">Signature line</p> */}
                  </div>
                </CardContent>
              </Card>

              {/* Appraiser Signature */}
              <Card className={`p-4 ${!isReviewMode ? 'opacity-70' : ''}`}>
                <CardHeader className="p-0 pb-4">
                  <CardTitle className={`${isReviewMode ? 'bg-amber-800' : 'bg-gray-600'} text-white p-2 rounded text-sm font-medium text-center`}>
                    APPRAISER'S SIGNATURE
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <div className="mb-0">
                    {appraiserSignatureUrl ? (
                      <div className="space-y-2">
                        {!formData.appraiserSignatureUrl ? (
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
                                <Button type="button" onClick={handleClearSignatures} variant="ghost" size="sm" className="h-6 text-xs text-red-500">
                                  Remove
                                </Button>
                              </div>
                            )}
                            <div className="space-y-1">
                              <Label className="text-sm">Signature:</Label>
                              <Card className="p-2 border-none shadow-none">
                                <Image
                                  src={formData.appraiserSignatureUrl}
                                  alt="Appraiser Signature"
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
                        <Label htmlFor="appraiser-signature" className="text-sm">Upload Signature</Label>
                        <div className="flex gap-2">
                          <Input
                            id="appraiser-signature"
                            type="file"
                            accept="image/*"
                            onChange={handleSignatureUpload}
                            disabled={isUploadingSignature || !isReviewMode}
                            className="h-8 text-xs"
                          />
                          {isUploadingSignature && <Loader2 className="h-4 w-4 animate-spin" />}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-1">
                    {/* <p className="text-xs text-muted-foreground">Signature line</p> */}
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
                      {existingPerformancePlanningId ? "This will delete your saved draft..." : "This will clear all form fields..."}
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
                disabled={isLoading || isClearingForm || !formData.appraiseeSignatureUrl}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {existingPerformancePlanningId ? "Updating..." : "Saving..."}
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

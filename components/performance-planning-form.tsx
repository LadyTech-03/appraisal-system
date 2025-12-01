"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Upload, Loader2 } from "lucide-react"
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
  deletePerformancePlanning,
  PerformancePlanningData
} from "@/lib/api/performancePlanning"
import { usersApi } from "@/lib/api/users"
import { authApi } from "@/lib/api/auth"

interface KeyResultArea {
  id: string
  keyResultArea: string
  targets: string
  resourcesRequired: string
}

export function PerformancePlanningForm({
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
  const [existingPerformancePlanningId, setExistingPerformancePlanningId] = useState<string | null>(null)
  const [userSignatureUrl, setUserSignatureUrl] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    keyResultAreas: initialData?.keyResultAreas || [
      { id: "1", keyResultArea: "", targets: "", resourcesRequired: "" }
    ] as KeyResultArea[],
    appraiseeSignatureUrl: initialData?.appraiseeSignatureUrl || null as string | null
  })

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
        const plans = await getMyPerformancePlanning()
        if (plans && plans.length > 0) {
          const latestPlan = plans[0]
          setFormData({
            keyResultAreas: latestPlan.key_result_areas.map((kra: any, index: number) => ({
                ...kra,
                id: kra.id || (index + 1).toString()
            })),
            appraiseeSignatureUrl: latestPlan.appraisee_signature_url || null
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
    }
  }

  const removeKeyResultArea = (id: string) => {
    if (formData.keyResultAreas.length > 1) {
      setFormData(prev => ({
        ...prev,
        keyResultAreas: prev.keyResultAreas.filter(area => area.id !== id)
      }))
    }
  }

  const updateKeyResultArea = (id: string, field: keyof KeyResultArea, value: string) => {
    setFormData(prev => ({
      ...prev,
      keyResultAreas: prev.keyResultAreas.map(area =>
        area.id === id ? { ...area, [field]: value } : area
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
      const payload: PerformancePlanningData = {
          keyResultAreas: formData.keyResultAreas,
          appraiseeSignatureUrl: formData.appraiseeSignatureUrl || undefined
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
            appraiseeSignatureUrl: null
          })
          setExistingPerformancePlanningId(null)
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
          SECTION 2: Performance Planning Form
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          To be agreed between the appraiser and the employee at the start of the annual appraisal cycle or when a new employee is engaged.
        </p>
      </CardHeader>
      <CardContent className="px-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Key Result Areas Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Performance Planning</h3>
              {formData.keyResultAreas.length < 5 && (
                <Button
                  type="button"
                  onClick={addKeyResultArea}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Key Result Area
                </Button>
              )}
            </div>

            {/* Table Header */}
            <Card className="p-4">
              <div className="grid grid-cols-12 gap-4 font-semibold text-sm">
                <div className="col-span-4">
                  <Badge variant="secondary" className="mb-2">KEY RESULT AREAS</Badge>
                  <p className="text-xs font-normal text-muted-foreground">
                    (Not more than 5 - To be drawn from employees Job Description)
                  </p>
                </div>
                <div className="col-span-4">
                  <Badge variant="secondary" className="mb-2">TARGETS</Badge>
                  <p className="text-xs font-normal text-muted-foreground">
                    (Results to be achieved, should be specific, measurable, realistic and time-framed)
                  </p>
                </div>
                <div className="col-span-3">
                  <Badge variant="secondary" className="mb-2">RESOURCES REQUIRED</Badge>
                </div>
                <div className="col-span-1">
                  <Badge variant="outline" className="mb-2">Actions</Badge>
                </div>
              </div>
            </Card>

            {/* Table Rows */}
            {formData.keyResultAreas.map((area, index) => (
              <Card key={area.id} className="p-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 space-y-2">
                    <Textarea
                      value={area.keyResultArea}
                      onChange={(e) => updateKeyResultArea(area.id, "keyResultArea", e.target.value)}
                      placeholder="Enter key result area"
                      className="min-h-10 resize-none"
                      required
                    />
                  </div>
                  <div className="col-span-4 space-y-2">
                    <Textarea
                      value={area.targets}
                      onChange={(e) => updateKeyResultArea(area.id, "targets", e.target.value)}
                      placeholder="Enter specific, measurable targets"
                      className="min-h-10 resize-none"
                      required
                    />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Textarea
                      value={area.resourcesRequired}
                      onChange={(e) => updateKeyResultArea(area.id, "resourcesRequired", e.target.value)}
                      placeholder="Enter required resources"
                      className="min-h-10 resize-none"
                    />
                  </div>
                  <div className="col-span-1 flex items-start justify-center">
                    {formData.keyResultAreas.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeKeyResultArea(area.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Key Competencies Required */}
          <div className="space-y-1">
            <span className="text-xs font-semibold italic text-muted-foreground">Key Competencies Required: (see Section 5)</span>
          </div>

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
                  
                  <div className="border-t pt-1">
                    {/* <p className="text-xs text-muted-foreground">Signature line</p> */}
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
                           Completed by appraiser
                         </p>
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

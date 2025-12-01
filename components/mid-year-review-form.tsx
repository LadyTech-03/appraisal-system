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
  createMidYearReview, 
  updateMidYearReview, 
  getMyMidYearReview, 
  deleteMidYearReview,
  MidYearReviewData
} from "@/lib/api/midYearReview"
import { usersApi } from "@/lib/api/users"
import { authApi } from "@/lib/api/auth"

interface ReviewItem {
  id: string
  description: string
  progressReview: string
  remarks: string
}

export function MidYearReviewForm({
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
  const [existingMidYearReviewId, setExistingMidYearReviewId] = useState<string | null>(null)
  const [userSignatureUrl, setUserSignatureUrl] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    targets: initialData?.targets || [
      { id: "1", description: "", progressReview: "", remarks: "" }
    ] as ReviewItem[],
    competencies: initialData?.competencies || [
      { id: "1", description: "", progressReview: "", remarks: "" }
    ] as ReviewItem[],
    appraiseeSignatureUrl: initialData?.appraiseeSignatureUrl || null as string | null,
    appraiseeDate: initialData?.appraiseeDate || ""
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
        const reviews = await getMyMidYearReview()
        if (reviews && reviews.length > 0) {
          const latestReview = reviews[0]
          setFormData({
            targets: latestReview.targets.map((item: any, index: number) => ({
                ...item,
                id: item.id || (index + 1).toString()
            })),
            competencies: latestReview.competencies.map((item: any, index: number) => ({
                ...item,
                id: item.id || (index + 1).toString()
            })),
            appraiseeSignatureUrl: latestReview.appraisee_signature_url || null,
            appraiseeDate: latestReview.appraisee_date ? latestReview.appraisee_date.slice(0, 10) : ""
          })
          setExistingMidYearReviewId(latestReview.id)
          toast.info("Loaded your draft mid-year review")
        }
      } catch (error) {
        console.log("Error loading data:", error)
      }
    }
    loadData()
  }, [])

  const addReviewItem = (type: 'targets' | 'competencies') => {
    const currentItems = formData[type]
    if (currentItems.length < 7) {
      const newId = (currentItems.length + 1).toString()
      setFormData(prev => ({
        ...prev,
        [type]: [
          ...currentItems,
          { id: newId, description: "", progressReview: "", remarks: "" }
        ]
      }))
    }
  }

  const removeReviewItem = (type: 'targets' | 'competencies', id: string) => {
    const currentItems = formData[type]
    if (currentItems.length > 1) {
      setFormData(prev => ({
        ...prev,
        [type]: currentItems.filter(item => item.id !== id)
      }))
    }
  }

  const updateReviewItem = (type: 'targets' | 'competencies', id: string, field: keyof ReviewItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map(item =>
        item.id === id ? { ...item, [field]: value } : item
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
      const payload: MidYearReviewData = {
          targets: formData.targets,
          competencies: formData.competencies,
          appraiseeSignatureUrl: formData.appraiseeSignatureUrl || undefined,
          appraiseeDate: formData.appraiseeDate || undefined
      }

      let savedReview
      if (existingMidYearReviewId) {
          savedReview = await updateMidYearReview(existingMidYearReviewId, payload)
          toast.success("Mid-year review updated successfully!")
      } else {
          savedReview = await createMidYearReview(payload)
          setExistingMidYearReviewId(savedReview.id)
          toast.success("Mid-year review saved successfully!")
      }
      
      onNext({ ...formData, midYearReviewId: savedReview.id })
    } catch (error) {
        toast.error("Failed to save mid-year review")
    } finally {
        setIsLoading(false)
    }
  }

  const handleClearForm = async () => {
      setIsClearingForm(true)
      try {
          if (existingMidYearReviewId) {
              await deleteMidYearReview(existingMidYearReviewId)
              toast.success("Form cleared and draft deleted")
          } else {
              toast.success("Form cleared")
          }
          setFormData({
            targets: [
                { id: "1", description: "", progressReview: "", remarks: "" }
            ],
            competencies: [
                { id: "1", description: "", progressReview: "", remarks: "" }
            ],
            appraiseeSignatureUrl: null,
            appraiseeDate: ""
          })
          setExistingMidYearReviewId(null)
      } catch (error) {
          toast.error("Failed to clear form")
      } finally {
          setIsClearingForm(false)
      }
  }

  const renderReviewTable = (
    type: 'targets' | 'competencies',
    title: string,
    description: string
  ) => {
    const items = formData[type]
    const isTargets = type === 'targets'

    return (
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="text-sm font-semibold mb-2">
                {title}
              </Badge>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            {items.length < 7 && (
              <Button
                type="button"
                onClick={() => addReviewItem(type)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add {isTargets ? 'Target' : 'Competency'}
              </Button>
            )}
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-semibold border-b pb-2">
            <div className="col-span-1">NO.</div>
            <div className="col-span-3">{isTargets ? 'TARGET' : 'COMPETENCY'}</div>
            <div className="col-span-4">PROGRESS REVIEW</div>
            <div className="col-span-3">REMARKS</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Table Rows */}
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-start">
              <div className="col-span-1 flex items-center justify-center pt-2">
                <span className="text-sm font-medium">{index + 1}</span>
              </div>
              <div className="col-span-3">
                <Textarea
                  value={item.description}
                  onChange={(e) => updateReviewItem(type, item.id, "description", e.target.value)}
                  placeholder={`Enter ${isTargets ? 'target' : 'competency'}`}
                  className="min-h-10 resize-none text-sm"
                  required
                />
              </div>
              <div className="col-span-4">
                <Textarea
                  value={item.progressReview}
                  onChange={(e) => updateReviewItem(type, item.id, "progressReview", e.target.value)}
                  placeholder="Enter progress review"
                  className="min-h-10 resize-none text-sm"
                  required
                />
              </div>
              <div className={`col-span-3 ${!isReviewMode ? 'opacity-50' : ''}`}>
                <Textarea
                  value={item.remarks}
                  onChange={(e) => updateReviewItem(type, item.id, "remarks", e.target.value)}
                  placeholder={isReviewMode ? "Enter appraiser's remarks" : "Appraiser's remarks (disabled)"}
                  className="min-h-10 resize-none text-sm"
                  disabled={!isReviewMode}
                />
              </div>
              <div className="col-span-1 flex items-center justify-center pt-2">
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeReviewItem(type, item.id)}
                    className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader className="">
        <CardTitle className="text-xl font-bold bg-amber-800 text-white rounded-lg p-2">
          SECTION 3: Mid-Year Review Form
        </CardTitle>
        <div className="space-y-1 mt-2">
          <p className="text-sm text-muted-foreground">
            This is to be completed in July by the Appraiser and Appraisee
          </p>
          <p className="text-sm text-muted-foreground">
            Progress has been discussed and Agreements have been reached as detailed below.
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mid-Year Review Title */}
          <div className="text-center">
            <h2 className="text-lg font-semibold underline">MID-YEAR REVIEW</h2>
          </div>

          {/* Targets Review Table */}
          {renderReviewTable(
            'targets',
            'TARGETS REVIEW',
            'Review progress on established targets and goals'
          )}

          {/* Competencies Review Table */}
          {renderReviewTable(
            'competencies',
            'COMPETENCIES REVIEW',
            'Review progress on key competencies and skills'
          )}

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
                        Completed by appraiser
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
                        Completed by appraiser
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
                        {existingMidYearReviewId ? "This will delete your saved draft..." : "This will clear all form fields..."}
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
                      {existingMidYearReviewId ? "Updating..." : "Saving..."}
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

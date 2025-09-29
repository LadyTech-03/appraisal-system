"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Upload } from "lucide-react"

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
  const [formData, setFormData] = useState({
    targets: initialData?.targets || [
      { id: "1", description: "", progressReview: "", remarks: "" }
    ] as ReviewItem[],
    competencies: initialData?.competencies || [
      { id: "1", description: "", progressReview: "", remarks: "" }
    ] as ReviewItem[],
    appraiseeSignature: initialData?.appraiseeSignature || null as File | null,
    appraiseeSignaturePreview: initialData?.appraiseeSignaturePreview || null as string | null,
    appraiseeDate: initialData?.appraiseeDate || ""
  })

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

  const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "image/png") {
      setFormData(prev => ({
        ...prev,
        appraiseeSignature: file,
        appraiseeSignaturePreview: URL.createObjectURL(file)
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
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
                  <div className="space-y-1">
                    <Label htmlFor="appraisee-signature" className="text-sm">Upload Signature (PNG)</Label>
                    <Input
                      id="appraisee-signature"
                      type="file"
                      accept=".png"
                      onChange={handleSignatureUpload}
                      className="h-8 text-xs"
                    />
                  </div>
                  
                  {formData.appraiseeSignaturePreview && (
                    <div className="space-y-1">
                      <Label className="text-sm">Preview:</Label>
                      <Card className="p-2">
                        <Image
                          src={formData.appraiseeSignaturePreview}
                          alt="Appraisee Signature"
                          width={200}
                          height={48}
                          className="max-h-12 max-w-full object-contain"
                        />
                      </Card>
                    </div>
                  )}
                  
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
            >
              Back to Previous Section
            </Button>
            <Button 
              type="submit" 
              size="lg" 
              className="px-8"
              disabled={!formData.appraiseeSignature || !formData.appraiseeDate}
            >
              Continue to Next Section
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

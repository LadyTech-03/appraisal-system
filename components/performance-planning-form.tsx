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
  const [formData, setFormData] = useState({
    keyResultAreas: initialData?.keyResultAreas || [
      { id: "1", keyResultArea: "", targets: "", resourcesRequired: "" }
    ] as KeyResultArea[],
    appraiseeSignature: initialData?.appraiseeSignature || null as File | null,
    appraiseeSignaturePreview: initialData?.appraiseeSignaturePreview || null as string | null
  })

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
                  
                  <div className="border-t pt-1">
                    <p className="text-xs text-muted-foreground">Signature line</p>
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

                     <div className="border-t pt-1">
                       <p className="text-xs text-muted-foreground">Signature line</p>
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
              disabled={!formData.appraiseeSignature}
            >
              Continue to Next Section
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

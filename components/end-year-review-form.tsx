"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Upload } from "lucide-react"

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
  const [formData, setFormData] = useState({
    targets: initialData?.targets || [
      { id: "1", target: "", performanceAssessment: "", weightOfTarget: 5, score: 0, comments: "" }
    ] as TargetEvaluation[],
    appraiseeSignature: initialData?.appraiseeSignature || null as File | null,
    appraiseeSignaturePreview: initialData?.appraiseeSignaturePreview || null as string | null,
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
    onNext({ ...formData, calculations })
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
              Submit Appraisal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

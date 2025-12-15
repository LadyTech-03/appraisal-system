"use client"

import { useState, useCallback } from "react"
import { useAuthStore, useAppStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Save, Send } from "lucide-react"
import type { Appraisal } from "@/lib/types"

interface ComprehensiveAppraisalFormProps {
  employee_id: string
  onSave: () => void
  onSubmit: () => void
}

export function ComprehensiveAppraisalForm({ employee_id, onSave, onSubmit }: ComprehensiveAppraisalFormProps) {
  const { user } = useAuthStore()
  const { users, addAppraisal, updateAppraisal } = useAppStore()
  const [isDraft, setIsDraft] = useState(true)

  const employee = users.find((u) => u.id === employee_id)
  const appraiser = user

  const [formData, setFormData] = useState<Partial<Appraisal>>(() => ({
    employee_id,
    appraiserId: user?.id || "",
    periodStart: new Date().getFullYear() + "-01-01",
    periodEnd: new Date().getFullYear() + "-12-31",
    status: "draft",
    employeeInfo: {
      title: "Mr.",
      surname: employee?.name.split(" ").pop() || "",
      firstName: employee?.name.split(" ")[0] || "",
      otherNames: employee?.name.split(" ").slice(1, -1).join(" ") || "",
      gender: "Male",
      grade: "Grade 15",
      position: employee?.role || "",
      department: employee?.division || "",
      appointmentDate: "2020-01-01",
    },
    appraiserInfo: {
      title: "Mr.",
      surname: appraiser?.name.split(" ").pop() || "",
      firstName: appraiser?.name.split(" ")[0] || "",
      otherNames: appraiser?.name.split(" ").slice(1, -1).join(" ") || "",
      position: appraiser?.role || "",
    },
    trainingReceived: [],
    keyResultAreas: [
      {
        id: "1",
        area: "",
        targets: "",
        resourcesRequired: "",
      },
    ],
    endOfYearReview: {
      targets: [],
      totalScore: 0,
      averageScore: 0,
      weightedScore: 0,
    },
    coreCompetencies: {
      organizationManagement: {
        planOrganizeWork: { weight: 0.3, score: 3 },
        workSystematically: { weight: 0.3, score: 3 },
        manageOthers: { weight: 0.3, score: 3 },
        total: 0,
        average: 0,
        comments: "",
      },
      innovationStrategicThinking: {
        supportChange: { weight: 0.3, score: 3 },
        thinkBroadly: { weight: 0.3, score: 3 },
        originalityThinking: { weight: 0.3, score: 3 },
        total: 0,
        average: 0,
        comments: "",
      },
      leadershipDecisionMaking: {
        initiateAction: { weight: 0.3, score: 3 },
        acceptResponsibility: { weight: 0.3, score: 3 },
        exerciseJudgment: { weight: 0.3, score: 3 },
        total: 0,
        average: 0,
        comments: "",
      },
      developingImproving: {
        organizationDevelopment: { weight: 0.3, score: 3 },
        customerSatisfaction: { weight: 0.3, score: 3 },
        personnelDevelopment: { weight: 0.3, score: 3 },
        total: 0,
        average: 0,
        comments: "",
      },
      communication: {
        communicateDecisions: { weight: 0.3, score: 3 },
        negotiateManageConflict: { weight: 0.3, score: 3 },
        relateNetwork: { weight: 0.3, score: 3 },
        total: 0,
        average: 0,
        comments: "",
      },
      jobKnowledgeTechnicalSkills: {
        mentalPhysicalSkills: { weight: 0.3, score: 3 },
        crossFunctionalAwareness: { weight: 0.3, score: 3 },
        buildingApplyingExpertise: { weight: 0.3, score: 3 },
        total: 0,
        average: 0,
        comments: "",
      },
      supportingCooperating: {
        workEffectively: { weight: 0.3, score: 3 },
        showSupport: { weight: 0.3, score: 3 },
        adhereEthics: { weight: 0.3, score: 3 },
        total: 0,
        average: 0,
        comments: "",
      },
      maximizingProductivity: {
        motivateInspire: { weight: 0.3, score: 3 },
        acceptChallenges: { weight: 0.3, score: 3 },
        managePressure: { weight: 0.3, score: 3 },
        total: 0,
        average: 0,
        comments: "",
      },
      budgetCostManagement: {
        financialAwareness: { weight: 0.3, score: 3 },
        businessProcesses: { weight: 0.3, score: 3 },
        resultBasedActions: { weight: 0.3, score: 3 },
        total: 0,
        average: 0,
        comments: "",
      },
      coreCompetenciesAverage: 0,
    },
    nonCoreCompetencies: {
      developStaff: {
        developOthers: { weight: 0.1, score: 3 },
        provideGuidance: { weight: 0.1, score: 3 },
        total: 0,
        average: 0,
      },
      personalDevelopment: {
        eagernessForDevelopment: { weight: 0.1, score: 3 },
        innerDrive: { weight: 0.1, score: 3 },
        total: 0,
        average: 0,
      },
      deliveringResults: {
        customerSatisfaction: { weight: 0.1, score: 3 },
        qualityService: { weight: 0.1, score: 3 },
        total: 0,
        average: 0,
      },
      followingInstructions: {
        regulations: { weight: 0.1, score: 3 },
        customerFeedback: { weight: 0.1, score: 3 },
        total: 0,
        average: 0,
      },
      respectCommitment: {
        respectSuperiors: { weight: 0.1, score: 3 },
        commitmentWork: { weight: 0.1, score: 3 },
        total: 0,
        average: 0,
      },
      teamWork: {
        functionInTeam: { weight: 0.1, score: 3 },
        workInTeam: { weight: 0.1, score: 3 },
        total: 0,
        average: 0,
      },
      nonCoreCompetenciesAverage: 0,
    },
    overallAssessment: {
      performanceScore: 0,
      coreCompetenciesScore: 0,
      nonCoreCompetenciesScore: 0,
      overallTotal: 0,
      overallPercentage: 0,
      overallRating: 3,
      ratingDescription: "Met all Expectations",
    },
    appraiserComments: "",
    trainingDevelopmentPlan: "",
    assessmentDecision: "suitable",
    appraiseeComments: "",
    hodComments: "",
    hodName: "",
    hodSignature: "",
    hodDate: "",
    appraiserSignature: "",
    appraiserSignatureDate: "",
    appraiseeSignature: "",
    appraiseeSignatureDate: "",
  }))

  const calculateCompetencyScores = useCallback((competencies: any) => {
    if (!competencies) return competencies

    const updatedCore = { ...competencies }

    // Calculate totals and averages for each competency group
    Object.keys(updatedCore).forEach((key) => {
      if (key !== "coreCompetenciesAverage") {
        const group = updatedCore[key as keyof typeof updatedCore] as any
        if (group && typeof group === "object" && "total" in group) {
          const scores = Object.values(group).filter(
            (item) => typeof item === "object" && item !== null && "score" in item,
          ) as Array<{ score: number; weight: number }>

          const total = scores.reduce((sum, item) => sum + item.score * item.weight, 0)
          const average = scores.length > 0 ? total / scores.reduce((sum, item) => sum + item.weight, 0) : 0

          group.total = total
          group.average = average
        }
      }
    })

    // Calculate overall core competencies average
    const competencyGroups = Object.keys(updatedCore).filter((key) => key !== "coreCompetenciesAverage")
    const overallAverage =
      competencyGroups.reduce((sum, key) => {
        const group = updatedCore[key as keyof typeof updatedCore] as any
        return sum + (group?.average || 0)
      }, 0) / competencyGroups.length

    updatedCore.coreCompetenciesAverage = overallAverage

    return updatedCore
  }, [])

  const addTrainingEntry = () => {
    setFormData((prev) => ({
      ...prev,
      trainingReceived: [...(prev.trainingReceived || []), { institution: "", date: "", programme: "" }],
    }))
  }

  const removeTrainingEntry = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      trainingReceived: prev.trainingReceived?.filter((_, i) => i !== index) || [],
    }))
  }

  const addKeyResultArea = () => {
    setFormData((prev) => ({
      ...prev,
      keyResultAreas: [
        ...(prev.keyResultAreas || []),
        {
          id: Date.now().toString(),
          area: "",
          targets: "",
          resourcesRequired: "",
        },
      ],
    }))
  }

  const removeKeyResultArea = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyResultAreas: prev.keyResultAreas?.filter((_, i) => i !== index) || [],
    }))
  }

  const handleSave = () => {
    if (formData.id) {
      updateAppraisal(formData.id, { ...formData, status: "draft" })
    } else {
      addAppraisal({ ...formData, status: "draft" } as Omit<Appraisal, "id" | "createdAt" | "updatedAt">)
    }
    onSave()
  }

  const handleSubmit = () => {
    const submissionData = {
      ...formData,
      status: "submitted" as const,
      appraiserSignatureDate: new Date().toISOString().split("T")[0],
      appraiserSignature: user?.name || "",
    }

    if (formData.id) {
      updateAppraisal(formData.id, submissionData)
    } else {
      addAppraisal(submissionData as Omit<Appraisal, "id" | "createdAt" | "updatedAt">)
    }
    onSubmit()
  }

  const getRatingDescription = (score: number) => {
    if (score >= 4.5) return "Exceptional, exceeded expectations"
    if (score >= 3.5) return "Exceeded Expectations"
    if (score >= 2.5) return "Met all Expectations"
    if (score >= 1.5) return "Below Expectation"
    return "Unacceptable"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader className="text-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-primary">PUBLIC SERVICES PERFORMANCE MANAGEMENT</h1>
            <h2 className="text-lg font-semibold">(STAFF PERFORMANCE PLANNING, REVIEW AND APPRAISAL FORM)</h2>
            <Badge variant="destructive" className="mx-auto">
              STRICTLY CONFIDENTIAL
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Section 1A: Appraisee Personal Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>SECTION 1-A: Appraisee Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Period of Report From (dd/mm/yyyy)</Label>
              <Input
                type="date"
                value={formData.periodStart}
                onChange={(e) => setFormData((prev) => ({ ...prev, periodStart: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>To (dd/mm/yyyy)</Label>
              <Input
                type="date"
                value={formData.periodEnd}
                onChange={(e) => setFormData((prev) => ({ ...prev, periodEnd: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Select
                value={formData.employeeInfo?.title}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeInfo: { ...prev.employeeInfo!, title: value },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr.">Mr.</SelectItem>
                  <SelectItem value="Mrs.">Mrs.</SelectItem>
                  <SelectItem value="Ms.">Ms.</SelectItem>
                  <SelectItem value="Dr.">Dr.</SelectItem>
                  <SelectItem value="Prof.">Prof.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Surname</Label>
              <Input
                value={formData.employeeInfo?.surname}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeInfo: { ...prev.employeeInfo!, surname: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                value={formData.employeeInfo?.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeInfo: { ...prev.employeeInfo!, firstName: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Other Name(s)</Label>
              <Input
                value={formData.employeeInfo?.otherNames}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeInfo: { ...prev.employeeInfo!, otherNames: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={formData.employeeInfo?.gender}
                onValueChange={(value: "Male" | "Female") =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeInfo: { ...prev.employeeInfo!, gender: value },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Grade/Salary (p.a)</Label>
              <Input
                value={formData.employeeInfo?.grade}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeInfo: { ...prev.employeeInfo!, grade: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Date of Appointment to Present Grade</Label>
              <Input
                type="date"
                value={formData.employeeInfo?.appointmentDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeInfo: { ...prev.employeeInfo!, appointmentDate: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Present Job Title/Position</Label>
              <Input
                value={formData.employeeInfo?.position}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeInfo: { ...prev.employeeInfo!, position: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Department/Division</Label>
              <Input
                value={formData.employeeInfo?.department}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeInfo: { ...prev.employeeInfo!, department: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 1B: Appraiser Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>SECTION 1-B: Appraiser Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Select
                value={formData.appraiserInfo?.title}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    appraiserInfo: { ...prev.appraiserInfo!, title: value },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr.">Mr.</SelectItem>
                  <SelectItem value="Mrs.">Mrs.</SelectItem>
                  <SelectItem value="Ms.">Ms.</SelectItem>
                  <SelectItem value="Dr.">Dr.</SelectItem>
                  <SelectItem value="Prof.">Prof.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Surname</Label>
              <Input
                value={formData.appraiserInfo?.surname}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    appraiserInfo: { ...prev.appraiserInfo!, surname: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                value={formData.appraiserInfo?.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    appraiserInfo: { ...prev.appraiserInfo!, firstName: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Other Name(s)</Label>
              <Input
                value={formData.appraiserInfo?.otherNames}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    appraiserInfo: { ...prev.appraiserInfo!, otherNames: e.target.value },
                  }))
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Position of Appraiser</Label>
            <Input
              value={formData.appraiserInfo?.position}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  appraiserInfo: { ...prev.appraiserInfo!, position: e.target.value },
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Training Received */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>TRAINING RECEIVED DURING THE PREVIOUS YEAR</CardTitle>
            <Button onClick={addTrainingEntry} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Training
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.trainingReceived?.map((training, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={training.institution}
                  onChange={(e) => {
                    const updated = [...(formData.trainingReceived || [])]
                    updated[index] = { ...updated[index], institution: e.target.value }
                    setFormData((prev) => ({ ...prev, trainingReceived: updated }))
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Date (dd-mm-yyyy)</Label>
                <Input
                  type="date"
                  value={training.date}
                  onChange={(e) => {
                    const updated = [...(formData.trainingReceived || [])]
                    updated[index] = { ...updated[index], date: e.target.value }
                    setFormData((prev) => ({ ...prev, trainingReceived: updated }))
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Programme</Label>
                <Input
                  value={training.programme}
                  onChange={(e) => {
                    const updated = [...(formData.trainingReceived || [])]
                    updated[index] = { ...updated[index], programme: e.target.value }
                    setFormData((prev) => ({ ...prev, trainingReceived: updated }))
                  }}
                />
              </div>
              <div className="flex items-end">
                <Button variant="outline" size="sm" onClick={() => removeTrainingEntry(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {(!formData.trainingReceived || formData.trainingReceived.length === 0) && (
            <p className="text-muted-foreground text-center py-4">No training entries added yet</p>
          )}
        </CardContent>
      </Card>

      {/* Section 2: Performance Planning Form */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>SECTION 2: Performance Planning Form</CardTitle>
            <Button onClick={addKeyResultArea} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Key Result Area
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To be agreed between the appraiser and the employee at the start of the annual appraisal cycle or when a new
            employee is engaged.
          </p>

          {formData.keyResultAreas?.map((kra, index) => (
            <div key={kra.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Key Result Areas (Not more than 5)</Label>
                <Textarea
                  value={kra.area}
                  onChange={(e) => {
                    const updated = [...(formData.keyResultAreas || [])]
                    updated[index] = { ...updated[index], area: e.target.value }
                    setFormData((prev) => ({ ...prev, keyResultAreas: updated }))
                  }}
                  placeholder="To be drawn from employee's Job Description"
                />
              </div>
              <div className="space-y-2">
                <Label>Targets</Label>
                <Textarea
                  value={kra.targets}
                  onChange={(e) => {
                    const updated = [...(formData.keyResultAreas || [])]
                    updated[index] = { ...updated[index], targets: e.target.value }
                    setFormData((prev) => ({ ...prev, keyResultAreas: updated }))
                  }}
                  placeholder="Results to be achieved, should be specific, measurable, realistic and time-framed"
                />
              </div>
              <div className="space-y-2">
                <Label>Resources Required</Label>
                <Textarea
                  value={kra.resourcesRequired}
                  onChange={(e) => {
                    const updated = [...(formData.keyResultAreas || [])]
                    updated[index] = { ...updated[index], resourcesRequired: e.target.value }
                    setFormData((prev) => ({ ...prev, keyResultAreas: updated }))
                  }}
                />
              </div>
              <div className="flex items-end">
                <Button variant="outline" size="sm" onClick={() => removeKeyResultArea(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button onClick={handleSubmit}>
          <Send className="h-4 w-4 mr-2" />
          Submit Appraisal
        </Button>
      </div>
    </div>
  )
}

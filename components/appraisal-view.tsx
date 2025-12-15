"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Appraisal, User } from "@/lib/types"
import { FileText, Target, Star, BookOpen, MessageSquare, Award, Calendar, UserIcon } from "lucide-react"

interface AppraisalViewProps {
  appraisal: Appraisal
  employee: User
  appraiser: User
}

export function AppraisalView({ appraisal, employee, appraiser }: AppraisalViewProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600 bg-green-50"
    if (rating >= 3) return "text-blue-600 bg-blue-50"
    if (rating >= 2) return "text-orange-600 bg-orange-50"
    return "text-red-600 bg-red-50"
  }

  const getRatingText = (rating: number) => {
    if (rating >= 4) return "Excellent"
    if (rating >= 3) return "Good"
    if (rating >= 2) return "Satisfactory"
    if (rating >= 1) return "Needs Improvement"
    return "Not Rated"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Official Header */}
      <Card className="glass-card border-2 border-primary/20">
        <CardHeader className="text-center bg-primary/5">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-primary">PERFORMANCE APPRAISAL FORM</h1>
            <p className="text-sm text-muted-foreground">Annual Performance Review Document</p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <UserIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Employee Name</p>
                  <p className="font-semibold">{employee.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Position/Role</p>
                  <p className="font-semibold">{employee.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="px-3 py-1">
                  Employee ID: {employee.employee_id}
                </Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <UserIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Appraiser</p>
                  <p className="font-semibold">{appraiser.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Review Period</p>
                  <p className="font-semibold">
                    {formatDate(appraisal.periodStart)} - {formatDate(appraisal.periodEnd)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  className={`px-3 py-1 ${
                    appraisal.status === "closed"
                      ? "bg-green-100 text-green-800"
                      : appraisal.status === "reviewed"
                        ? "bg-purple-100 text-purple-800"
                        : appraisal.status === "submitted"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                  }`}
                >
                  Status: {appraisal.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 1: Objectives & KPIs */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>SECTION 1: OBJECTIVES & KEY PERFORMANCE INDICATORS</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {appraisal.objectives?.map((objective, index) => (
              <div key={objective.id} className="border rounded-lg p-4 bg-gray-50/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-primary">Objective {index + 1}</h4>
                  <Badge
                    className={`px-3 py-1 ${
                      objective.achievement >= 90
                        ? "bg-green-100 text-green-800"
                        : objective.achievement >= 70
                          ? "bg-blue-100 text-blue-800"
                          : objective.achievement >= 50
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {objective.achievement}% Achievement
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Description:</p>
                    <p className="text-sm">{objective.desc || "No description provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Target:</p>
                    <p className="text-sm">{objective.target || "No target specified"}</p>
                  </div>
                </div>
              </div>
            )) || <p className="text-muted-foreground text-center py-4">No objectives recorded</p>}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Core Competencies */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-primary" />
            <span>SECTION 2: CORE COMPETENCIES ASSESSMENT</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appraisal.competencies?.map((competency, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{competency.name}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className={`px-3 py-1 ${getRatingColor(competency.rating)}`}>{competency.rating}/5</Badge>
                    <Badge variant="outline" className={getRatingColor(competency.rating)}>
                      {getRatingText(competency.rating)}
                    </Badge>
                  </div>
                </div>
                {competency.comment && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Comments:</p>
                    <p className="text-sm">{competency.comment}</p>
                  </div>
                )}
              </div>
            )) || <p className="text-muted-foreground text-center py-4">No competencies assessed</p>}
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Role-Specific Skills */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>SECTION 3: ROLE-SPECIFIC SKILLS</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appraisal.roleSkills?.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50/50">
                <span className="font-medium">{skill.name}</span>
                <div className="flex items-center space-x-2">
                  <Badge className={`px-3 py-1 ${getRatingColor(skill.rating)}`}>{skill.rating}/5</Badge>
                  <Badge variant="outline" className={getRatingColor(skill.rating)}>
                    {getRatingText(skill.rating)}
                  </Badge>
                </div>
              </div>
            )) || <p className="text-muted-foreground text-center py-4">No role-specific skills assessed</p>}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Training & Development Needs */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>SECTION 4: TRAINING & DEVELOPMENT NEEDS</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appraisal.trainingNeeds && appraisal.trainingNeeds.length > 0 ? (
            <div className="space-y-2">
              {appraisal.trainingNeeds.map((need, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 border rounded bg-gray-50/50">
                  <Badge variant="outline" className="text-xs">
                    {index + 1}
                  </Badge>
                  <span className="text-sm">{need.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No training needs identified</p>
          )}
        </CardContent>
      </Card>

      {/* Section 5: Overall Assessment */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>SECTION 5: OVERALL ASSESSMENT</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Rating</p>
                <div className="flex items-center space-x-2">
                  <Badge className={`px-4 py-2 text-lg ${getRatingColor(appraisal.overallRating || 0)}`}>
                    {appraisal.overallRating || 0}/5
                  </Badge>
                  <Badge variant="outline" className={`px-3 py-1 ${getRatingColor(appraisal.overallRating || 0)}`}>
                    {getRatingText(appraisal.overallRating || 0)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span>Appraiser Comments</span>
              </h4>
              <div className="p-4 border rounded-lg bg-gray-50/50 min-h-[100px]">
                <p className="text-sm whitespace-pre-wrap">
                  {appraisal.appraiserComments || "No comments provided by appraiser"}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span>Employee Comments</span>
              </h4>
              <div className="p-4 border rounded-lg bg-gray-50/50 min-h-[100px]">
                <p className="text-sm whitespace-pre-wrap">
                  {appraisal.employeeComments || "No comments provided by employee"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 6: Signatures */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>SECTION 6: SIGNATURES & ACKNOWLEDGMENT</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="font-semibold">Employee Acknowledgment</h4>
              <div className="border-b-2 border-gray-300 pb-2 mb-2">
                <p className="text-sm font-medium">{employee.name}</p>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Employee Name & Signature</p>
                <p>Date: {formatDate(appraisal.updatedAt || appraisal.createdAt)}</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Appraiser Certification</h4>
              <div className="border-b-2 border-gray-300 pb-2 mb-2">
                <p className="text-sm font-medium">{appraiser.name}</p>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Appraiser Name & Signature</p>
                <p>Date: {formatDate(appraisal.updatedAt || appraisal.createdAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

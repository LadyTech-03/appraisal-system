"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { AppraisalExport } from "@/components/appraisal-export"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Users, Eye, Edit, Plus, Clock, CheckCircle, AlertCircle, Send, Download, Bell, UserCheck, UserX } from "lucide-react"

export default function TeamAppraisalsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const { appraisals, users, orgHierarchy } = useAppStore()
  const [selectedAppraisals, setSelectedAppraisals] = useState<string[]>([])
  const [showBulkExport, setShowBulkExport] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const canManageTeam = user?.role.includes("Director") || user?.role.includes("Head")
    if (!canManageTeam) {
      router.push("/dashboard")
      return
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
      </div>
    )
  }

  // Get direct reports (subordinates)
  const subordinateIds = orgHierarchy[user.id] || []
  const subordinates = subordinateIds.map((id) => users.find((u) => u.id === id)).filter(Boolean)
  
  // Get appraisals submitted by direct reports
  const teamAppraisals = appraisals.filter((a) => subordinateIds.includes(a.employeeId))
  
  // Get appraisals created by this manager for their team
  const managerCreatedAppraisals = appraisals.filter((a) => a.appraiserId === user.id)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "submitted":
        return <Bell className="h-4 w-4 text-blue-500" />
      case "reviewed":
        return <AlertCircle className="h-4 w-4 text-purple-500" />
      case "closed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-orange-100 text-orange-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "reviewed":
        return "bg-purple-100 text-purple-800"
      case "closed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Check if a team member has submitted an appraisal
  const hasSubmittedAppraisal = (employeeId: string) => {
    return teamAppraisals.some(a => a.employeeId === employeeId && a.status === "submitted")
  }

  // Get pending appraisals (submitted by team members waiting for review)
  const pendingAppraisals = teamAppraisals.filter(a => a.status === "submitted")

  const handleBulkExport = () => {
    if (selectedAppraisals.length === 0) {
      alert("Please select at least one appraisal to export.")
      return
    }
    setShowBulkExport(true)
  }

  const toggleAppraisalSelection = (appraisalId: string) => {
    setSelectedAppraisals((prev) =>
      prev.includes(appraisalId) ? prev.filter((id) => id !== appraisalId) : [...prev, appraisalId],
    )
  }

  const selectAllAppraisals = () => {
    if (selectedAppraisals.length === teamAppraisals.length) {
      setSelectedAppraisals([])
    } else {
      setSelectedAppraisals(teamAppraisals.map((a) => a.id))
    }
  }

  if (showBulkExport) {
    const selectedAppraisalData = teamAppraisals.filter((a) => selectedAppraisals.includes(a.id))

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 p-6">
            <div className="mb-4 flex items-center justify-between">
              <Button variant="outline" onClick={() => setShowBulkExport(false)}>
                Back to Team Appraisals
              </Button>
              <Badge variant="secondary">{selectedAppraisalData.length} Selected for Export</Badge>
            </div>

            <div className="space-y-8">
              {selectedAppraisalData.map((appraisal, index) => {
                const employee = users.find((u) => u.id === appraisal.employeeId)
                const appraiser = users.find((u) => u.id === appraisal.appraiserId)

                if (!employee || !appraiser) return null

                return (
                  <div key={appraisal.id}>
                    {index > 0 && <div className="page-break" />}
                    <AppraisalExport appraisal={appraisal} employee={employee} appraiser={appraiser} />
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Team Appraisals</h1>
              <p className="text-muted-foreground">Review appraisals submitted by your team members</p>
            </div>
            <div className="flex items-center space-x-3">
              {pendingAppraisals.length > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Bell className="h-3 w-3" />
                  {pendingAppraisals.length} Pending Review
                </Badge>
              )}
              <Badge variant="secondary">{subordinates.length} Team Members</Badge>
            </div>
          </div>

          {/* Team Overview */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Team Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{subordinates.length}</p>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {pendingAppraisals.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {teamAppraisals.filter((a) => a.status === "closed").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {subordinates.length - teamAppraisals.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Not Started</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members List */}
          <div className="grid gap-4">
            {subordinates.map((subordinate) => {
              const subordinateAppraisal = teamAppraisals.find(a => a.employeeId === subordinate.id)
              const hasSubmitted = hasSubmittedAppraisal(subordinate.id)
              
              return (
                <Card key={subordinate.id} className="glass-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg">
                          {subordinate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{subordinate.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {subordinate.role} • {subordinate.staffId}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {subordinate.division} • {subordinate.unit}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          {subordinateAppraisal ? (
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(subordinateAppraisal.status)}
                              <Badge className={`${getStatusColor(subordinateAppraisal.status)}`}>
                                {subordinateAppraisal.status.toUpperCase()}
                              </Badge>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <UserX className="h-4 w-4 text-gray-500" />
                              <Badge variant="outline">NOT STARTED</Badge>
                            </div>
                          )}
                          
                          {subordinateAppraisal && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {subordinateAppraisal.status === "submitted" 
                                ? `Submitted ${formatDistanceToNow(new Date(subordinateAppraisal.updatedAt), { addSuffix: true })}`
                                : `Last updated ${formatDistanceToNow(new Date(subordinateAppraisal.updatedAt), { addSuffix: true })}`
                              }
                            </p>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          {subordinateAppraisal ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/appraisals/${subordinateAppraisal.id}`)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                              {subordinateAppraisal.status === "submitted" && (
                                <Button 
                                  size="sm" 
                                  onClick={() => router.push(`/appraisals/${subordinateAppraisal.id}/review`)}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <Bell className="h-4 w-4 mr-2" />
                                  Review
                                </Button>
                              )}
                            </>
                          ) : (
                            <Button variant="outline" size="sm" disabled>
                              <Clock className="h-4 w-4 mr-2" />
                              No Appraisal
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}

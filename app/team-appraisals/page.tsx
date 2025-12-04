"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Users, Eye, Clock, UserCheck, UserX, Loader2 } from "lucide-react"
import { getTeamAppraisals, PersonalInfo } from "@/lib/api/personalInfo"

export default function TeamAppraisalsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [teamAppraisals, setTeamAppraisals] = useState<PersonalInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
  }, [isAuthenticated, user, router])

  // Fetch team appraisals
  useEffect(() => {
    const fetchTeamAppraisals = async () => {
      try {
        setIsLoading(true)
        const data = await getTeamAppraisals()
        setTeamAppraisals(data)
      } catch (error) {
        console.error("Error fetching team appraisals:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchTeamAppraisals()
    }
  }, [user])


  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
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
              <Badge variant="secondary">{teamAppraisals.length} Team Members with Appraisals</Badge>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{teamAppraisals.length}</p>
                  <p className="text-sm text-muted-foreground">Team Members with Appraisals</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {teamAppraisals.filter((a) => new Date(a.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Started This Week</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {teamAppraisals.filter((a) => new Date(a.created_at).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Started This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading team appraisals...</span>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && teamAppraisals.length === 0 && (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <UserX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Team Appraisals Yet</h3>
                <p className="text-muted-foreground">
                  None of your team members have started their appraisals yet.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Team Members List */}
          {!isLoading && teamAppraisals.length > 0 && (
            <div className="grid gap-4">
              {teamAppraisals.map((appraisal) => {
                return (
                  <Card key={appraisal.id} className="glass-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg">
                            {appraisal.user_name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "?"}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{appraisal.user_name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {appraisal.present_job_title} • {appraisal.employee_id}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {appraisal.division}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <UserCheck className="h-4 w-4 text-green-500" />
                              <Badge className="bg-green-100 text-green-800">
                                IN PROGRESS
                              </Badge>
                            </div>
                            
                            <p className="text-xs text-muted-foreground mt-1">
                              Started {formatDistanceToNow(new Date(appraisal.created_at), { addSuffix: true })}
                            </p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/team-appraisals/${appraisal.user_id}`)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

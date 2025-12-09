"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppStore, useAuthStore } from "@/lib/store"
import { formatDistanceToNow } from "date-fns"
import { FileText, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react"
import { parseApiError } from "@/lib/api/api"
import { toast } from "sonner"

export function RecentActivity() {
  const { user } = useAuthStore()
  const { users, fetchDashboardOverview, dashboardOverview } = useAppStore()

  useEffect(() => {
    const fetchRecentActivity = async () => {
      if (!user) return

      try {
        await fetchDashboardOverview()
      } catch (error) {
        const apiError = parseApiError(error)
        toast.error(apiError.message)
      }
    }

    fetchRecentActivity()
  }, [user, fetchDashboardOverview])

  // Get recent appraisals related to the user
  const recentAppraisals = dashboardOverview?.recentAppraisals || []

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "submitted":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "reviewed":
        return <AlertCircle className="h-4 w-4 text-purple-500" />
      case "closed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
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

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Activities</span>
          {/* <Button variant="outline" size="sm">
            View All
          </Button> */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentAppraisals.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground">Your appraisal activities will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentAppraisals.map((appraisal) => {
              console.log(appraisal)
              console.log(user, 'this is the user')
              const employee = appraisal.employeeInfo
              const appraiser = users.find((u) => u.id === appraisal.appraiserId)
              const isMyAppraisal = appraisal.employeeId === user?.id

              return (
                <div
                  key={appraisal.id}
                  className="flex items-center space-x-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0">{getStatusIcon(appraisal.status)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {isMyAppraisal ? "My Appraisal" : `${employee?.first_name} ${employee?.surname}'s Appraisal`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Updated {formatDistanceToNow(new Date(appraisal.updatedAt), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getStatusColor(appraisal.status)}`}>{appraisal.status}</Badge>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

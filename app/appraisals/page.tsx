"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDistanceToNow } from "date-fns"
import { FileText, Eye, Loader2 } from "lucide-react"
import { appraisalsApi } from "@/lib/api/appraisals"
import { toast } from "sonner"

interface Appraisal {
  id: string
  periodStart: string
  periodEnd: string
  status: string
  manager_status: string
  overall_assessment?: {
    overall_score_percentage: number
  }
  overallAssessment?: {
    overall_score_percentage: number
    overall_score: number
    overall_comment: string
  }
  created_at: string
  updated_at: string
  updatedAt: string
  employee_name?: string
  appraiser_name?: string
}

export default function AppraisalsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [appraisals, setAppraisals] = useState<Appraisal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const fetchAppraisals = async () => {
      try {
        const data = await appraisalsApi.getSubmittedAppraisals()
        setAppraisals(data?.appraisals || [])
      } catch (error) {
        console.error("Error fetching appraisals:", error)
        toast.error("Failed to load appraisals")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppraisals()
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      "in-progress": { label: "In Progress", className: "bg-orange-100 text-orange-800" },
      submitted: { label: "Submitted", className: "bg-blue-100 text-blue-800" },
      reviewed: { label: "Reviewed", className: "bg-purple-100 text-purple-800" },
      completed: { label: "Completed", className: "bg-green-100 text-green-800" },
    }
    const config = statusConfig[status] || statusConfig["in-progress"]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getManagerStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      pending: { label: "Pending Review", className: "bg-yellow-100 text-yellow-800" },
      approved: { label: "Approved", className: "bg-green-100 text-green-800" },
      rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const handleViewAppraisal = (appraisal: Appraisal) => {
    if(appraisal.status === "reviewed") {
      // We'll populate the appraisal-view with the data so we can print it. 
      router.push(`/appraisal-print/${appraisal.id}`)
    } else {
      // router.push(`/appraisals/${appraisal.id}`)
      router.push(`/appraisal-print/${appraisal.id}`)
    }
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
              <h1 className="text-3xl font-bold text-primary">My Appraisals</h1>
              <p className="text-muted-foreground">View and track your submitted performance appraisals</p>
            </div>
          </div>

          {/* Appraisals Table */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Submitted Appraisals</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : appraisals.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Submitted Appraisals</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't submitted any appraisals yet. Complete your appraisal forms to see them here.
                  </p>
                  <Button onClick={() => router.push("/create-appraisal")}>
                    Create New Appraisal
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Period</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Overall Score</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appraisals.map((appraisal) => (
                        <TableRow key={appraisal.id}>
                          <TableCell className="font-medium">
                            {appraisal.periodStart && appraisal.periodEnd
                              ? `${new Date(appraisal.periodStart).toLocaleDateString("en-GB")} - ${new Date(appraisal.periodEnd).toLocaleDateString("en-GB")}`
                              : "N/A"}
                          </TableCell>
                          <TableCell>{getStatusBadge(appraisal.status)}</TableCell>
                          {/* <TableCell>{getManagerStatusBadge(appraisal.manager_status)}</TableCell> */}
                          <TableCell>
                            {appraisal.overallAssessment?.overall_score_percentage && appraisal.status === "completed"
                              ? `${appraisal.overallAssessment.overall_score_percentage}%`
                              : "N/A"}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {appraisal.updatedAt 
                              ? formatDistanceToNow(new Date(appraisal.updatedAt), { addSuffix: true })
                              : "N/A"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() => handleViewAppraisal(appraisal)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

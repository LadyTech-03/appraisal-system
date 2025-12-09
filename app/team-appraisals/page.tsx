"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Eye, CheckCircle, AlertCircle } from "lucide-react"
import { getTeamAppraisals, PersonalInfo } from "@/lib/api/personalInfo"
import { appraisalsApi } from "@/lib/api/appraisals"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"

export default function TeamAppraisalsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [teamAppraisals, setTeamAppraisals] = useState<PersonalInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [completingId, setCompletingId] = useState<string | null>(null)
  const [showCompleteDialog, setShowCompleteDialog] = useState(false)
  const [selectedAppraisal, setSelectedAppraisal] = useState<PersonalInfo | null>(null)

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
        console.log(data, 'appraisal data')
        setTeamAppraisals(data)
      } catch (error) {
        console.error("Error fetching team appraisals:", error)
        toast.error("Failed to load team appraisals")
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchTeamAppraisals()
    }
  }, [user])

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      "in-progress": { label: "In Progress", className: "bg-green-100 text-green-800 font-bold" },
      submitted: { label: "Submitted", className: "bg-blue-100 text-blue-800 font-bold" },
      reviewed: { label: "Reviewed", className: "bg-purple-100 text-purple-800 font-bold" },
      closed: { label: "Closed", className: "bg-green-100 text-green-800 font-bold" },
    }
    const config = statusConfig[status] || statusConfig["in-progress"]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const handleReview = (appraisal: PersonalInfo) => {
    router.push(`/team-appraisals/${appraisal.user_id}`)
  }

  const handleCompleteClick = (appraisal: PersonalInfo) => {
    setSelectedAppraisal(appraisal)
    setShowCompleteDialog(true)
  }

  const handleCompleteConfirm = async () => {
    if (!selectedAppraisal?.appraisal_id) {
      toast.error("Appraisal ID not found")
      return
    }

    try {
      setCompletingId(selectedAppraisal.appraisal_id)
      await appraisalsApi.completeAppraisal(selectedAppraisal.appraisal_id)
      
      toast.success("Appraisal completed and sealed successfully!")
      
      // Remove from list
      setTeamAppraisals(prev => prev.filter(a => a.appraisal_id !== selectedAppraisal.appraisal_id))
      
      setShowCompleteDialog(false)
      setSelectedAppraisal(null)
    } catch (error) {
      console.error("Error completing appraisal:", error)
      toast.error("Failed to complete appraisal")
    } finally {
      setCompletingId(null)
    }
  }

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
              <h1 className="text-3xl font-bold text-primary">Team Appraisals</h1>
              <p className="text-muted-foreground">Review and complete appraisals for your team members</p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {teamAppraisals.length} Total
            </Badge>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading team appraisals...</span>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && teamAppraisals.length === 0 && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Pending Appraisals</h3>
              <p className="text-muted-foreground">
                All team appraisals have been reviewed or no submissions yet.
              </p>
            </div>
          )}

          {/* Team Appraisals Table */}
          {!isLoading && teamAppraisals.length > 0 && (
            <div className="bg-white rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Appraisee Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamAppraisals.map((appraisal) => (
                    <TableRow key={appraisal.id}>
                      <TableCell>
                        <div>
                          <p className="text-sm font-bold text-muted-foreground">{appraisal.employee_id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-bold">{appraisal.first_name} {appraisal.surname}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-bold">{appraisal.present_job_title}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-bold">
                          {new Date(appraisal.period_from).toLocaleDateString()} - {new Date(appraisal.period_to).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(appraisal.status || "in-progress")}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm font-bold">
                        {appraisal.created_at 
                          ? formatDistanceToNow(new Date(appraisal.created_at), { addSuffix: true })
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReview(appraisal)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleCompleteClick(appraisal)}
                          disabled={!appraisal.appraisal_id}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </main>
      </div>

      {/* Complete Confirmation Dialog */}
      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Appraisal</DialogTitle>
            <DialogDescription>
              You're about to mark this appraisal as complete for <strong>{selectedAppraisal?.user_name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-blue-800">ℹ️ What happens next:</p>
              <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                <li>The appraisal status will be set to "Reviewed"</li>
                <li>Individual form records will be archived</li>
                <li>The consolidated record will be preserved</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCompleteDialog(false)}
              disabled={!!completingId}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleCompleteConfirm}
              disabled={!!completingId}
            >
              {completingId ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Completing...
                </>
              ) : (
                "Complete Appraisal"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

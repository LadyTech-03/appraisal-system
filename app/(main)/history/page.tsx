"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDistanceToNow } from "date-fns"
import { Search, Eye, Download, Loader2, FileText, Printer } from "lucide-react"
import { appraisalsApi } from "@/lib/api/appraisals"
import { toast } from "sonner"

interface Appraisal {
  id: string
  period_start: string
  period_end: string
  status: string

  periodStart: string
  periodEnd: string
  overallAssessment?: {
    overall_score_percentage?: number
  }
  employeeInfo?:{
    first_name: string
    surname: string
  }
  employee_id: string
  employee_info?: {
    first_name: string
    surname: string
    employee_id: string
  }
  overall_assessment?: {
    overall_score_percentage?: number
  }
  updated_at: string

  updatedAt: string
}

export default function HistoryPage() {
  const router = useRouter()
  const { user} = useAuthStore()
  const [appraisals, setAppraisals] = useState<Appraisal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRangeFilter, setDateRangeFilter] = useState("all")

  useEffect(() => {
    const fetchAppraisals = async () => {
      try {
        setIsLoading(true)
        // Fetch appraisals where current user is the appraiser
        const data = await appraisalsApi.getMyAppraisalHistory()
        console.log(data, 'appraisal history data')
        setAppraisals(data?.appraisals?.appraisals || [])
      } catch (error) {
        console.error("Error fetching appraisal history:", error)
        toast.error("Failed to load appraisal history")
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchAppraisals()
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
      </div>
    )
  }

  // Apply filters
  const filteredAppraisals = (Array.isArray(appraisals) ? appraisals : []).filter((appraisal) => {
    const employeeName = `${appraisal.employee_info?.first_name} ${appraisal.employee_info?.surname}`.toLowerCase()
    const matchesSearch = searchTerm === "" || employeeName.includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || appraisal.status === statusFilter
    
    // Date range filtering
    let matchesDateRange = true
    const now = new Date()
    const appraisalDate = new Date(appraisal.updated_at)
    
    switch (dateRangeFilter) {
      case "last-30-days":
        matchesDateRange = (now.getTime() - appraisalDate.getTime()) <= (30 * 24 * 60 * 60 * 1000)
        break
      case "last-3-months":
        matchesDateRange = (now.getTime() - appraisalDate.getTime()) <= (90 * 24 * 60 * 60 * 1000)
        break
      case "last-6-months":
        matchesDateRange = (now.getTime() - appraisalDate.getTime()) <= (180 * 24 * 60 * 60 * 1000)
        break
      case "last-year":
        matchesDateRange = (now.getTime() - appraisalDate.getTime()) <= (365 * 24 * 60 * 60 * 1000)
        break
      case "all":
      default:
        matchesDateRange = true
    }

    return matchesSearch && matchesStatus && matchesDateRange
  })

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      "in-progress": { label: "In Progress", className: "bg-orange-100 text-orange-800 font-bold" },
      submitted: { label: "Submitted", className: "bg-blue-100 text-blue-800 font-bold" },
      reviewed: { label: "Reviewed", className: "bg-purple-100 text-purple-800 font-bold" },
      completed: { label: "Completed", className: "bg-green-100 text-green-800 font-bold" },
    }
    const config = statusConfig[status] || statusConfig["in-progress"]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const exportHistory = () => {
    const csvContent = [
      ["Employee", "Employee ID", "Period", "Status", "Score", "Updated"],
      ...filteredAppraisals.map(appraisal => [
        `${appraisal.employee_info?.first_name} ${appraisal.employee_info?.surname}`,
        appraisal.employee_info?.employee_id || "",
        `${new Date(appraisal.period_start).toLocaleDateString()} - ${new Date(appraisal.period_end).toLocaleDateString()}`,
        appraisal.status,
        appraisal.overall_assessment?.overall_score_percentage ? `${appraisal.overall_assessment.overall_score_percentage}%` : "N/A",
        new Date(appraisal.updated_at).toLocaleString()
      ])
    ].map(row => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `appraisal-history-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("History exported successfully!")
  }

  const handlePrintAppraisal = (appraisal: Appraisal) => {
    if(appraisal.status === "reviewed" || appraisal.status === "completed" || appraisal.status === "submitted") {
      // Navigate to printable view
      router.push(`/appraisal-print/${appraisal.id}`)
    } else {
      // Navigate to editable appraisal form
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
              <h1 className="text-3xl font-bold text-primary">Appraisal History</h1>
              <p className="text-muted-foreground">Team members you're appraising or have appraised</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {filteredAppraisals.length} Total
              </Badge>
              <Button variant="outline" onClick={exportHistory} disabled={filteredAppraisals.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employee name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                {(searchTerm || statusFilter !== "all" || dateRangeFilter !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                      setDateRangeFilter("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading history...</span>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredAppraisals.length === 0 && (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Appraisals Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" || dateRangeFilter !== "all"
                    ? "No appraisals match your filters."
                    : "You haven't appraised any team members yet."}
                </p>
              </CardContent>
            </Card>
          )}

          {/* History Table */}
          {!isLoading && filteredAppraisals.length > 0 && (
            <div className="bg-white rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Appraisee</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppraisals.map((appraisal) => (
                    <TableRow key={appraisal.id}>
                      <TableCell>
                        <div>
                          <p className="font-bold">
                            {appraisal.employeeInfo?.first_name} {appraisal.employeeInfo?.surname}
                          </p>
                          {/* <p className="text-sm text-muted-foreground font-bold">{appraisal.employee_id}</p> */}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-bold">
                          {new Date(appraisal.periodStart).toLocaleDateString("en-GB")} -{" "}
                          {new Date(appraisal.periodEnd).toLocaleDateString("en-GB")}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(appraisal.status)}</TableCell>
                      <TableCell>
                        <span className="font-semibold text-primary">
                          {appraisal.overallAssessment?.overall_score_percentage && appraisal.status === "completed"
                            ? `${appraisal.overallAssessment.overall_score_percentage}%`
                            : "N/A"}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm font-bold">
                        {appraisal.updatedAt 
                          ? formatDistanceToNow(new Date(appraisal.updatedAt), { addSuffix: true })
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        {/* {isReviewMode && (
                          <Button
                            onClick={() => handlePrintAppraisal(appraisal)}
                          >
                            <Printer className="h-4 w-4 mr-1" />
                            Print
                        </Button>
                        )} */}
                        <Button
                          onClick={() => handlePrintAppraisal(appraisal)}
                        >
                          <Printer className="h-4 w-4 mr-1" />
                          Print
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
    </div>
  )
}

"use client"

import { useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAppStore, useAuthStore } from "@/lib/store"
import { formatDistanceToNow } from "date-fns"
import { ArrowRight, FileText } from "lucide-react"
import { parseApiError } from "@/lib/api/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function RecentActivity() {
  const { user } = useAuthStore()
  const { users, fetchDashboardOverview, dashboardOverview } = useAppStore()
  const router = useRouter()

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

  const recentAppraisals = dashboardOverview?.recentAppraisals || []

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/60">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-bold text-slate-800">Recent Activity</h3>
        {/* <Button
          variant="link"
          className="text-blue-600 text-xs font-medium p-0 h-auto hover:no-underline hover:opacity-80"
          onClick={() => router.push('/appraisals')}
        >
          View All
        </Button> */}
      </div>

      {recentAppraisals.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <FileText className="h-10 w-10 mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-medium text-slate-500">No recent activity found</p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden border-slate-100">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="w-[40%] text-xs font-semibold text-slate-500 uppercase tracking-wider h-10">Appraisal</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider h-10">Last Updated</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider h-10">Status</TableHead>
                <TableHead className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider h-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAppraisals.map((appraisal) => {
                const employee = appraisal.employeeInfo
                const isMyAppraisal = appraisal.employee_id === user?.id
                const title = isMyAppraisal
                  ? "My Appraisal"
                  : `${employee?.first_name || ''} ${employee?.surname || ''}'s Appraisal`.trim()

                return (
                  <TableRow
                    key={appraisal.id}
                    className="hover:bg-slate-50/50 border-slate-100 transition-colors cursor-pointer group"
                    onClick={() => router.push(`/appraisal-print/${appraisal.id}?returnTo=dashboard`)}
                  >
                    <TableCell className="font-medium text-slate-700 py-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span>{title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm py-3">
                      {formatDistanceToNow(new Date(appraisal.updatedAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-sm font-medium text-slate-600 capitalize">
                        {appraisal.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-3">
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 transition-colors ml-auto" />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Save, RefreshCw, Calendar, Lock, Unlock } from "lucide-react"
import { toast } from "sonner"
import { appraisalPeriodsApi, type AppraisalPeriod } from "@/lib/api/appraisalPeriods"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"

const ADMIN_ROLES = ["Director-General", "System Administrator"]

export default function FormManagementPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [periods, setPeriods] = useState<AppraisalPeriod[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (user && !ADMIN_ROLES.includes(user.role))  {
      toast.error("Access denied. Admin privileges required.")
      router.push("/dashboard")
      return
    }

    fetchPeriods()
  }, [isAuthenticated, user, router])

  const fetchPeriods = async () => {
    try {
      setIsLoading(true)
      const data = await appraisalPeriodsApi.getAvailability()
      setPeriods(data)
    } catch (error) {
      console.error("Failed to fetch periods:", error)
      toast.error("Failed to load form periods")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = async (sectionName: string) => {
    try {
      await appraisalPeriodsApi.updateAvailability(sectionName, {
        isAvailable: false  // This will clear opens_at and set is_available to false
      })
      
      await fetchPeriods()
      toast.success("Form reset and deactivated")
    } catch (error) {
      console.error("Failed to reset:", error)
      toast.error("Failed to reset form")
    }
  }

  const handleUpdate = async (sectionName: string, data: Partial<AppraisalPeriod>) => {
    try {
      setIsSaving(true)
      await appraisalPeriodsApi.updateAvailability(sectionName, {
        opensAt: data.opens_at,
        message: data.message
      })
      
      await fetchPeriods()
      toast.success("Changes saved successfully")
    } catch (error) {
      console.error("Failed to update period:", error)
      toast.error("Failed to save changes")
    } finally {
      setIsSaving(false)
    }
  }

  const handleFieldChange = (sectionName: string, field: keyof AppraisalPeriod, value: any) => {
    setPeriods(periods.map(p => 
      p.section_name === sectionName 
        ? { ...p, [field]: value }
        : p
    ))
  }

  const getSectionDisplayName = (name: string) => {
    const nameMap: { [key: string]: string } = {
      personal_info: "Personal Information",
      performance_planning: "Performance Planning",
      mid_year_review: "Mid-Year Review",
      end_year_review: "End of Year Review",
      final_sections: "Final Sections"
    }
    return nameMap[name] || name
  }

  const getSectionDescription = (name: string) => {
    const descMap: { [key: string]: string } = {
      personal_info: "Employee details and training records",
      performance_planning: "Key result areas and targets for the year",
      mid_year_review: "Progress review of targets and competencies",
      end_year_review: "Final performance assessment and scoring",
      final_sections: "Comments, assessment decisions, and sign-offs"
    }
    return descMap[name] || ""
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!ADMIN_ROLES.includes(user.role)) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Form Management</h1>
              <p className="text-muted-foreground">
                Set opening dates for forms to auto-activate. Use the Reset button to clear dates and deactivate forms.
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid gap-6">
                {periods.map((period) => (
                  <Card key={period.section_name}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-3">
                            <CardTitle>{getSectionDisplayName(period.section_name)}</CardTitle>
                            <Badge variant={period.is_available ? "default" : "secondary"}>
                              {period.is_available ? (
                                <><Unlock className="w-3 h-3 mr-1" /> Active</>
                              ) : (
                                <><Lock className="w-3 h-3 mr-1" /> Inactive</>
                              )}
                            </Badge>
                          </div>
                          <CardDescription>
                            {getSectionDescription(period.section_name)}
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReset(period.section_name)}
                        >
                          Reset
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`opens-${period.section_name}`}>
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Opens At (Optional)
                        </Label>
                        <Input
                          id={`opens-${period.section_name}`}
                          type="datetime-local"
                          value={period.opens_at ? new Date(period.opens_at).toISOString().slice(0, 16) : ""}
                          onChange={(e) => handleFieldChange(period.section_name, 'opens_at', e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Form will auto-activate when this date is reached. Use Reset to clear and deactivate.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`message-${period.section_name}`}>
                          Display Message
                        </Label>
                        <Textarea
                          id={`message-${period.section_name}`}
                          value={period.message || ""}
                          onChange={(e) => handleFieldChange(period.section_name, 'message', e.target.value)}
                          placeholder="Message shown to users when form is not available..."
                          rows={2}
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <Button
                          onClick={() => handleUpdate(period.section_name, period)}
                          disabled={isSaving}
                          size="sm"
                        >
                          {isSaving ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                          ) : (
                            <><Save className="w-4 h-4 mr-2" /> Save Changes</>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Changes take effect immediately for all users
              </p>
              <Button variant="outline" onClick={fetchPeriods} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

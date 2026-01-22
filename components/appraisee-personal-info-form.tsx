"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Loader2, Trash2, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { createPersonalInfo, updatePersonalInfo, getMyPersonalInfo, getPersonalInfoByUserId, deletePersonalInfo, type PersonalInfoData } from "@/lib/api/personalInfo"
import { parseApiError } from "@/lib/api/api"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useAuthStore } from "@/lib/store"

interface TrainingRecord {
  institution: string
  date: string
  programme: string
}

export function AppraiseePersonalInfoForm({ onNext, initialData, onBack, isReviewMode = false, reviewUserId, isLocked = false }: {
  onNext: (data: any) => void
  initialData?: any
  onBack?: () => void
  isReviewMode?: boolean
  reviewUserId?: string
  isLocked?: boolean
}) {
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isClearingForm, setIsClearingForm] = useState(false)
  const [existingPersonalInfoId, setExistingPersonalInfoId] = useState<string | null>(null)
  const [deleteTrainingIndex, setDeleteTrainingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    // Period of Report
    periodFrom: "",
    periodTo: "",

    // Personal Details
    title: user?.title || "",
    otherTitle: user?.other_title || "",
    surname: user?.surname || "",
    firstName: user?.first_name || "",
    otherNames: user?.other_names || "",
    gender: user?.gender || "",

    // Job Information
    presentJobTitle: user?.position || "",
    gradeSalary: user?.grade || "",
    division: user?.division || "",
    dateOfAppointment: user?.appointment_date || "",

    // Training Records
    trainingRecords: [] as TrainingRecord[],

    // Appraiser Information (Section 1 B - only in review mode)
    appraiserTitle: user?.title || "",
    appraiserOtherTitle: user?.other_title || "",
    appraiserSurname: user?.surname || "",
    appraiserFirstName: user?.first_name || "",
    appraiserOtherNames: user?.other_names || "",
    appraiserPosition: user?.position || ""
  })

  const [newTrainingRecord, setNewTrainingRecord] = useState<TrainingRecord>({
    institution: "",
    date: "",
    programme: ""
  })

  // Load existing draft on mount
  useEffect(() => {
    console.log(user, 'main user')
    const loadExistingDraft = async () => {
      try {
        let personalInfoRecords

        // In review mode, fetch the specific user's personal info
        if (isReviewMode && reviewUserId) {
          personalInfoRecords = await getPersonalInfoByUserId(reviewUserId)
        } else {
          // In normal mode, fetch the logged-in user's personal info
          personalInfoRecords = await getMyPersonalInfo()
        }

        // Get the most recent record (draft)
        if (personalInfoRecords && personalInfoRecords.length > 0) {
          const latestRecord = personalInfoRecords[0]

          // Populate form with existing data
          setFormData({
            periodFrom: latestRecord.period_from.slice(0, 10) || "",
            periodTo: latestRecord.period_to.slice(0, 10) || "",
            title: latestRecord.title || "",
            otherTitle: latestRecord.other_title || "",
            surname: latestRecord.surname || "",
            firstName: latestRecord.first_name || "",
            otherNames: latestRecord.other_names || "",
            gender: latestRecord.gender || "",
            presentJobTitle: latestRecord.present_job_title || "",
            gradeSalary: latestRecord.grade_salary || "",
            division: latestRecord.division || "",
            dateOfAppointment: latestRecord.date_of_appointment.slice(0, 10) || "",
            trainingRecords: latestRecord.training_records || [],
            // Appraiser fields
            appraiserTitle: user?.title || "",
            appraiserOtherTitle: user?.other_title || "",
            appraiserSurname: user?.surname || "",
            appraiserFirstName: user?.first_name || "",
            appraiserOtherNames: user?.other_names || "",
            appraiserPosition: user?.position || ""
          })

          // Store the ID for updates
          setExistingPersonalInfoId(latestRecord.id)

          toast.info("Loaded your draft personal information")
        }
      } catch (error) {
        // Silently fail - no draft exists yet
        console.log("No existing draft found")
      }
    }

    loadExistingDraft()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title, otherTitle: title === "other" ? prev.otherTitle : "" }))
  }

  const addTrainingRecord = () => {
    if (newTrainingRecord.institution && newTrainingRecord.date && newTrainingRecord.programme) {
      setFormData(prev => ({
        ...prev,
        trainingRecords: [...prev.trainingRecords, newTrainingRecord]
      }))
      setNewTrainingRecord({ institution: "", date: "", programme: "" })
    }
  }

  const removeTrainingRecord = (index: number) => {
    setFormData(prev => ({
      ...prev,
      trainingRecords: prev.trainingRecords.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLocked) {
      onNext({
        ...formData,
      })
      return
    }

    setIsLoading(true)
    try {
      // Prepare data for API
      const personalInfoData: PersonalInfoData = {
        periodFrom: formData.periodFrom,
        periodTo: formData.periodTo,
        title: formData.title,
        otherTitle: formData.otherTitle || undefined,
        surname: formData.surname,
        firstName: formData.firstName,
        otherNames: formData.otherNames || undefined,
        gender: formData.gender,
        presentJobTitle: formData.presentJobTitle,
        gradeSalary: formData.gradeSalary,
        division: formData.division,
        dateOfAppointment: formData.dateOfAppointment,
        trainingRecords: formData.trainingRecords,
        // Appraiser fields (only sent if filled in review mode)
        appraiserTitle: formData.appraiserTitle || undefined,
        appraiserOtherTitle: formData.appraiserOtherTitle || undefined,
        appraiserSurname: formData.appraiserSurname || undefined,
        appraiserFirstName: formData.appraiserFirstName || undefined,
        appraiserOtherNames: formData.appraiserOtherNames || undefined,
        appraiserPosition: formData.appraiserPosition || undefined
      }

      let savedPersonalInfo
    
    // Update existing or create new
      if (existingPersonalInfoId) {
        savedPersonalInfo = await updatePersonalInfo(existingPersonalInfoId, personalInfoData)
        toast.success("Personal information updated successfully!")
      } else {
        savedPersonalInfo = await createPersonalInfo(personalInfoData)
        setExistingPersonalInfoId(savedPersonalInfo.id)
        toast.success("Personal information saved successfully!")
      }

      // Pass data to parent component with the saved ID
      onNext({
        ...formData,
        personalInfoId: savedPersonalInfo.id
      })
    } catch (error) {
      const apiError = parseApiError(error)
      toast.error(apiError.message || "Failed to save personal information")
      console.error("Error saving personal info:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearForm = async () => {
    setIsClearingForm(true)

    try {
      if (isReviewMode) {
        // In review mode, only clear appraiser fields (Section 1 B)
        setFormData(prev => ({
          ...prev,
          appraiserTitle: "",
          appraiserOtherTitle: "",
          appraiserSurname: "",
          appraiserFirstName: "",
          appraiserOtherNames: "",
          appraiserPosition: ""
        }))
        toast.success("Appraiser information cleared")
      } else {
        // In normal mode, delete from database and clear appraisee fields (Section 1 A)
        if (existingPersonalInfoId) {
          await deletePersonalInfo(existingPersonalInfoId)
          toast.success("Form cleared and draft deleted")
        } else {
          toast.success("Form cleared")
        }

        // Reset appraisee form fields only
        setFormData({
          periodFrom: "",
          periodTo: "",
          title: "",
          otherTitle: "",
          surname: "",
          firstName: "",
          otherNames: "",
          gender: "",
          presentJobTitle: "",
          gradeSalary: "",
          division: "",
          dateOfAppointment: "",
          trainingRecords: [],
          // Keep appraiser fields as they are
          appraiserTitle: "",
          appraiserOtherTitle: "",
          appraiserSurname: "",
          appraiserFirstName: "",
          appraiserOtherNames: "",
          appraiserPosition: ""
        })

        setExistingPersonalInfoId(null)
      }
    } catch (error) {
      const apiError = parseApiError(error)
      toast.error(apiError.message || "Failed to clear form")
    } finally {
      setIsClearingForm(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="">
        <CardTitle className="text-xl font-bold bg-amber-800 text-white rounded-lg p-2">SECTION 1 - A: Appraisee Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <form onSubmit={handleSubmit} className="">
          {/* Locked Banner */}
          {isLocked && (
            <div className="mb-4 p-4 bg-amber-100 border border-amber-300 rounded-lg flex items-center gap-3">
              <div className="text-amber-600 text-4xl">🔒</div>
              <div>
                <p className="font-semibold text-amber-800">This form is locked</p>
                <p className="text-sm text-amber-700">Both appraisee and appraiser have completed the Performance Planning form. This section can no longer be edited.</p>
              </div>
            </div>
          )}
          {/* Period of Report */}
          <Card className="p-2 rounded-lg">
            <div className="space-y-4 flex items-center justify-between gap-2">
              <h3 className="text-base font-bold m-0">PERIOD OF REPORT</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="space-y-2 flex gap-2 items-center">
                  <Label className="m-0" htmlFor="periodFrom">From</Label>
                  <Input
                    id="periodFrom"
                    type="date"
                    value={formData.periodFrom}
                    onChange={(e) => handleInputChange("periodFrom", e.target.value)}
                    required
                    disabled={isLocked}
                  />
                </div>
                <div className="space-y-2 flex gap-2 items-center">
                  <Label className="m-0" htmlFor="periodTo">To</Label>
                  <Input
                    id="periodTo"
                    type="date"
                    value={formData.periodTo}
                    onChange={(e) => handleInputChange("periodTo", e.target.value)}
                    required
                    disabled={isLocked}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Details */}
          <Card className="p-4 bg-transparent border-none shadow-none">
            <div className="space-y-4">
              {/* <h3 className="text-base font-bold">Personal Details</h3> */}
              {/* Title */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <Label>Title</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mr"
                      checked={formData.title === "Mr"}
                      onCheckedChange={() => handleTitleChange("Mr")}
                      required
                      disabled
                    />
                    <Label htmlFor="mr">Mr.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mrs"
                      checked={formData.title === "Mrs"}
                      onCheckedChange={() => handleTitleChange("Mrs")}
                      required
                      disabled
                    />
                    <Label htmlFor="mrs">Mrs.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ms"
                      checked={formData.title === "Ms"}
                      onCheckedChange={() => handleTitleChange("Ms")}
                      required
                      disabled
                    />
                    <Label htmlFor="ms">Ms.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="other"
                      checked={formData.title === "other"}
                      onCheckedChange={() => handleTitleChange("other")}
                      required
                      disabled
                    />
                    <Label htmlFor="other">Other (Pls. specify):</Label>
                  </div>
                  {formData.title === "other" && (
                    <Input
                      className="w-32"
                      value={formData.otherTitle}
                      onChange={(e) => handleInputChange("otherTitle", e.target.value)}
                      placeholder="Specify"
                    />
                  )}
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    value={formData.surname}
                    onChange={(e) => handleInputChange("surname", e.target.value)}
                    required
                    disabled={formData.surname !== "" || isLocked}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    disabled={formData.firstName !== "" || isLocked}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherNames">Other Name(s)</Label>
                  <Input
                    id="otherNames"
                    value={formData.otherNames}
                    onChange={(e) => handleInputChange("otherNames", e.target.value)}
                    disabled={formData.otherNames !== "" || isLocked}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <Label>Gender</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="male"
                      checked={formData.gender === "Male"}
                      onCheckedChange={() => handleInputChange("gender", "Male")}
                      disabled={formData.gender !== "" || isLocked}
                    />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="female"
                      checked={formData.gender === "Female"}
                      onCheckedChange={() => handleInputChange("gender", "Female")}
                      disabled={formData.gender !== "" || isLocked}
                    />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Job Information */}
          <Card className="p-4 bg-transparent border-none shadow-none">
            <div className="space-y-4">
              {/* <Badge variant="secondary" className="text-sm font-semibold">Job Information</Badge> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="presentJobTitle">Present Job Title/Position</Label>
                  <Input
                    id="presentJobTitle"
                    value={formData.presentJobTitle}
                    onChange={(e) => handleInputChange("presentJobTitle", e.target.value)}
                    required
                    disabled={formData.presentJobTitle !== "" || isLocked}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradeSalary">Grade/Salary (p.a)</Label>
                  <Input
                    id="gradeSalary"
                    value={formData.gradeSalary}
                    onChange={(e) => handleInputChange("gradeSalary", e.target.value)}
                    required
                    disabled={formData.gradeSalary !== "" || isLocked}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="division">Department/Division</Label>
                  <Input
                    id="division"
                    value={formData.division}
                    onChange={(e) => handleInputChange("division", e.target.value)}
                    required
                    disabled={formData.division !== "" || isLocked}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfAppointment">Date of Appointment to Present Grade</Label>
                  <Input
                    id="dateOfAppointment"
                    type="date"
                    value={formData.dateOfAppointment}
                    onChange={(e) => handleInputChange("dateOfAppointment", e.target.value)}
                    required
                    disabled={formData.dateOfAppointment !== "" || isLocked}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Training Received */}
          <Card className="p-4 border-none bg-transparent shadow-none">
            <div className="space-y-4">
              <h3 className="text-base font-bold">TRAINING RECEIVED DURING THE PREVIOUS YEAR</h3>
              {/* Add New Training Record */}
              <div className="">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <div className="space-y-2 flex flex-col items-center">
                    <Label>Institution</Label>
                    <Input
                      value={newTrainingRecord.institution}
                      onChange={(e) => setNewTrainingRecord(prev => ({ ...prev, institution: e.target.value }))}
                      placeholder="Enter institution"
                      disabled={isLocked}
                    />
                  </div>
                  <div className="space-y-2 flex flex-col items-center">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={newTrainingRecord.date}
                      onChange={(e) => setNewTrainingRecord(prev => ({ ...prev, date: e.target.value }))}
                      disabled={isLocked}
                    />
                  </div>
                  <div className="space-y-2 flex flex-col items-center">
                    <Label>Programme</Label>
                    <Input
                      value={newTrainingRecord.programme}
                      onChange={(e) => setNewTrainingRecord(prev => ({ ...prev, programme: e.target.value }))}
                      placeholder="Enter programme"
                      disabled={isLocked}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={addTrainingRecord} className="w-full" disabled={isLocked}>
                      Add Training
                    </Button>
                  </div>
                </div>
              </div>

              {/* Training Records List */}
              {formData.trainingRecords.length > 0 && (
                <div className="space-y-2">
                  {formData.trainingRecords.map((record, index) => (
                    <div key={index} className="">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b border-blue-300 py-1 items-center">
                        <div>
                          <p className="text-sm text-center">{record.institution}</p>
                        </div>
                        <div>
                          <p className="text-sm text-center">{record.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-center">{record.programme}</p>
                        </div>
                        <div className="flex items-center justify-center">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button disabled={isLocked} className="">
                                Edit
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Training Record?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove this training record?
                                  <br /><br />
                                  <strong>Programme:</strong> {record.programme}<br />
                                  <strong>Institution:</strong> {record.institution}<br />
                                  <strong>Date:</strong> {record.date}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => removeTrainingRecord(index)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Yes, Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Section 1 B: Appraiser's Information (Only visible in review mode) */}
          {isReviewMode && (
            <Card className="p-4 border-2 border-blue-200 bg-blue-50/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="default" className="text-sm font-semibold">SECTION 1 B: APPRAISER'S INFORMATION</Badge>
                </div>

                <div className="space-y-4">
                  {/* Title with Checkboxes */}
                  <div className="space-y-2">
                    <Label>Title:</Label>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="appraiser-mr"
                          checked={formData.appraiserTitle === "Mr"}
                          onCheckedChange={() => handleInputChange("appraiserTitle", "Mr")}
                          disabled={formData.appraiserTitle !== "" || isLocked}
                        />
                        <Label htmlFor="appraiser-mr">Mr.</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="appraiser-mrs"
                          checked={formData.appraiserTitle === "Mrs"}
                          onCheckedChange={() => handleInputChange("appraiserTitle", "Mrs")}
                          disabled={formData.appraiserTitle !== "" || isLocked}
                        />
                        <Label htmlFor="appraiser-mrs">Mrs.</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="appraiser-ms"
                          checked={formData.appraiserTitle === "Ms"}
                          onCheckedChange={() => handleInputChange("appraiserTitle", "Ms")}
                          disabled={formData.appraiserTitle !== "" || isLocked}
                        />
                        <Label htmlFor="appraiser-ms">Ms.</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="appraiser-other"
                          checked={formData.appraiserTitle === "Other"}
                          onCheckedChange={() => handleInputChange("appraiserTitle", "Other")}
                          disabled={formData.appraiserTitle !== "" || isLocked}
                        />
                        <Label htmlFor="appraiser-other">Other (Pls. specify):</Label>
                      </div>
                      {formData.appraiserTitle === "Other" && (
                        <Input
                          value={formData.appraiserOtherTitle}
                          onChange={(e) => handleInputChange("appraiserOtherTitle", e.target.value)}
                          placeholder="Specify title"
                          className="w-64"
                          disabled={formData.appraiserTitle !== "Other" || isLocked}
                        />
                      )}
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="appraiserSurname">Surname:</Label>
                      <Input
                        id="appraiserSurname"
                        value={formData.appraiserSurname}
                        onChange={(e) => handleInputChange("appraiserSurname", e.target.value)}
                        disabled={formData.appraiserSurname !== "" || isLocked}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appraiserFirstName">First Name:</Label>
                      <Input
                        id="appraiserFirstName"
                        value={formData.appraiserFirstName}
                        onChange={(e) => handleInputChange("appraiserFirstName", e.target.value)}
                        disabled={formData.appraiserFirstName !== "" || isLocked}
                      />
                    </div>
                  </div>

                  {/* Other Names */}
                  <div className="space-y-2">
                    <Label htmlFor="appraiserOtherNames">Other Name(s):</Label>
                    <Input
                      id="appraiserOtherNames"
                      value={formData.appraiserOtherNames}
                      onChange={(e) => handleInputChange("appraiserOtherNames", e.target.value)}
                      disabled={formData.appraiserOtherNames !== "" || isLocked}
                    />
                  </div>

                  {/* Position of Appraiser */}
                  <div className="space-y-2">
                    <Label htmlFor="appraiserPosition">Position of Appraiser:</Label>
                    <Input
                      id="appraiserPosition"
                      value={formData.appraiserPosition}
                      onChange={(e) => handleInputChange("appraiserPosition", e.target.value)}
                      disabled={formData.appraiserPosition !== "" || isLocked}
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t">
            {/* Clear Form Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled={isLoading || isClearingForm || isLocked}
                >
                  {isClearingForm ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Form
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Form?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {existingPersonalInfoId
                      ? "This will delete your saved draft and clear all form fields. This action cannot be undone."
                      : "This will clear all form fields. You can fill them in again later."}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearForm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Clear Form
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="px-8" disabled={isLoading || isClearingForm}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {existingPersonalInfoId ? "Updating..." : "Saving..."}
                </>
              ) : (
                <>
                  {isLocked ? "Continue to Next Section" : "Continue to Next Section"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

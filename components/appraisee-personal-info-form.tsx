"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Loader2, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { createPersonalInfo, updatePersonalInfo, getMyPersonalInfo, deletePersonalInfo, type PersonalInfoData } from "@/lib/api/personalInfo"
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

interface TrainingRecord {
  institution: string
  date: string
  programme: string
}

export function AppraiseePersonalInfoForm({ onNext, initialData }: { 
  onNext: (data: any) => void 
  initialData?: any
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [isClearingForm, setIsClearingForm] = useState(false)
  const [existingPersonalInfoId, setExistingPersonalInfoId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    // Period of Report
    periodFrom: "",
    periodTo: "",
    
    // Personal Details
    title: "",
    otherTitle: "",
    surname: "",
    firstName: "",
    otherNames: "",
    gender: "",
    
    // Job Information
    presentJobTitle: "",
    gradeSalary: "",
    division: "",
    dateOfAppointment: "",
    
    // Training Records
    trainingRecords: [] as TrainingRecord[]
  })

  const [newTrainingRecord, setNewTrainingRecord] = useState<TrainingRecord>({
    institution: "",
    date: "",
    programme: ""
  })

  // Load existing draft on mount
  useEffect(() => {
    const loadExistingDraft = async () => {
      try {
        const personalInfoRecords = await getMyPersonalInfo()
        console.log(personalInfoRecords, 'this is the personal info records')
        // Get the most recent record (draft)
        if (personalInfoRecords && personalInfoRecords.length > 0) {
          const latestRecord = personalInfoRecords[0]
          
          // Populate form with existing data
          setFormData({
            periodFrom: latestRecord.period_from.slice(0, 10)  || "",
            periodTo: latestRecord.period_to.slice(0, 10)  || "",
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
            trainingRecords: latestRecord.training_records || []
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
        trainingRecords: formData.trainingRecords
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
      // Delete from database if exists
      if (existingPersonalInfoId) {
        await deletePersonalInfo(existingPersonalInfoId)
        toast.success("Form cleared and draft deleted")
      } else {
        toast.success("Form cleared")
      }
      
      // Reset form
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
        trainingRecords: []
      })
      
      setExistingPersonalInfoId(null)
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
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Period of Report */}
          <Card className="p-4">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm font-semibold">PERIOD OF REPORT</Badge>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="periodFrom">From (dd/mm/yyyy)</Label>
                  <Input
                    id="periodFrom"
                    type="date"
                    value={formData.periodFrom}
                    onChange={(e) => handleInputChange("periodFrom", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periodTo">To (dd/mm/yyyy)</Label>
                  <Input
                    id="periodTo"
                    type="date"
                    value={formData.periodTo}
                    onChange={(e) => handleInputChange("periodTo", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Details */}
          <Card className="p-4">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm font-semibold">Personal Details</Badge>
              
              {/* Title */}
              <div className="space-y-2">
                <Label>Title</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mr"
                      checked={formData.title === "Mr"}
                      onCheckedChange={() => handleTitleChange("Mr")}
                    />
                    <Label htmlFor="mr">Mr.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mrs"
                      checked={formData.title === "Mrs"}
                      onCheckedChange={() => handleTitleChange("Mrs")}
                    />
                    <Label htmlFor="mrs">Mrs.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ms"
                      checked={formData.title === "Ms"}
                      onCheckedChange={() => handleTitleChange("Ms")}
                    />
                    <Label htmlFor="ms">Ms.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="other"
                      checked={formData.title === "other"}
                      onCheckedChange={() => handleTitleChange("other")}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    value={formData.surname}
                    onChange={(e) => handleInputChange("surname", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherNames">Other Name(s)</Label>
                  <Input
                    id="otherNames"
                    value={formData.otherNames}
                    onChange={(e) => handleInputChange("otherNames", e.target.value)}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label>Gender</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="male"
                      checked={formData.gender === "Male"}
                      onCheckedChange={() => handleInputChange("gender", "Male")}
                    />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="female"
                      checked={formData.gender === "Female"}
                      onCheckedChange={() => handleInputChange("gender", "Female")}
                    />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Job Information */}
          <Card className="p-4">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm font-semibold">Job Information</Badge>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="presentJobTitle">Present Job Title/Position</Label>
                  <Input
                    id="presentJobTitle"
                    value={formData.presentJobTitle}
                    onChange={(e) => handleInputChange("presentJobTitle", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradeSalary">Grade/Salary (p.a)</Label>
                  <Input
                    id="gradeSalary"
                    value={formData.gradeSalary}
                    onChange={(e) => handleInputChange("gradeSalary", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="division">Department/Division</Label>
                  <Input
                    id="division"
                    value={formData.division}
                    onChange={(e) => handleInputChange("division", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfAppointment">Date of Appointment to Present Grade (dd/mm/yyyy)</Label>
                  <Input
                    id="dateOfAppointment"
                    type="date"
                    value={formData.dateOfAppointment}
                    onChange={(e) => handleInputChange("dateOfAppointment", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Training Received */}
          <Card className="p-4">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm font-semibold underline">TRAINING RECEIVED DURING THE PREVIOUS YEAR</Badge>
              
              {/* Add New Training Record */}
              <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      value={newTrainingRecord.institution}
                      onChange={(e) => setNewTrainingRecord(prev => ({ ...prev, institution: e.target.value }))}
                      placeholder="Enter institution"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date (dd-mm-yyyy)</Label>
                    <Input
                      type="date"
                      value={newTrainingRecord.date}
                      onChange={(e) => setNewTrainingRecord(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Programme</Label>
                    <Input
                      value={newTrainingRecord.programme}
                      onChange={(e) => setNewTrainingRecord(prev => ({ ...prev, programme: e.target.value }))}
                      placeholder="Enter programme"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={addTrainingRecord} className="w-full">
                      Add Training
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Training Records List */}
              {formData.trainingRecords.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Training Records:</h4>
                  {formData.trainingRecords.map((record, index) => (
                    <Card key={index} className="p-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <span className="text-sm font-medium">Institution:</span>
                          <p className="text-sm">{record.institution}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Date:</span>
                          <p className="text-sm">{record.date}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Programme:</span>
                          <p className="text-sm">{record.programme}</p>
                        </div>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeTrainingRecord(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t">
            {/* Clear Form Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  disabled={isLoading || isClearingForm}
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
                "Continue to Next Section"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

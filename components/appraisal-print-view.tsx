"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Loader2, Printer, ArrowLeft } from "lucide-react"
import { appraisalsApi } from "@/lib/api/appraisals"
import { toast } from "sonner"
import Image from "next/image"

interface AppraisalViewProps {
  appraisalId: string
}

export default function AppraisalPrintView({ appraisalId }: AppraisalViewProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [appraisal, setAppraisal] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const fetchAppraisal = async () => {
      try {
        setIsLoading(true)
        // Fetch the specific appraisal by ID
        const data = await appraisalsApi.getAppraisalById(appraisalId)
        console.log("Appraisal data:", data)
        setAppraisal(data)
      } catch (error) {
        console.error("Error fetching appraisal:", error)
        toast.error("Failed to load appraisal")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppraisal()
  }, [appraisalId, isAuthenticated, router])

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!appraisal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Appraisal not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden sticky top-0 bg-white border-b shadow-sm p-4 flex justify-between items-center z-10">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      </div>

      {/* Printable Form */}
      <div className="max-w-[210mm] mx-auto p-8 print:p-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-24 h-24 relative">
            <Image
              src="/logos/coat-of-arms.png"
              alt="Coat of Arms"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1 text-center px-4">
            <h1 className="text-xl font-bold text-orange-700 uppercase">
              Public Services Performance Management
            </h1>
            <p className="text-sm mt-1">
              (STAFF PERFORMANCE PLANNING, REVIEW AND APPRAISAL FORM)
            </p>
            <p className="text-sm font-bold text-red-700 mt-2">
              STRICTLY CONFIDENTIAL
            </p>
          </div>
          <div className="w-24 h-24 relative">
            <Image
              src="/logos/pas.jpeg"
              alt="PAS Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* SECTION 1 - A: Appraisee Personal Information */}
        <div className="mb-6">
          <div className="bg-orange-700 text-white px-3 py-2 font-bold">
            SECTION 1 - A: Appraisee Personal Information
          </div>
          <div className="border border-gray-400 p-4 space-y-3">
            {/* Period of Report */}
            <div className="border border-gray-400 p-2">
              <div className="flex items-center gap-4">
                <span className="font-bold">PERIOD OF REPORT</span>
                <span className="ml-auto">
                  From (dd/mm/yyy): 
                  <span className="ml-2 underline">
                    {appraisal.periodStart ? new Date(appraisal.periodStart).toLocaleDateString() : "_______________"}
                  </span>
                </span>
                <span className="ml-4">
                  To: (dd/mm/yyy): 
                  <span className="ml-2 underline">
                    {appraisal.periodEnd ? new Date(appraisal.periodEnd).toLocaleDateString() : "_______________"}
                  </span>
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="flex items-center gap-4">
              <span className="font-bold">Title:</span>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={appraisal.employeeInfo?.title === "Mr."} readOnly />
                Mr.
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={appraisal.employeeInfo?.title === "Mrs."} readOnly />
                Mrs.
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={appraisal.employeeInfo?.title === "Ms."} readOnly />
                Ms.
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={appraisal.employeeInfo?.title?.startsWith("Other")} readOnly />
                Other (Pls. specify):
              </label>
              <span className="border-b border-gray-400 flex-1">
                {appraisal.employeeInfo?.other_title || ""}
              </span>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold">Surname: </span>
                <span className="border-b border-gray-400 inline-block w-64">
                  {appraisal.employeeInfo?.surname || ""}
                </span>
              </div>
              <div>
                <span className="font-bold">First Name: </span>
                <span className="border-b border-gray-400 inline-block w-64">
                  {appraisal.employeeInfo?.first_name || ""}
                </span>
              </div>
            </div>

            <div>
              <span className="font-bold">Other Name(s): </span>
              <span className="border-b border-gray-400 inline-block w-96">
                {appraisal.employeeInfo?.other_names || ""}
              </span>
            </div>

            {/* Gender and Grade */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4">
                <span className="font-bold">Gender:</span>
                <label className="flex items-center gap-1">
                  <input type="checkbox" checked={appraisal.employeeInfo?.gender === "Male"} readOnly />
                  Male
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" checked={appraisal.employeeInfo?.gender === "Female"} readOnly />
                  Female
                </label>
              </div>
              <div>
                <span className="font-bold">Grade/Salary (p.a): </span>
                <span className="border-b border-gray-400 inline-block w-48">
                  {appraisal.employeeInfo?.grade_salary || ""}
                </span>
              </div>
            </div>

            {/* Job Title */}
            <div>
              <span className="font-bold">Present Job Title/Position: </span>
              <span className="border-b border-gray-400 inline-block w-96">
                {appraisal.employeeInfo?.present_job_title || ""}
              </span>
            </div>

            {/* Department */}
            <div>
              <span className="font-bold">Department/ Division: </span>
              <span className="border-b border-gray-400 inline-block w-96">
                {appraisal.employeeInfo?.division || ""}
              </span>
            </div>

            {/* Date of Appointment */}
            <div>
              <span className="font-bold">Date of Appointment to Present Grade (dd/mm/yyy): </span>
              <span className="border-b border-gray-400 inline-block w-64">
                {appraisal.employeeInfo?.date_of_appointment 
                  ? new Date(appraisal.employeeInfo.date_of_appointment).toLocaleDateString()
                  : ""}
              </span>
            </div>

            {/* Training Table */}
            <div className="mt-4">
              <p className="font-bold underline mb-2">TRAINING RECEIVED DURING THE PREVIOUS YEAR</p>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-400">
                    <th className="text-left py-2">Institution</th>
                    <th className="text-left py-2">Date (dd-mm-yyyy)</th>
                    <th className="text-left py-2">Programme</th>
                  </tr>
                </thead>
                <tbody>
                  {appraisal.trainingReceived && appraisal.trainingReceived.length > 0 ? (
                    <>
                      {appraisal.trainingReceived.slice(0, 4).map((training: any, idx: number) => (
                        <tr key={idx} className="border-b border-gray-300">
                          <td className="py-2">{training.institution || "___________________________"}</td>
                          <td className="py-2">{training.date ? new Date(training.date).toLocaleDateString() : "___________________________"}</td>
                          <td className="py-2">{training.programme || "___________________________"}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    // Show 4 empty rows if no training data
                    Array(4).fill(0).map((_, idx) => (
                      <tr key={idx} className="border-b border-gray-300">
                        <td className="py-2">___________________________</td>
                        <td className="py-2">___________________________</td>
                        <td className="py-2">___________________________</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION 1 - B: Appraiser Information */}
        <div className="mb-6">
          <div className="bg-orange-700 text-white px-3 py-2 font-bold">
            SECTION 1 - B: Appraiser Information
          </div>
          <div className="border border-gray-400 p-4 space-y-3">
            {/* Title */}
            <div className="flex items-center gap-4">
              <span className="font-bold">Title:</span>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={appraisal.appraiserInfo?.title === "Mr."} readOnly />
                Mr.
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={appraisal.appraiserInfo?.title === "Mrs."} readOnly />
                Mrs.
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={appraisal.appraiserInfo?.title === "Ms."} readOnly />
                Ms.
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={appraisal.appraiserInfo?.title?.startsWith("Other")} readOnly />
                Other (Pls. specify):
              </label>
              <span className="border-b border-gray-400 flex-1">
                {appraisal.appraiserInfo?.other_title || ""}
              </span>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold">Surname: </span>
                <span className="border-b border-gray-400 inline-block w-64">
                  {appraisal.appraiserInfo?.surname || ""}
                </span>
              </div>
              <div>
                <span className="font-bold">First Name: </span>
                <span className="border-b border-gray-400 inline-block w-64">
                  {appraisal.appraiserInfo?.first_name || ""}
                </span>
              </div>
            </div>

            <div>
              <span className="font-bold">Other Name(s): </span>
              <span className="border-b border-gray-400 inline-block w-96">
                {appraisal.appraiserInfo?.other_names || ""}
              </span>
            </div>

            {/* Position */}
            <div>
              <span className="font-bold">Position of Appraiser: </span>
              <span className="border-b border-gray-400 inline-block w-96">
                {appraisal.appraiserInfo?.position || ""}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: Performance Planning Form */}
        <div className="mb-6 page-break">
          <div className="bg-orange-700 text-white px-3 py-2 font-bold">
            SECTION 2: Performance Planning Form
          </div>
          <div className="border border-gray-400 p-4">
            {/* Instruction */}
            <p className="text-xs mb-3 text-center italic">
              To be agreed between the appraiser and the employee at the start of the annual appraisal cycle or when a new employee is engaged.
            </p>

            {/* Key Result Areas Table */}
            <table className="w-full border-collapse border-2 border-gray-800">
              <thead>
                <tr>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100 w-1/3">
                    <div className="font-bold text-sm">KEY RESULT AREAS</div>
                    <div className="text-xs font-normal italic">
                      (Not more than 5 - To be drawn from employee's Job Description)
                    </div>
                  </th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100 w-1/3">
                    <div className="font-bold text-sm">TARGETS</div>
                    <div className="text-xs font-normal italic">
                      (Results to be achieved, should be specific, measurable, realistic and time-framed)
                    </div>
                  </th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100 w-1/3">
                    <div className="font-bold text-sm">RESOURCES REQUIRED</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {appraisal.keyResultAreas && appraisal.keyResultAreas.length > 0 ? (
                  appraisal.keyResultAreas.map((kra: any, idx: number) => (
                    <tr key={idx}>
                      <td className="border-2 border-gray-800 p-3 align-top min-h-32">
                        {kra.keyResultArea || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-3 align-top min-h-32">
                        {kra.targets || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-3 align-top min-h-32">
                        {kra.resourcesRequired || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border-2 border-gray-800 p-3 align-top h-48"></td>
                    <td className="border-2 border-gray-800 p-3 align-top h-48"></td>
                    <td className="border-2 border-gray-800 p-3 align-top h-48"></td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Key Competencies Note */}
            <div className="mt-3 text-sm">
              Key Competencies Required: (see Section 5)
            </div>

            {/* Signature Boxes */}
            <div className="grid grid-cols-2 gap-20 mt-6">
              <div>
                <div className="border-gray-400 pt-2 h-10 flex items-center justify-start">
                  {appraisal.appraiseeSignature ? (
                    <img 
                      src={appraisal.appraiseeSignature} 
                      alt="Appraisee Signature" 
                      className="max-h-14 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No signature</span>
                  )}
                </div>
                <div className="mt-4">
                  <div className="bg-orange-700 text-white px-3 py-1 text-center font-bold text-sm inline-block">
                    APPRAISEE'S SIGNATURE
                  </div>
                </div>
              </div>
              <div>
                <div className="border-gray-400 pt-2 h-10 flex items-center justify-start">
                  {appraisal.appraiserSignature ? (
                    <img 
                      src={appraisal.appraiserSignature} 
                      alt="Appraiser Signature" 
                      className="max-h-14 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No signature</span>
                  )}
                </div>
                <div className="mt-4">
                  <div className="bg-orange-700 text-white px-3 py-1 text-center font-bold text-sm inline-block">
                    APPRAISER'S SIGNATURE
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between text-xs mt-2">
            <span>PUBLIC SERVICES COMMISSION, ME-SPRASG1</span>
            <span className="font-bold">STRICTLY CONFIDENTIAL</span>
            <span>PAGE 4 OF 11</span>
          </div>
        </div>

        {/* SECTION 3: Mid-Year Review Form */}
        <div className="mb-6 page-break">
          <div className="bg-orange-700 text-white px-3 py-2 font-bold">
            SECTION 3: Mid-Year Review Form
          </div>
          <div className="border border-gray-400 p-4">
            {/* Instructions */}
            <p className="text-sm mb-2">
              This is to be completed in July by the Appraiser and Appraisee
            </p>
            <p className="text-center text-sm mb-3">
              Progress has been discussed and Agreements have been reached as detailed below.
            </p>
            <p className="text-center font-bold text-sm mb-4 underline">
              MID-YEAR REVIEW
            </p>

            {/* Targets Table */}
            <table className="w-full border-collapse border-2 border-gray-800 mb-6">
              <thead>
                <tr>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100 w-16">NO.</th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100">TARGET</th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100">PROGRESS REVIEW</th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100">REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {appraisal.midYearReview?.targets && appraisal.midYearReview.targets.length > 0 ? (
                  appraisal.midYearReview.targets.map((target: any, idx: number) => (
                    <tr key={idx}>
                      <td className="border-2 border-gray-800 p-2 text-center">{idx + 1}</td>
                      <td className="border-2 border-gray-800 p-3 align-top">
                        {target.description || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-3 align-top">
                        {target.progressReview || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-3 align-top">
                        {target.remarks || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  // Show 4 empty rows if no data
                  Array(4).fill(0).map((_, idx) => (
                    <tr key={idx}>
                      <td className="border-2 border-gray-800 p-2 text-center h-16">{idx + 1}</td>
                      <td className="border-2 border-gray-800 p-3 align-top"></td>
                      <td className="border-2 border-gray-800 p-3 align-top"></td>
                      <td className="border-2 border-gray-800 p-3 align-top"></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Competencies Table */}
            <table className="w-full border-collapse border-2 border-gray-800 mb-6">
              <thead>
                <tr>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100 w-16">NO.</th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100">COMPETENCY</th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100">PROGRESS REVIEW</th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100">REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {appraisal.midYearReview?.competencies && appraisal.midYearReview.competencies.length > 0 ? (
                  appraisal.midYearReview.competencies.map((competency: any, idx: number) => (
                    <tr key={idx}>
                      <td className="border-2 border-gray-800 p-2 text-center">{idx + 1}</td>
                      <td className="border-2 border-gray-800 p-3 align-top">
                        {competency.description || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-3 align-top">
                        {competency.progressReview || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-3 align-top">
                        {competency.remarks || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  // Show 4 empty rows if no data
                  Array(4).fill(0).map((_, idx) => (
                    <tr key={idx}>
                      <td className="border-2 border-gray-800 p-2 text-center h-16">{idx + 1}</td>
                      <td className="border-2 border-gray-800 p-3 align-top"></td>
                      <td className="border-2 border-gray-800 p-3 align-top"></td>
                      <td className="border-2 border-gray-800 p-3 align-top"></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Signature Boxes */}
            <div className="grid grid-cols-2 gap-20 mt-6">
              <div>
                <div className="border-gray-400 pt-2 h-16 flex items-center justify-start">
                  {appraisal.midYearReview?.appraisee_signature_url ? (
                    <img 
                      src={appraisal.midYearReview.appraisee_signature_url} 
                      alt="Appraisee Signature" 
                      className="max-h-14 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm"></span>
                  )}
                </div>
                <div className="mt-2">
                  <div className="bg-orange-700 text-white px-3 py-1 text-center font-bold text-sm inline-block">
                    APPRAISEE'S SIGNATURE
                  </div>
                </div>
                <div className="mt-4 border border-gray-400 p-2 w-48">
                  <div className="bg-orange-700 text-white px-3 py-1 text-center font-bold text-sm">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center mt-1">
                    {appraisal.midYearReview?.appraisee_date 
                      ? new Date(appraisal.midYearReview.appraisee_date).toLocaleDateString()
                      : ""}
                  </div>
                </div>
              </div>
              <div>
                <div className="border-gray-400 pt-2 h-16 flex items-center justify-start">
                  {appraisal.midYearReview?.appraiser_signature_url ? (
                    <img 
                      src={appraisal.midYearReview.appraiser_signature_url} 
                      alt="Appraiser Signature" 
                      className="max-h-14 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm"></span>
                  )}
                </div>
                <div className="mt-2">
                  <div className="bg-orange-700 text-white px-3 py-1 text-center font-bold text-sm inline-block">
                    APPRAISER'S SIGNATURE
                  </div>
                </div>
                <div className="mt-4 border border-gray-400 p-2 w-48">
                  <div className="bg-orange-700 text-white px-3 py-1 text-center font-bold text-sm">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center mt-1">
                    {appraisal.midYearReview?.appraiser_date 
                      ? new Date(appraisal.midYearReview.appraiser_date).toLocaleDateString()
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between text-xs mt-2">
            <span>PUBLIC SERVICES COMMISSION, ME-SPRASG1</span>
            <span className="font-bold">STRICTLY CONFIDENTIAL</span>
            <span>PAGE 5 OF 11</span>
          </div>
        </div>

        {/* SECTION 4: End-of-Year Review Form */}
        <div className="mb-6 page-break">
          <div className="bg-orange-700 text-white px-3 py-2 font-bold">
            SECTION 4: End-of-Year Review Form
          </div>
          <div className="border border-gray-400 p-4">
            {/* Instructions */}
            <p className="text-sm mb-2">
              This is to be completed in December by the Appraiser and Appraisee.
            </p>
            <p className="text-sm mb-4">
              ■ Please refer to <strong>page 8</strong> of the manual for guidance to the scoring.
            </p>
            <p className="text-center font-bold text-sm mb-4 underline">
              END-OF-YEAR REVIEW FORM
            </p>

            {/* End-of-Year Review Table */}
            <table className="w-full border-collapse border-2 border-gray-800 mb-6">
              <thead>
                <tr>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100 w-12">NO.</th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100">TARGET</th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100">PERFORMANCE ASSESSMENT</th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100 w-24">WEIGHT OF TARGET</th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100 w-20">SCORE</th>
                  <th className="border-2 border-gray-800 p-2 bg-gray-100">COMMENTS</th>
                </tr>
              </thead>
              <tbody>
                {appraisal.endOfYearReview?.targets && appraisal.endOfYearReview.targets.length > 0 ? (
                  <>
                    {appraisal.endOfYearReview.targets.map((target: any, idx: number) => (
                      <tr key={idx}>
                        <td className="border-2 border-gray-800 p-2 text-center">{idx + 1}</td>
                        <td className="border-2 border-gray-800 p-3 align-top">
                          {target.target || ""}
                        </td>
                        <td className="border-2 border-gray-800 p-3 align-top">
                          {target.performanceAssessment || ""}
                        </td>
                        <td className="border-2 border-gray-800 p-2 text-center">
                          {target.weightOfTarget || 5}
                        </td>
                        <td className="border-2 border-gray-800 p-2 text-center">
                          {target.score || 0}
                        </td>
                        <td className="border-2 border-gray-800 p-3 align-top">
                          {target.comments || ""}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  // Show 9 empty rows if no data
                  Array(9).fill(0).map((_, idx) => (
                    <tr key={idx}>
                      <td className="border-2 border-gray-800 p-2 text-center h-12">{idx + 1}</td>
                      <td className="border-2 border-gray-800 p-3 align-top"></td>
                      <td className="border-2 border-gray-800 p-3 align-top"></td>
                      <td className="border-2 border-gray-800 p-2 text-center">5</td>
                      <td className="border-2 border-gray-800 p-2 text-center"></td>
                      <td className="border-2 border-gray-800 p-3 align-top"></td>
                    </tr>
                  ))
                )}
                
                {/* Calculation Rows */}
                <tr>
                  <td className="border-2 border-gray-800 p-2" colSpan={3}></td>
                  <td className="border-2 border-gray-800 p-2 text-center font-bold">TOTAL (Q)</td>
                  <td className="border-2 border-gray-800 p-2 text-center font-bold">{appraisal.endOfYearReview?.calculations?.totalScore}</td>
                  {/* <td className="border-2 border-gray-800 p-2 text-center">
                    {appraisal.endOfYearReview?.calculations?.totalScore || ""}
                  </td> */}
                </tr>
                <tr>
                  <td className="border-2 border-gray-800 p-2" colSpan={3}></td>
                  <td className="border-2 border-gray-800 p-2 text-center font-bold">(A) AVERAGE (Q/n)</td>
                  <td className="border-2 border-gray-800 p-2 text-center font-bold">{appraisal.endOfYearReview?.calculations?.average}</td>
                  {/* <td className="border-2 border-gray-800 p-2 text-center">
                    {appraisal.endOfYearReview?.calculations?.average || ""}
                  </td> */}
                </tr>
                <tr>
                  <td className="border-2 border-gray-800 p-2" colSpan={3}></td>
                  <td className="border-2 border-gray-800 p-2 text-center font-bold">(M) = (A) × 0.6</td>
                  <td className="border-2 border-gray-800 p-2 text-center font-bold">{appraisal.endOfYearReview?.calculations?.finalScore}</td>
                  {/* <td className="border-2 border-gray-800 p-2 text-center">
                    {appraisal.endOfYearReview?.calculations?.finalScore || ""}
                  </td> */}
                </tr>
              </tbody>
            </table>

            {/* Signature Boxes */}
            <div className="grid grid-cols-2 gap-20 mt-6">
              <div>
                <div className="border-gray-400 pt-2 h-16 flex items-center justify-start">
                  {appraisal.endOfYearReview?.appraisee_signature_url ? (
                    <img 
                      src={appraisal.endOfYearReview.appraisee_signature_url} 
                      alt="Appraisee Signature" 
                      className="max-h-14 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm"></span>
                  )}
                </div>
                <div className="mt-2">
                  <div className="bg-orange-700 text-white px-3 py-1 text-center font-bold text-sm inline-block">
                    APPRAISEE'S SIGNATURE
                  </div>
                </div>
                <div className="mt-4 border border-gray-400 p-2 w-48">
                  <div className="bg-orange-700 text-white px-3 py-1 text-center font-bold text-sm">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center mt-1">
                    {appraisal.endOfYearReview?.appraisee_date 
                      ? new Date(appraisal.endOfYearReview.appraisee_date).toLocaleDateString()
                      : ""}
                  </div>
                </div>
              </div>
              <div>
                <div className="border-gray-400 pt-2 h-16 flex items-center justify-start">
                  {appraisal.endOfYearReview?.appraiser_signature_url ? (
                    <img 
                      src={appraisal.endOfYearReview.appraiser_signature_url} 
                      alt="Appraiser Signature" 
                      className="max-h-14 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm"></span>
                  )}
                </div>
                <div className="mt-2">
                  <div className="bg-orange-700 text-white px-3 py-1 text-center font-bold text-sm inline-block">
                    APPRAISER'S SIGNATURE
                  </div>
                </div>
                <div className="mt-4 border border-gray-400 p-2 w-48">
                  <div className="bg-orange-700 text-white px-3 py-1 text-center font-bold text-sm">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center mt-1">
                    {appraisal.endOfYearReview?.appraiser_date 
                      ? new Date(appraisal.endOfYearReview.appraiser_date).toLocaleDateString()
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between text-xs mt-2">
            <span>PUBLIC SERVICES COMMISSION, ME-SPRASG1</span>
            <span className="font-bold">STRICTLY CONFIDENTIAL</span>
            <span>PAGE 6 OF 11</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  )
}

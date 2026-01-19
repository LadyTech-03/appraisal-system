"use client"

import React, { useEffect, useState } from "react"
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
  const { user } = useAuthStore()
  const [appraisal, setAppraisal] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
  }, [appraisalId, router])

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
        <Button variant="outline" onClick={() => {
          const params = new URLSearchParams(window.location.search)
          const returnTo = params.get('returnTo')
          const step = params.get('step')
          
          if (returnTo && step) {
            router.push(`/${returnTo}?step=${step}`)
          } else {
            router.back()
          }
        }}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      </div>

      {/* Printable Form */}
      <div className="max-w-[250mm] mx-auto p-8 print:p-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-32 h-32 relative">
            <Image
              src="/logos/coat-of-arms.png"
              alt="Coat of Arms"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1 text-center px-4">
            <h1 className="text-2xl font-bold text-orange-700 uppercase">
              Public Services Performance Management
            </h1>
            <p className="text-base mt-1">
              (STAFF PERFORMANCE PLANNING, REVIEW AND APPRAISAL FORM)
            </p>
            <p className="text-base font-bold text-red-700 mt-2">
              STRICTLY CONFIDENTIAL
            </p>
          </div>
          <div className="w-32 h-32 relative">
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
                    {appraisal.periodStart ? new Date(appraisal.periodStart).toLocaleDateString("en-GB") : "_______________"}
                  </span>
                </span>
                <span className="ml-4">
                  To: (dd/mm/yyy): 
                  <span className="ml-2 underline">
                    {appraisal.periodEnd ? new Date(appraisal.periodEnd).toLocaleDateString("en-GB") : "_______________"}
                  </span>
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="flex items-center gap-4">
              <span className="font-bold">Title:</span>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={appraisal.employeeInfo?.title === "Mr"} readOnly />
                Mr.
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={appraisal.employeeInfo?.title === "Mrs"} readOnly />
                Mrs.
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={appraisal.employeeInfo?.title === "Ms"} readOnly />
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
                <span className="border-b border-gray-400 inline-block w-[80mm]">
                  {appraisal.employeeInfo?.surname || ""}
                </span>
              </div>
              <div>
                <span className="font-bold">First Name: </span>
                <span className="border-b border-gray-400 inline-block w-[80mm]">
                  {appraisal.employeeInfo?.first_name || ""}
                </span>
              </div>
            </div>

            <div>
              <span className="font-bold">Other Name(s): </span>
              <span className="border-b border-gray-400 inline-block w-[80mm]">
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
                <span className="border-b border-gray-400 inline-block w-[50mm]">
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
                  ? new Date(appraisal.employeeInfo.date_of_appointment).toLocaleDateString("en-GB")
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
                          <td className="py-2">{training.date ? new Date(training.date).toLocaleDateString("en-GB") : "___________________________"}</td>
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
                      <td className="border-2 border-gray-800 p-2 align-top min-h-32 text-sm">
                        {kra.keyResultArea || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-2 align-top min-h-32 text-sm">
                        {kra.targets || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-2 align-top min-h-32 text-sm">
                        {kra.resourcesRequired || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
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
                <div className="border border-gray-400 w-42">
                  <div className="p-1">
                    <div className="bg-orange-700 text-white px-0 py-1 text-center font-bold text-xs whitespace-nowrap">
                      APPRAISEE'S SIGNATURE
                    </div>
                  </div>
                  <div className="border-gray-400 p-1 h-12 flex items-center justify-center">
                    {appraisal.appraiseeSignature ? (
                      <img 
                        src={appraisal.appraiseeSignature} 
                        alt="Appraisee Signature" 
                        className="max-h-12 object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No signature</span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="border border-gray-400 w-42 justify-self-end">
                  <div className="p-1">
                    <div className="bg-orange-700 text-white px-0 py-1 text-center font-bold text-xs whitespace-nowrap">
                      APPRAISER'S SIGNATURE
                    </div>
                  </div>
                  <div className="border-gray-400 p-1 h-12 flex items-center justify-center">
                    {appraisal.appraiserSignature ? (
                      <img 
                        src={appraisal.appraiserSignature} 
                        alt="Appraiser Signature" 
                        className="max-h-12 object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No signature</span>
                    )}
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
                  <th className="border-2 text-sm border-gray-800 p-2 bg-gray-100 w-16">NO.</th>
                  <th className="border-2 text-sm border-gray-800 p-2 bg-gray-100">TARGET</th>
                  <th className="border-2 text-sm border-gray-800 p-2 bg-gray-100">PROGRESS REVIEW</th>
                  <th className="border-2 text-sm border-gray-800 p-2 bg-gray-100">REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {appraisal.midYearReview?.targets && appraisal.midYearReview.targets.length > 0 ? (
                  appraisal.midYearReview.targets.map((target: any, idx: number) => (
                    <tr key={idx}>
                      <td className="border-2 border-gray-800 p-2 text-center text-sm">{idx + 1}</td>
                      <td className="border-2 border-gray-800 p-2 align-top text-sm">
                        {target.description || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-2 align-top text-sm">
                        {target.progressReview || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-2 align-top text-sm">
                        {target.remarks || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  // Show 4 empty rows if no data
                  Array(4).fill(0).map((_, idx) => (
                    <tr key={idx}>
                      <td className="border-2 border-gray-800 p-2 text-center text-sm h-16">{idx + 1}</td>
                      <td className="border-2 border-gray-800 p-2 align-top text-sm"></td>
                      <td className="border-2 border-gray-800 p-2 align-top text-sm"></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Competencies Table */}
            <table className="w-full border-collapse border-2 border-gray-800 mb-6">
              <thead>
                <tr>
                  <th className="border-2 border-gray-800 text-sm p-2 bg-gray-100 w-16">NO.</th>
                  <th className="border-2 border-gray-800 text-sm p-2 bg-gray-100">COMPETENCY</th>
                  <th className="border-2 border-gray-800 text-sm p-2 bg-gray-100">PROGRESS REVIEW</th>
                  <th className="border-2 border-gray-800 text-sm p-2 bg-gray-100">REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {appraisal.midYearReview?.competencies && appraisal.midYearReview.competencies.length > 0 ? (
                  appraisal.midYearReview.competencies.map((competency: any, idx: number) => (
                    <tr key={idx}>
                      <td className="border-2 border-gray-800 p-2 text-center text-sm">{idx + 1}</td>
                      <td className="border-2 border-gray-800 p-2 align-top text-sm">
                        {competency.description || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-2 align-top text-sm">
                        {competency.progressReview || ""}
                      </td>
                      <td className="border-2 border-gray-800 p-2 align-top text-sm">
                        {competency.remarks || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  // Show 4 empty rows if no data
                  Array(4).fill(0).map((_, idx) => (
                    <tr key={idx}>
                      <td className="border-2 border-gray-800 p-2 text-center text-sm h-16">{idx + 1}</td>
                      <td className="border-2 border-gray-800 p-2 align-top text-sm"></td>
                      <td className="border-2 border-gray-800 p-2 align-top text-sm"></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Signature Boxes */}
            <div className="grid grid-cols-2 gap-20 mt-6">
              <div>
                <div className="border border-gray-400 w-42">
                  <div className="p-1">
                    <div className="bg-orange-700 text-white px-0 py-1 text-center font-bold text-xs whitespace-nowrap">
                      APPRAISEE'S SIGNATURE
                    </div>
                  </div>
                  <div className="border-gray-400 p-2 h-12 flex items-center justify-center">
                    {appraisal.midYearReview?.appraisee_signature_url ? (
                      <img 
                        src={appraisal.midYearReview.appraisee_signature_url} 
                        alt="Appraisee Signature" 
                        className="max-h-12 object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No signature</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 border border-gray-400 p-2 w-42">
                  <div className="bg-orange-700 text-white px-2 py-1 text-center font-bold text-xs">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center text-sm mt-1">
                    {appraisal.midYearReview?.appraisee_date 
                      ? new Date(appraisal.midYearReview.appraisee_date).toLocaleDateString("en-GB")
                      : ""}
                  </div>
                </div>
              </div>
              <div>
                <div className="border border-gray-400 w-42 justify-self-end">
                    <div className="p-1">
                      <div className="bg-orange-700 text-white px-0 py-1 text-center font-bold text-xs whitespace-nowrap">
                        APPRAISER'S SIGNATURE
                      </div>
                    </div>
                  <div className="border-gray-400 p-2 h-12 flex items-center justify-center">
                    {appraisal.midYearReview?.appraiser_signature_url ? (
                      <img 
                        src={appraisal.midYearReview.appraiser_signature_url} 
                        alt="Appraiser Signature" 
                        className="max-h-12 object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No signature</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 border border-gray-400 p-2 w-42 justify-self-end">
                  <div className="bg-orange-700 text-white px-0 py-1 text-center font-bold text-xs">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center text-sm mt-1">
                    {appraisal.midYearReview?.appraiser_date 
                      ? new Date(appraisal.midYearReview.appraiser_date).toLocaleDateString("en-GB")
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
                  <th className="border-2 border-gray-800 text-sm p-2 bg-gray-100 w-12">NO.</th>
                  <th className="border-2 border-gray-800 text-sm p-2 bg-gray-100">TARGET</th>
                  <th className="border-2 border-gray-800 text-sm p-2 bg-gray-100">PERFORMANCE ASSESSMENT</th>
                  <th className="border-2 border-gray-800 text-sm p-2 bg-gray-100 w-24">WEIGHT OF TARGET</th>
                  <th className="border-2 border-gray-800 text-sm p-2 bg-gray-100 w-20">SCORE</th>
                  <th className="border-2 border-gray-800 text-sm p-2 bg-gray-100">COMMENTS</th>
                </tr>
              </thead>
              <tbody>
                {appraisal.endOfYearReview?.targets && appraisal.endOfYearReview.targets.length > 0 ? (
                  <>
                    {appraisal.endOfYearReview.targets.map((target: any, idx: number) => (
                      <tr key={idx}>
                        <td className="border-2 border-gray-800 text-sm p-2 text-center">{idx + 1}</td>
                        <td className="border-2 border-gray-800 text-sm p-2 align-top">
                          {target.target || ""}
                        </td>
                        <td className="border-2 border-gray-800 text-sm p-2 align-top">
                          {target.performanceAssessment || ""}
                        </td>
                        <td className="border-2 border-gray-800 text-sm p-2 text-center">
                          {target.weightOfTarget || 5}
                        </td>
                        <td className="border-2 border-gray-800 text-sm p-2 text-center">
                          {target.score || 0}
                        </td>
                        <td className="border-2 border-gray-800 text-sm p-2 align-top">
                          {target.comments || ""}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  // Show 9 empty rows if no data
                  Array(9).fill(0).map((_, idx) => (
                    <tr key={idx}>
                      <td className="border-2 border-gray-800 text-sm p-2 text-center h-12">{idx + 1}</td>
                      <td className="border-2 border-gray-800 text-sm p-2 align-top"></td>
                      <td className="border-2 border-gray-800 text-sm p-2 align-top"></td>
                    </tr>
                  ))
                )}
                
                {/* Calculation Rows */}
                <tr>
                  <td className="border-2 border-gray-800 text-sm p-2" colSpan={3}></td>
                  <td className="border-2 border-gray-800 text-sm p-2 text-center font-bold">TOTAL (Q)</td>
                  <td className="border-2 border-gray-800 text-sm p-2 text-center font-bold">{appraisal.endOfYearReview?.calculations?.totalScore}</td>
                  {/* <td className="border-2 border-gray-800 p-2 text-center">
                    {appraisal.endOfYearReview?.calculations?.totalScore || ""}
                  </td> */}
                </tr>
                <tr>
                  <td className="border-2 border-gray-800 text-sm p-2" colSpan={3}></td>
                  <td className="border-2 border-gray-800 text-sm p-2 text-center font-bold">AVERAGE (Q/n)</td>
                  <td className="border-2 border-gray-800 text-sm p-2 text-center font-bold">{appraisal.endOfYearReview?.calculations?.average}</td>
                  {/* <td className="border-2 border-gray-800 p-2 text-center">
                    {appraisal.endOfYearReview?.calculations?.average || ""}
                  </td> */}
                </tr>
                <tr>
                  <td className="border-2 border-gray-800 text-sm p-2" colSpan={3}></td>
                  <td className="border-2 border-gray-800 text-sm p-2 text-center font-bold">(M) = (A) × 0.6</td>
                  <td className="border-2 border-gray-800 text-sm p-2 text-center font-bold">{appraisal.endOfYearReview?.calculations?.finalScore}</td>
                  {/* <td className="border-2 border-gray-800 p-2 text-center">
                    {appraisal.endOfYearReview?.calculations?.finalScore || ""}
                  </td> */}
                </tr>
              </tbody>
            </table>

            {/* Signature Boxes */}
            <div className="grid grid-cols-2 gap-20 mt-6">
              <div>
                <div className="border border-gray-400 w-42">
                  <div className="p-1">
                    <div className="bg-orange-700 text-white px-0 py-1 text-center font-bold text-xs whitespace-nowrap">
                      APPRAISEE'S SIGNATURE
                    </div>
                  </div>
                  <div className="border-gray-400 p-2 h-12 flex items-center justify-center">
                    {appraisal.endOfYearReview?.appraisee_signature_url ? (
                      <img 
                        src={appraisal.endOfYearReview.appraisee_signature_url} 
                        alt="Appraisee Signature" 
                        className="max-h-12 object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No signature</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 border border-gray-400 p-2 w-42">
                  <div className="bg-orange-700 text-white px-2 py-1 text-center font-bold text-xs">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center text-sm mt-1">
                    {appraisal.endOfYearReview?.appraisee_date 
                      ? new Date(appraisal.endOfYearReview.appraisee_date).toLocaleDateString("en-GB")
                      : ""}
                  </div>
                </div>
              </div>
              <div>
                <div className="border border-gray-400 w-42 justify-self-end">
                    <div className="p-1">
                      <div className="bg-orange-700 text-white px-0 py-1 text-center font-bold text-xs whitespace-nowrap">
                        APPRAISER'S SIGNATURE
                      </div>
                    </div>
                  <div className="border-gray-400 p-2 h-12 flex items-center justify-center">
                    {appraisal.endOfYearReview?.appraiser_signature_url ? (
                      <img 
                        src={appraisal.endOfYearReview.appraiser_signature_url} 
                        alt="Appraiser Signature" 
                        className="max-h-12 object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No signature</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 border border-gray-400 p-2 w-42 justify-self-end">
                  <div className="bg-orange-700 text-white px-0 py-1 text-center font-bold text-xs">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center text-sm mt-1">
                    {appraisal.endOfYearReview?.appraiser_date 
                      ? new Date(appraisal.endOfYearReview.appraiser_date).toLocaleDateString("en-GB")
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

        {/* SECTION 5: Annual Appraisal */}
        <div className="mb-6 page-break">
          <div className="bg-orange-700 text-white px-3 py-2 font-bold">
            SECTION 5: Annual Appraisal
          </div>
          <div className="border border-gray-400 p-4">
            {/* Core Competencies */}
            <div className="mb-6">
              <p className="font-bold text-sm mb-3 underline">A/. CORE COMPETENCIES</p>
              
              {/* Table Header */}
              <table className="w-full border-collapse border-2 border-gray-800 text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-gray-800 p-2 text-left">Competency</th>
                    <th className="border-2 border-gray-800 p-2 w-16 text-center">(W) Weight</th>
                    <th className="border-2 border-gray-800 p-2 w-16 text-center">(S) Score</th>
                    <th className="border-2 border-gray-800 p-2 w-16 text-center">W × S</th>
                    <th className="border-2 border-gray-800 p-2">COMMENTS</th>
                  </tr>
                </thead>
                <tbody>
                  {appraisal.coreCompetencies && appraisal.coreCompetencies.length > 0 ? (
                    appraisal.coreCompetencies.map((category: any, catIdx: number) => (
                      <React.Fragment key={catIdx}>
                        {/* Category Name Row */}
                        <tr>
                          <td 
                            colSpan={5} 
                            className="border-2 border-gray-800 p-2 font-bold bg-gray-50"
                          >
                            {category.name}
                          </td>
                        </tr>
                        {/* Category Items */}
                        {category.items?.map((item: any, itemIdx: number) => (
                          <tr key={itemIdx}>
                            <td className="border-2 border-gray-800 p-2">{item.description}</td>
                            <td className="border-2 border-gray-800 p-2 text-center">{item.weight}</td>
                            <td className="border-2 border-gray-800 p-2 text-center">{item.score}</td>
                            <td className="border-2 border-gray-800 p-2 text-center">
                              {item.weightedScore?.toFixed(2) || (item.weight * item.score).toFixed(2)}
                            </td>
                            <td className="border-2 border-gray-800 p-2">{item.comments || ""}</td>
                          </tr>
                        ))}
                        {/* Category Total Row */}
                        <tr className="bg-gray-100 font-semibold">
                          <td className="border-2 border-gray-800 p-2" colSpan={3}>
                            Total / Average
                          </td>
                          <td className="border-2 border-gray-800 p-2 text-center">
                            {category.total?.toFixed(2) || "0.00"}
                          </td>
                          <td className="border-2 border-gray-800 p-2">
                            Average: {category.average?.toFixed(2) || "0.00"}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="border-2 border-gray-800 p-4 text-center text-gray-400">
                        No core competencies data
                      </td>
                    </tr>
                  )}
                  {/* Core Competencies Overall Average */}
                  <tr className="bg-blue-100 font-bold">
                    <td colSpan={3} className="border-2 border-gray-800 p-2">
                      Average of ALL averages for CORE COMPETENCIES (N) =
                    </td>
                    <td colSpan={2} className="border-2 border-gray-800 p-2 text-right">
                      {(appraisal.coreCompetencies?.map((category: any) => category.average)).reduce((a: any, b: any) => a + b, 0).toFixed(2) || "0.00"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Non-Core Competencies */}
            <div className="mb-6">
              <p className="font-bold text-sm mb-3 underline">B. NON-CORE COMPETENCIES</p>
              
              {/* Table Header */}
              <table className="w-full border-collapse border-2 border-gray-800 text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-gray-800 p-2 text-left">Competency</th>
                    <th className="border-2 border-gray-800 p-2 w-16 text-center">(W) Weight</th>
                    <th className="border-2 border-gray-800 p-2 w-16 text-center">(S) Score</th>
                    <th className="border-2 border-gray-800 p-2 w-16 text-center">W × S</th>
                    <th className="border-2 border-gray-800 p-2">COMMENTS</th>
                  </tr>
                </thead>
                <tbody>
                  {appraisal.nonCoreCompetencies && appraisal.nonCoreCompetencies.length > 0 ? (
                    appraisal.nonCoreCompetencies.map((category: any, catIdx: number) => (
                      <React.Fragment key={catIdx}>
                        {/* Category Name Row */}
                        <tr>
                          <td 
                            colSpan={5} 
                            className="border-2 border-gray-800 p-2 font-bold bg-gray-50"
                          >
                            {category.name}
                          </td>
                        </tr>
                        {/* Category Items */}
                        {category.items?.map((item: any, itemIdx: number) => (
                          <tr key={itemIdx}>
                            <td className="border-2 border-gray-800 p-2">{item.description}</td>
                            <td className="border-2 border-gray-800 p-2 text-center">{item.weight}</td>
                            <td className="border-2 border-gray-800 p-2 text-center">{item.score}</td>
                            <td className="border-2 border-gray-800 p-2 text-center">
                              {item.weightedScore?.toFixed(2) || (item.weight * item.score).toFixed(2)}
                            </td>
                            <td className="border-2 border-gray-800 p-2">{item.comments || ""}</td>
                          </tr>
                        ))}
                        {/* Category Total Row */}
                        <tr className="bg-gray-100 font-semibold">
                          <td className="border-2 border-gray-800 p-2" colSpan={3}>
                            Total / Average
                          </td>
                          <td className="border-2 border-gray-800 p-2 text-center">
                            {category.total?.toFixed(2) || "0.00"}
                          </td>
                          <td className="border-2 border-gray-800 p-2">
                            Average: {category.average?.toFixed(2) || "0.00"}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="border-2 border-gray-800 p-4 text-center text-gray-400">
                        No non-core competencies data
                      </td>
                    </tr>
                  )}
                  {/* Non-Core Competencies Overall Average */}
                  <tr className="bg-blue-100 font-bold">
                    <td colSpan={3} className="border-2 border-gray-800 p-2">
                      Average of ALL averages for NON-CORE COMPETENCIES (O) =
                    </td>
                    <td colSpan={2} className="border-2 border-gray-800 p-2 text-right">
                      {(appraisal.nonCoreCompetencies?.map((category: any) => category.average)).reduce((a: any, b: any) => a + b, 0).toFixed(2) || "0.00"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Overall Assessment */}
            <div className="mb-6 p-4 bg-gray-50 border-2 border-gray-800">
              <p className="font-bold text-base mb-4 underline">OVERALL ASSESSMENT</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center border-b border-gray-400 pb-2">
                  <span className="font-semibold">PERFORMANCE ASSESSMENT (M)</span>
                  <span className="font-bold">
                    = {appraisal.overallAssessment?.performance_assessment_score || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-400 pb-2">
                  <span className="font-semibold">CORE COMPETENCIES ASSESSMENT (N)</span>
                  <span className="font-bold">
                    = {appraisal.overallAssessment?.core_competencies_average || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-400 pb-2">
                  <span className="font-semibold">NON-CORE COMPETENCIES ASSESSMENT (O)</span>
                  <span className="font-bold">
                    = {appraisal.overallAssessment?.non_core_competencies_average || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t-2 border-gray-800 pt-2 mt-3">
                  <span className="font-bold text-base">OVERALL TOTAL</span>
                  <span className="font-bold text-base">
                    = {appraisal.overallAssessment?.overall_total || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 bg-blue-100 p-3 rounded">
                  <span className="font-bold text-base">OVERALL ASSESSMENT/SCORE (Z) = T/5 X 100</span>
                  <span className="font-bold text-lg text-primary">
                    = {appraisal.overallAssessment?.overall_score_percentage || "0"}%
                  </span>
                </div>
              </div>
            </div>

            {/* Signature Box */}
            <div className="grid grid-cols-2 gap-20 mt-6">
              <div>
                <div className="border border-gray-400 w-42">
                  <div className="p-1">
                    <div className="bg-orange-700 text-white px-0 py-1 text-center font-bold text-xs whitespace-nowrap">
                      APPRAISER'S SIGNATURE
                    </div>
                  </div>
                  <div className="border-gray-400 p-2 h-12 flex items-center justify-center">
                    {appraisal.appraiserSignature ? (
                      <img 
                        src={appraisal.appraiserSignature}
                        alt="Appraisee Signature" 
                        className="max-h-12 object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No signature</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 border border-gray-400 p-2 w-42">
                  <div className="bg-orange-700 text-white px-2 py-1 text-center font-bold text-xs">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center text-sm mt-1">
                    {appraisal.overallAssessment?.appraiser_date 
                    ? new Date(appraisal.overallAssessment.appraiser_date).toLocaleDateString()
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
            <span>PAGE 7-8 OF 11</span>
          </div>
        </div>

        {/* SECTION 6: Appraiser's Comments */}
        <div className="mb-6 page-break">
          <div className="bg-orange-700 text-white px-3 py-2 font-bold">
            SECTION 6: Annual Appraisal
          </div>
          <div className="border border-gray-400 p-4">
            <p className="font-bold text-sm mb-3">
              Appraiser's Comments on Performance Plan Achievements
            </p>
            <p className="text-xs text-gray-600 mb-3 italic">
              (Comment on Performance Plan achievements and additional contributions made)
            </p>
            
            <div className="border-2 border-gray-800 p-4 min-h-40 whitespace-pre-wrap text-sm">
              {appraisal.appraiserComments || ""}
            </div>

            {/* Signature Box */}
            <div className="grid grid-cols-2 gap-20 mt-6">
              <div>
                <div className="border border-gray-400 w-42">
                  <div className="p-1">
                    <div className="bg-orange-700 text-white px-0 py-1 text-center font-bold text-xs whitespace-nowrap">
                      APPRAISER'S SIGNATURE
                    </div>
                  </div>
                  <div className="border-gray-400 p-2 h-12 flex items-center justify-center">
                    {appraisal.appraiserSignature ? (
                      <img 
                        src={appraisal.appraiserSignature} 
                        alt="Appraisee Signature" 
                        className="max-h-12 object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No signature</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 border border-gray-400 p-2 w-42">
                  <div className="bg-orange-700 text-white px-2 py-1 text-center font-bold text-xs">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center text-sm mt-1">
                    {appraisal.appraiserComments?.appraiser_date 
                      ? new Date(appraisal.appraiserComments.appraiser_date).toLocaleDateString("en-GB")
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
            <span>PAGE 9 OF 11</span>
          </div>
        </div>

        {/* SECTION 7: Career Development */}
        <div className="mb-6">
          <div className="bg-orange-700 text-white px-3 py-2 font-bold">
            SECTION 7: Career Development
          </div>
          <div className="border border-gray-400 p-4">
            <p className="font-bold text-sm mb-3 underline">
              Training and Development - Comments and Plan
            </p>
            <p className="text-xs text-gray-600 mb-3 italic">
              (To be completed by the Appraiser in discussion with the employee)
            </p>
            
            <div className="border-2 border-gray-800 p-4 min-h-32 whitespace-pre-wrap text-sm">
              {appraisal.careerDevelopmentComments || ""}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between text-xs mt-2">
            <span>PUBLIC SERVICES COMMISSION, ME-SPRASG1</span>
            <span className="font-bold">STRICTLY CONFIDENTIAL</span>
            <span>PAGE 9 OF 11</span>
          </div>
        </div>

        {/* SECTION 8: Assessment Decision */}
        <div className="mb-6 page-break">
          <div className="bg-orange-700 text-white px-3 py-2 font-bold">
            SECTION 8: ASSESSMENT DECISION
          </div>
          <div className="border border-gray-400 p-4">
            <p className="text-sm mb-4">
              Assess the Appraisee's potential to perform the duties of the next grade, taking account of the assessment of performance in <strong>Section 5</strong> above.
            </p>

            <div className="space-y-3">
              {[
                { value: "5", label: "Outstanding", desc: "should be promoted as soon as possible (promotion out-of-turn, study visits, commendations, salary increments and etc.)" },
                { value: "4", label: "Suitable for promotion", desc: "(encourage through mentoring, coaching, training and etc.)" },
                { value: "3", label: "Likely to be ready for promotion in 2 to 3 years", desc: "(encourage through mentoring, coaching, training and etc)" },
                { value: "2", label: "Not ready for promotion for at least 3years", desc: "(forfeit yearly increment, reassignment and etc.)" },
                { value: "1", label: "Unlikely to be promoted further:", desc: "(apply sanctions: demotion, dismissal, removal and etc)" }
              ].map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-2">
                  <div className="flex items-center h-5">
                    <div className={`w-4 h-4 rounded-full border-2 ${appraisal.assessmentDecision === option.value ? 'bg-orange-700 border-orange-700' : 'border-gray-400'}`}>
                      {appraisal.assessmentDecision === option.value && (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">✓</div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm flex-1">
                    <span className="font-semibold">{option.label}</span> - {option.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between text-xs mt-2">
            <span>PUBLIC SERVICES COMMISSION, ME-SPRASG1</span>
            <span className="font-bold">STRICTLY CONFIDENTIAL</span>
            <span>PAGE 10 OF 11</span>
          </div>
        </div>

        {/* SECTION 9: Appraisee's Comments */}
        <div className="mb-6">
          <div className="bg-orange-700 text-white px-3 py-2 font-bold">
            SECTION 9: Appraisee's Comments
          </div>
          <div className="border border-gray-400 p-4">
            <div className="border-2 border-gray-800 p-4 min-h-32 whitespace-pre-wrap text-sm mb-6">
              {appraisal.appraiseeComments || ""}
            </div>

            {/* Signature Box */}
            <div className="grid grid-cols-2 gap-20 mt-6">
              <div>
                <div className="border border-gray-400 w-42">
                  <div className="p-1">
                    <div className="bg-orange-700 text-white px-0 py-1 text-center font-bold text-xs whitespace-nowrap">
                      APPRAISEE'S SIGNATURE
                    </div>
                  </div>
                  <div className="border-gray-400 p-2 h-12 flex items-center justify-center">
                    {appraisal.appraiseeSignature ? (
                      <img 
                        src={appraisal.appraiseeSignature} 
                        alt="Appraisee Signature" 
                        className="max-h-12 object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm"></span>
                    )}
                  </div>
                </div>
                <div className="mt-4 border border-gray-400 p-2 w-42">
                  <div className="bg-orange-700 text-white px-2 py-1 text-center font-bold text-xs">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center text-sm mt-1">
                    {appraisal.createdAt 
                      ? new Date(appraisal.createdAt).toLocaleDateString("en-GB")
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
            <span>PAGE 11 OF 11</span>
          </div>
        </div>

        {/* SECTION 10: HOD Comments */}
        <div className="mb-6 page-break">
          <div className="bg-orange-700 text-white px-3 py-2 font-bold">
            SECTION 10: Head of Department's / Division's (HOD) Comments
          </div>
          <div className="border border-gray-400 p-4">
            <div className="border-2 border-gray-800 p-4 min-h-48 whitespace-pre-wrap text-sm mb-6">
              {appraisal.hodComments || ""}
            </div>

            {/* HOD Name and Date */}
            <div className="grid grid-cols-2 gap-20 mt-6">
              <div>
                <div className="border border-gray-400 p-3">
                  <div className="bg-orange-700 text-white px-2 py-1 text-center font-bold text-xs mb-2">
                    NAME AND HOD'S SIGNATURE
                  </div>
                  <div className="text-sm text-center font-medium">
                    {appraisal.hodName || ""}
                  </div>
                  <div className="">
                    {appraisal.hodSignature && (
                    <img 
                        src={appraisal.hodSignature} 
                        alt="HOD Signature" 
                        className="max-h-12 object-contain justify-self-center"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="border border-gray-400 p-2 w-42 justify-self-end">
                  <div className="bg-orange-700 text-white px-2 py-1 text-center font-bold text-xs">
                    DATE (dd/mm/yyyy)
                  </div>
                  <div className="text-center text-sm mt-1">
                    {appraisal.hodDate 
                      ? new Date(appraisal.hodDate).toLocaleDateString("en-GB")
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
            <span>PAGE 12 OF 12</span>
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

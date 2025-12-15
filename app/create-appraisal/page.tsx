"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { AppraiseePersonalInfoForm } from "@/components/appraisee-personal-info-form"
import { PerformancePlanningForm } from "@/components/performance-planning-form"
import { MidYearReviewForm } from "@/components/mid-year-review-form"
import { EndYearReviewForm } from "@/components/end-year-review-form"
import { AnnualAppraisalForm } from "@/components/annual-appraisal-form"
import { FinalSectionsForm } from "@/components/final-sections-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Info } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const steps = [
  { id: 'personal-info', name: 'Personal Information', status: 'personalInfo' },
  { id: 'performance-planning', name: 'Performance Planning', status: 'performancePlanning' },
  { id: 'mid-year-review', name: 'Mid Year Review', status: 'midYearReview' },
  { id: 'end-year-review', name: 'End Year Review', status: 'endYearReview' },
  // { id: 'annual-appraisal', name: 'Annual Appraisal', status: 'annualAppraisal' },
  { id: 'final-sections', name: 'Final Sections', status: 'finalSections' },
]

export default function CreateAppraisalPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated } = useAuthStore()
  const [currentStep, setCurrentStep] = useState<'personal-info' | 'performance-planning' | 'mid-year-review' | 'end-year-review' | 'annual-appraisal' | 'final-sections'>('personal-info')
  const [appraisalData, setAppraisalData] = useState<any>({
    personalInfo: null,
    performancePlanning: null,
    midYearReview: null,
    endYearReview: null,
    annualAppraisal: null,
    finalSections: null
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
  }, [isAuthenticated, router])

  // Check for step parameter in URL
  useEffect(() => {
    const stepParam = searchParams.get('step')
    if (stepParam) {
      const stepMap: { [key: string]: typeof currentStep } = {
        '1': 'personal-info',
        '2': 'performance-planning',
        '3': 'mid-year-review',
        '4': 'end-year-review',
        '5': 'final-sections',
      }
      const step = stepMap[stepParam]
      if (step) {
        setCurrentStep(step)
      }
    }
  }, [searchParams])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
      </div>
    )
  }

  const handlePersonalInfoNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, personalInfo: data }))
    setCurrentStep('performance-planning')
  }

  const handlePerformancePlanningNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, performancePlanning: data }))
    setCurrentStep('mid-year-review')
  }

  const handleMidYearReviewNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, midYearReview: data }))
    setCurrentStep('end-year-review')
  }

  const handleEndYearReviewNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, endYearReview: data }))
    if(data.isReviewMode){
      setCurrentStep('annual-appraisal')
    }else{
      setCurrentStep('final-sections')
    }
  }

  const handleAnnualAppraisalNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, annualAppraisal: data }))
    setCurrentStep('final-sections')
  }

  const handleFinalSectionsNext = (data: any) => {
    setAppraisalData((prev: any) => ({ ...prev, finalSections: data }))
    // Final submission - redirect to appraisals page
    router.push("/appraisals")
  }

  const handleBackToPersonalInfo = () => {
    setCurrentStep('personal-info')
  }

  const handleBackToPerformancePlanning = () => {
    setCurrentStep('performance-planning')
  }

  const handleBackToMidYearReview = () => {
    setCurrentStep('mid-year-review')
  }

  const handleBackToEndYearReview = () => {
    setCurrentStep('end-year-review')
  }

  const handleBackToAnnualAppraisal = () => {
    setCurrentStep('annual-appraisal')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">Create New Appraisal</h1>
                <p className="text-muted-foreground">
                  {currentStep === 'personal-info' 
                    ? "Fill in the appraisee's personal information to start the appraisal process"
                    : currentStep === 'performance-planning'
                    ? "Define performance goals and key result areas for the appraisal period"
                    : currentStep === 'mid-year-review'
                    ? "Review progress on targets and competencies at mid-year"
                    : currentStep === 'end-year-review'
                    ? "Evaluate performance against targets and calculate final scores"
                    : currentStep === 'annual-appraisal'
                    ? "Assess core and non-core competencies for overall performance rating"
                    : "Complete final sections including comments, career development, and assessment decision"
                  }
                </p>
              </div>
            </div>

          </div>

          {/* Progress Indicator */}
          <div className="max-w-full mx-auto flex flex-wrap items-center gap-4 justify-center ">
            {steps.map((step)=>(
              <div key={step.id} className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentStep === step.id 
                  ? 'bg-primary text-primary-foreground' 
                  : appraisalData[step.status] 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-gray-200 text-gray-600'
              }`}>
                <span className="w-6 h-6 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                  {appraisalData[step.status] ? <Check className="w-4 h-4 text-white" /> : '1'}
                </span>  
                <span>{step.name}</span>
              </div>
            ))}
          </div>

            <div className="flex p-6 space-y-6">
              {/* Form Content */}
              {currentStep === 'personal-info' ? (
                <AppraiseePersonalInfoForm 
                onNext={handlePersonalInfoNext} 
                onBack={handleBackToPersonalInfo}
                />
              ) : currentStep === 'performance-planning' ? (
                <PerformancePlanningForm 
                  onNext={handlePerformancePlanningNext}
                  onBack={handleBackToPersonalInfo}
                />
              ) : currentStep === 'mid-year-review' ? (
                <MidYearReviewForm 
                  onNext={handleMidYearReviewNext}
                  onBack={handleBackToPerformancePlanning}
                />
              ) : currentStep === 'end-year-review' ? (
                <EndYearReviewForm 
                  onNext={handleEndYearReviewNext}
                  onBack={handleBackToMidYearReview}
                />
              ) : currentStep === 'annual-appraisal' ? (
                <AnnualAppraisalForm 
                  onNext={handleAnnualAppraisalNext}
                  onBack={handleBackToEndYearReview}
                />
              ) : (
                <FinalSectionsForm 
                  onNext={handleFinalSectionsNext}
                  onBack={handleBackToEndYearReview}
                />
              )}

              {/* Guidance Notes Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="bg-primary text-white font-bold">
                    <Info className="h-5 w-5 font-bold" />
                    GUIDE NOTES
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-[800px] overflow-y-auto p-4">
                  <SheetHeader className="border-b pb-4 mb-6">
                    <SheetTitle className="text-2xl font-bold">Guidance Notes</SheetTitle>
                    <SheetDescription className="text-base">
                      Completion of Staff Performance Management Form
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-8 pb-6 text-gray-800">
                    {/* Introduction */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2">Introduction</h3>
                      <p className="text-justify leading-relaxed">
                        The Performance Management System is designed to evaluate how well you are doing in your present position in relation to results achieved within the period of appraisal to enable the organization to achieve its goals and objectives. The Performance Management System is also aimed at assisting you to improve upon your performance and ensure your career development.
                      </p>
                      <p className="text-justify leading-relaxed">
                        The Performance Management System is an annual cycle involving four key phases. All members of Staff/Heads of Divisions, Departments/Units and Appraisers should read the Guidelines below before filling the Form.
                      </p>
                    </div>

                    {/* Four Phases */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2">The Four Phases</h3>
                      
                      <div className="space-y-3 pl-4">
                        <div>
                          <h4 className="font-semibold">Phase One – Performance Planning</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Planning and setting of individual performance targets through work plans derived from the organisation's strategic plans and objectives set at the corporate, divisional, departmental and unit levels. The target setting process must be a top-down approach; preferably the first two weeks in January should serve as the period of setting of targets for the year.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Phase Two – Progress Reviews</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Discussion and communication between appraiser and appraisee on progress of work, and adjustment of targets if necessary, through the provision of formal feedback.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Phase Three – Review and Appraisal</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Evaluation of appraisee's performance at the end of the performance management period.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold">Phase Four – Decision-Making</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Deciding on courses of action, i.e. recognition/reward, training plans, promotion prospects, career development plans and counselling and sanctions.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 border-gray-200 my-6"></div>

                    {/* Performance Planning Details */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 uppercase">Performance Planning</h3>
                      <p className="text-justify leading-relaxed">
                        Performance Planning is the process of defining an employee's job and setting performance expectations for the annual review. It is important that you involve your appraiser and use her/his input in setting targets to ensure ownership by the appraisee. The process consists of three steps included on the appraisal form (all in Section 2):
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Key results areas</li>
                        <li>Targets</li>
                        <li>Resources required</li>
                      </ul>
                      <p className="text-sm italic text-gray-600">
                        For example, you will define the overall requirements of the job by identifying three to five key results areas.
                      </p>
                      
                      <div className="space-y-4 mt-4 pl-4">
                        <div>
                          <h4 className="font-semibold mb-2">Stage 1 - Before the Meeting</h4>
                          <ul className="space-y-1 text-sm pl-4">
                            <li>• Step 1: Appraiser and Appraisee identify key results areas</li>
                            <li>• Step 2: Appraiser and Appraisee identify targets</li>
                            <li>• Step 3: Appraiser and Appraisee should exchange notes</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Stage 2 - During the Meeting</h4>
                          <ul className="space-y-1 text-sm pl-4">
                            <li>• Step 1: Appraiser and Appraisee discuss and agree on key result areas identified for the appraisee</li>
                            <li>• Step 2: Appraiser and Appraisee discuss and agree on targets</li>
                            <li>• Step 3: Appraiser explains competencies as in Section 5</li>
                            <li>• Step 4: Appraiser and Appraisee discuss key resources required for the attainment of targets</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Stage 3 – After the Meeting</h4>
                          <ul className="space-y-1 text-sm pl-4">
                            <li>• Step 1: Appraiser fills out the Performance Planning Form</li>
                            <li>• Step 2: Appraiser and Appraisee sign the Performance Planning Form</li>
                            <li>• Step 3: Appraiser gives a copy of the page to the appraisee and returns the original document to the HR.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Progress Review Process */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 uppercase">Progress Review Process</h3>
                      <h4 className="font-semibold">The Progress Review Meeting</h4>
                      <p className="text-justify leading-relaxed">
                        The Progress review Stage of the performance appraisal cycle provides a formal mechanism by which appraisers and appraisee meet to review progress on targets. The appraiser will arrange a mid-year progress review meeting in July. At least a week's notice must be given to the appraisee specifying the date, time and place of the meeting. The review process should be as follows:
                      </p>
                      <ol className="space-y-2 pl-6 text-sm">
                        <li className="leading-relaxed">
                          <span className="font-medium">i.</span> Appraiser and appraisee discuss progress of work in relation to targets set, one target after the other. If conclusions are reached at the meeting about necessary changes or adjustments in targets, these modifications should be specified on the mid-year review form.
                        </li>
                        <li className="leading-relaxed">
                          <span className="font-medium">ii.</span> Appraiser and appraisee discuss the extent to which competencies are being demonstrated; one competency after the other.
                        </li>
                        <li className="leading-relaxed">
                          <span className="font-medium">iii.</span> Appraiser and appraisee agree on additions and deletions to targets and modifications where necessary.
                        </li>
                        <li className="leading-relaxed">
                          <span className="font-medium">iv.</span> Appraiser records the changes if any and comments on the Mid-year Review Form.
                        </li>
                        <li className="leading-relaxed">
                          <span className="font-medium">v.</span> Appraiser and appraisee sign the Mid-Year Review Form.
                        </li>
                        <li className="leading-relaxed">
                          <span className="font-medium">vi.</span> Appraiser and appraisee take copies and the original document sent to the HR.
                        </li>
                      </ol>
                    </div>

                    {/* End of Year Review */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 uppercase">The End-of-Year Review and Appraisal Process</h3>
                      <h4 className="font-semibold">The End-of-Year Review and Appraisal Meeting</h4>
                      <p className="text-justify leading-relaxed">
                        The End-of-Year Review and Appraisal Process shall span the period of December 1<sup>st</sup> to December 31<sup>st</sup>. The process is in three parts, namely before the interview, during the interview and after the interview.
                      </p>
                      
                      <div className="space-y-4 pl-4">
                        <div>
                          <h4 className="font-semibold mb-2">Stage 1 - Before the Meeting</h4>
                          <ul className="space-y-1 text-sm pl-4">
                            <li>• Step 1 – Appraiser should give at least one week notice to the Appraisee of the meeting.</li>
                            <li>• Step 2 – Appraiser should write down on a separate sheet appraisee's performance in terms of targets achieved and not achieved and give reasons.</li>
                            <li>• Step 3 – Appraiser should write down appraisees performance in terms of competencies demonstrated and not demonstrated and give reasons.</li>
                            <li>• Step 4 – The appraisee should review his/her performance and list the main achievements.</li>
                            <li>• Step 5 – The appraisee should prepare for the discussion with the appraiser.</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Stage 2 - During the Meeting</h4>
                          <ul className="space-y-1 text-sm pl-4">
                            <li>• Step 1 – The appraiser should welcome the appraisee and state the purpose of the meeting.</li>
                            <li>• Step 2 – The appraiser should discuss the targets achieved one after the other.</li>
                            <li>• Step 3 – The appraiser should discuss targets not achieved one after the other.</li>
                            <li>• Step 4 – The appraiser should discuss the competencies demonstrated one after the other.</li>
                            <li>• Step 5 – The appraiser should discuss the competencies not demonstrated one after the other.</li>
                            <li>• Step 6 – The appraiser should summarise his / her observations and communicate them to the appraisee.</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Stage 3 - After the Meeting</h4>
                          <ul className="space-y-1 text-sm pl-4">
                            <li>• Step 1 – The appraiser fills the form within three working days.</li>
                            <li>• Step 2 – The appraiser invites the appraisee to read, provide comments on the appraisal and sign the End-of-Year Review Form (Section 7).</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Decision Making */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 uppercase">Decision-Making</h3>
                      <p className="text-justify leading-relaxed">
                        Performance Improvement or Enhancement plan is put in place by an autonomous body at the Human Resources Division to identify and list ways to enhance performance as well as any training/development or new challenges sought. The phase also involves management ensuring that a plan of action is carried out such as coaching, counselling, salary increase, bonus and training programmes, which the employee will need during the next twelve months to continue growth, to develop new skills, and/or to improve various aspects of job performance.
                      </p>
                    </div>

                    <div className="border-t-2 border-gray-200 my-6"></div>

                    {/* Annual Appraisal - Overall Rating */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-2 uppercase">Annual Appraisal - Overall Ratings and Descriptions</h3>
                      
                      <p className="text-sm leading-relaxed">
                        The table below provides explanations for overall rating and descriptions
                      </p>

                      {/* Ratings Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 p-2 text-left font-semibold w-12">Score</th>
                              <th className="border border-gray-300 p-2 text-left font-semibold w-40">Rating</th>
                              <th className="border border-gray-300 p-2 text-left font-semibold">Description</th>
                              <th className="border border-gray-300 p-2 text-left font-semibold w-48">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 p-2 align-top">5</td>
                              <td className="border border-gray-300 p-2 align-top">Exceptional, exceeded expectations</td>
                              <td className="border border-gray-300 p-2 align-top">
                                Behavioural competencies and/or work performance consistently far exceeded expectations due to exceptional quality of work performed in all <em>essential</em> areas of responsibility, resulting in an overall quality of work that was superior, and either led to the completion of a major goal or project, or made an exceptional or unique contribution in support of unit, department, or organizational objectives. The employee fully stands out and clearly and consistently demonstrates exceptional accomplishments in terms of quality and quantity of work. His/her demonstration of competencies is easily recognized as truly exceptional by others.
                              </td>
                              <td className="border border-gray-300 p-2 align-top italic">
                                There are not less than four (4) particular cases that can be cited to support the rating.
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2 align-top">4</td>
                              <td className="border border-gray-300 p-2 align-top">Exceeded Expectations</td>
                              <td className="border border-gray-300 p-2 align-top">
                                Demonstration of behavioural competencies and work performance consistently exceeded expectations in most areas of responsibility, and the quality of work overall was excellent. Achievement was regularly above expected level. Performance is sustained and uniformly high with thorough and on time results. Annual goals were met above expectation.
                              </td>
                              <td className="border border-gray-300 p-2 align-top italic">
                                There are not less than three (3) particular cases that can be cited to support the rating.
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2 align-top">3</td>
                              <td className="border border-gray-300 p-2 align-top">Met all Expectations</td>
                              <td className="border border-gray-300 p-2 align-top">
                                Behavioural competencies and/or work performance consistently fully met expectations in all essential areas of responsibility, and the quality of work overall was very good. While minor deviations may occur, the overall level of performance meets all requirements. The worker has achieved all critical annual goals.
                              </td>
                              <td className="border border-gray-300 p-2 align-top italic">
                                Performance met the expected standards.
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2 align-top">2</td>
                              <td className="border border-gray-300 p-2 align-top">Below Expectation</td>
                              <td className="border border-gray-300 p-2 align-top">
                                Behavioural competencies and/or work performance did not consistently meet expectations – performance failed to meet expectations in one or more <em>essential</em> areas of responsibility, and/or some of the most critical goals were not met. The employee generally struggles to fully meet expectations.
                              </td>
                              <td className="border border-gray-300 p-2 align-top italic">
                                Performance fell short of expected standards. There are not less than two (2) particular cases that can be cited to support the rating.
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2 align-top">1</td>
                              <td className="border border-gray-300 p-2 align-top">Unacceptable</td>
                              <td className="border border-gray-300 p-2 align-top">
                                Behavioural competencies and/or work performance was consistently below expectations in one or more of the most essential areas of responsibility, and/or reasonable progress toward critical goals was not made. Significant improvement is needed in three or more important areas. The employee is not meeting the job requirements. Performance must improve substantially within a reason able period of time if the individual is to remain in this position.
                              </td>
                              <td className="border border-gray-300 p-2 align-top italic">
                                Failed to meet performance standards. There are not less than three (3) particular cases that can be cited to support the rating.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Rating Scale */}
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">OVERALL RATING SCALE</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-300 text-sm">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-center font-semibold">Score</th>
                                <th className="border border-gray-300 p-2 text-center font-semibold">80% above<br/>5</th>
                                <th className="border border-gray-300 p-2 text-center font-semibold">79-65 %<br/>4</th>
                                <th className="border border-gray-300 p-2 text-center font-semibold">64-50%<br/>3</th>
                                <th className="border border-gray-300 p-2 text-center font-semibold">49-41%<br/>2</th>
                                <th className="border border-gray-300 p-2 text-center font-semibold">40% & below<br/>1</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-gray-300 p-2 font-semibold">Rating</td>
                                <td className="border border-gray-300 p-2 text-center">Exceptional, exceeded expectations</td>
                                <td className="border border-gray-300 p-2 text-center">Exceeded Expectations</td>
                                <td className="border border-gray-300 p-2 text-center">Met all Expectations</td>
                                <td className="border border-gray-300 p-2 text-center">Below Expectation</td>
                                <td className="border border-gray-300 p-2 text-center">Unacceptable</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </main>
      </div>
    </div>
  )
}


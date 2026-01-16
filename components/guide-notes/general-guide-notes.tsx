"use client"

import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function GeneralGuideNotes() {
    return (
        <div className="space-y-8 p-6 text-sm text-gray-800  mb-20 w-[700px]">
            {/* Introduction */}
            <div className="space-y-3">
                <h3 className="font-bold text-lg border-b-2 border-slate-300 pb-2">Completion of Staff Performance Management Form</h3>
                <p className="text-justify leading-relaxed">
                    The Performance Management System is designed to evaluate how well you are doing in your present position in relation to results achieved within the period of appraisal to enable the organization to achieve its goals and objectives. The Performance Management System is also aimed at assisting you to improve upon your performance and ensure your career development.
                </p>
                <p className="text-justify leading-relaxed">
                    The Performance Management System is an annual cycle involving four key phases. All members of Staff/Heads of Divisions, Departments/Units and Appraisers should read the Guidelines below before filling the Form.
                </p>
            </div>

            {/* Four Phases */}
            <div className="space-y-4">
                <div className="space-y-4 ">
                    <div>
                        <h4 className="font-semibold text-base py-1">Phase One – Performance Planning</h4>
                        <p className="text-muted-foreground mt-1">
                            Planning and setting of individual performance targets through work plans derived from the organisation's strategic plans and objectives set at the corporate, divisional, departmental and unit levels. The target setting process must be a top-down approach; preferably the first two weeks in January should serve as the period of setting of targets for the year.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-base py-1">Phase Two – Progress Reviews</h4>
                        <p className="text-muted-foreground mt-1">
                            Discussion and communication between appraiser and appraisee on progress of work, and adjustment of targets if necessary, through the provision of formal feedback.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-base py-1">Phase Three – Review and Appraisal</h4>
                        <p className="text-muted-foreground mt-1">
                            Evaluation of appraisee's performance at the end of the performance management period.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-base py-1">Phase Four – Decision-Making</h4>
                        <p className="text-muted-foreground mt-1">
                            Deciding on courses of action, i.e. recognition/reward, training plans, promotion prospects, career development plans and counselling and sanctions.
                        </p>
                    </div>
                </div>
            </div>

            <Separator className="my-6" />

            {/* Performance Planning Details */}
            <div className="space-y-4">
                <h3 className="font-bold text-lg border-b-2 border-slate-300 pb-2 uppercase">Performance Planning</h3>
                <p className="text-justify leading-relaxed">
                    Performance Planning is the process of defining an employee's job and setting performance expectations for the annual review. It is important that you involve your appraiser and use her/his input in setting targets to ensure ownership by the appraisee. The process consists of three steps included on the appraisal form (all in Section 2):
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Key results areas</li>
                    <li>Targets</li>
                    <li>Resources required</li>
                </ul>
                <p className="text-xs italic text-muted-foreground">
                    For example, you will define the overall requirements of the job by identifying three to five key results areas.
                </p>

                <div className="space-y-6 mt-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-primary">Stage 1 - Before the Meeting</h4>
                        <ul className="space-y-2 text-sm ">
                            <li className="flex gap-2"><span className="font-medium ">Step 1:</span> Appraiser and Appraisee identify key results areas</li>
                            <li className="flex gap-2"><span className="font-medium ">Step 2:</span> Appraiser and Appraisee identify targets</li>
                            <li className="flex gap-2"><span className="font-medium ">Step 3:</span> Appraiser and Appraisee should exchange notes</li>
                        </ul>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-primary">Stage 2 - During the Meeting</h4>
                        <ul className="space-y-2 text-sm ">
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 1:</span> Appraiser and Appraisee discuss and agree on key result areas identified for the appraisee</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 2:</span> Appraiser and Appraisee discuss and agree on targets</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 3:</span> Appraiser explains competencies as in Section 5</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 4:</span> Appraiser and Appraisee discuss key resources required for the attainment of targets</li>
                        </ul>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-primary">Stage 3 – After the Meeting</h4>
                        <ul className="space-y-2 text-sm ">
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 1:</span> Appraiser fills out the Performance Planning Form</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 2:</span> Appraiser and Appraisee sign the Performance Planning Form</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 3:</span> Appraiser gives a copy of the page to the appraisee and returns the original document to the HR.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Separator className="my-6" />

            {/* Progress Review Process */}
            <div className="space-y-4">
                <h3 className="font-bold text-lg border-b-2 border-slate-300 pb-2 uppercase">Progress Review Process</h3>
                <h4 className="font-semibold">The Progress Review Meeting</h4>
                <p className="text-justify leading-relaxed">
                    The Progress review Stage of the performance appraisal cycle provides a formal mechanism by which appraisers and appraisee meet to review progress on targets. The appraiser will arrange a mid-year progress review meeting in July. At least a week's notice must be given to the appraisee specifying the date, time and place of the meeting. The review process should be as follows:
                </p>
                <ol className="space-y-3  text-sm">
                    <li className="flex gap-3">
                        <span className="font-bold min-w-[20px]">i.</span>
                        <span>Appraiser and appraisee discuss progress of work in relation to targets set, one target after the other. If conclusions are reached at the meeting about necessary changes or adjustments in targets, these modifications should be specified on the mid-year review form.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold min-w-[20px]">ii.</span>
                        <span>Appraiser and appraisee discuss the extent to which competencies are being demonstrated; one competency after the other.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold min-w-[20px]">iii.</span>
                        <span>Appraiser and appraisee agree on additions and deletions to targets and modifications where necessary.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold min-w-[20px]">iv.</span>
                        <span>Appraiser records the changes if any and comments on the Mid-year Review Form.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold min-w-[20px]">v.</span>
                        <span>Appraiser and appraisee sign the Mid-Year Review Form.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold min-w-[20px]">vi.</span>
                        <span>Appraiser and appraisee take copies and the original document sent to the HR.</span>
                    </li>
                </ol>
            </div>

            <Separator className="my-6" />

            {/* End of Year Review */}
            <div className="space-y-4">
                <h3 className="font-bold text-lg border-b-2 border-slate-300 pb-2 uppercase">The End-of-Year Review and Appraisal Process</h3>
                <h4 className="font-semibold">The End-of-Year Review and Appraisal Meeting</h4>
                <p className="text-justify leading-relaxed">
                    The End-of-Year Review and Appraisal Process shall span the period of December 1<sup>st</sup> to December 31<sup>st</sup>. The process is in three parts, namely before the interview, during the interview and after the interview.
                </p>

                <div className="space-y-6 mt-4 ">
                    <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-primary">Stage 1 - Before the Meeting</h4>
                        <ul className="space-y-2 text-sm ">
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 1:</span> Appraiser should give at least one week notice to the Appraisee of the meeting.</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 2:</span> Appraiser should write down on a separate sheet appraisee's performance in terms of targets achieved and not achieved and give reasons.</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 3:</span> Appraiser should write down appraisees performance in terms of competencies demonstrated and not demonstrated and give reasons.</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 4:</span> The appraisee should review his/her performance and list the main achievements.</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 5:</span> The appraisee should prepare for the discussion with the appraiser.</li>
                        </ul>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-primary">Stage 2 - During the Meeting</h4>
                        <ul className="space-y-2 text-sm ">
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 1:</span> The appraiser should welcome the appraisee and state the purpose of the meeting.</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 2:</span> The appraiser should discuss the targets achieved one after the other.</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 3:</span> The appraiser should discuss targets not achieved one after the other.</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 4:</span> The appraiser should discuss the competencies demonstrated one after the other.</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 5:</span> The appraiser should discuss the competencies not demonstrated one after the other.</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 6:</span> The appraiser should summarise his / her observations and communicate them to the appraisee.</li>
                        </ul>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-primary">Stage 3 - After the Meeting</h4>
                        <ul className="space-y-2 text-sm ">
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 1:</span> The appraiser fills the form within three working days.</li>
                            <li className="flex gap-2"><span className="font-medium text-nowrap">Step 2:</span> The appraiser invites the appraisee to read, provide comments on the appraisal and sign the End-of-Year Review Form (Section 7).</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Separator className="my-6" />

            {/* Decision Making */}
            <div className="space-y-3">
                <h3 className="font-bold text-lg border-b-2 border-slate-300 pb-2 uppercase">Decision-Making</h3>
                <p className="text-justify leading-relaxed">
                    Performance Improvement or Enhancement plan is put in place by an autonomous body at the Human Resources Division to identify and list ways to enhance performance as well as any training/development or new challenges sought. The phase also involves management ensuring that a plan of action is carried out such as coaching, counselling, salary increase, bonus and training programmes, which the employee will need during the next twelve months to continue growth, to develop new skills, and/or to improve various aspects of job performance.
                </p>
            </div>

            <Separator className="my-6" />

            {/* Annual Appraisal - Overall Rating */}
            <div className="space-y-6">
                <h3 className="font-bold text-lg border-b-2 border-slate-300 pb-2 uppercase">Overall Ratings and Descriptions</h3>

                <p className="text-sm leading-relaxed">
                    The table below provides explanations for overall rating and descriptions
                </p>

                {/* Ratings Table */}
                <div className="border border-black/20 overflow-x-auto">
                    <Table className="table-fixed w-full">
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-black/20">
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal border-r border-black/10" style={{ width: '8%' }}>Score</TableHead>
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal border-r border-black/10" style={{ width: '20%' }}>Rating</TableHead>
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal border-r border-black/10" style={{ width: '47%' }}>Description</TableHead>
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '25%' }}>Notes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="border-b border-black/10 hover:bg-transparent align-top">
                                <TableCell className="text-center font-medium border-r border-black/10 align-top py-3">5</TableCell>
                                <TableCell className="border-r border-black/10 align-top py-3 font-semibold whitespace-normal">Exceptional, exceeded expectations</TableCell>
                                <TableCell className="border-r border-black/10 align-top py-3 text-justify whitespace-normal">
                                    Behavioural competencies and/or work performance consistently far exceeded expectations due to exceptional quality of work performed in all <em>essential</em> areas of responsibility, resulting in an overall quality of work that was superior, and either led to the completion of a major goal or project, or made an exceptional or unique contribution in support of unit, department, or organizational objectives. The employee fully stands out and clearly and consistently demonstrates exceptional accomplishments in terms of quality and quantity of work. His/her demonstration of competencies is easily recognized as truly exceptional by others.
                                </TableCell>
                                <TableCell className="align-top italic text-muted-foreground py-3 whitespace-normal">
                                    There are not less than four (4) particular cases that can be cited to support the rating.
                                </TableCell>
                            </TableRow>
                            <TableRow className="border-b border-black/10 hover:bg-transparent align-top">
                                <TableCell className="text-center font-medium border-r border-black/10 align-top py-3">4</TableCell>
                                <TableCell className="border-r border-black/10 align-top py-3 font-semibold whitespace-normal">Exceeded Expectations</TableCell>
                                <TableCell className="border-r border-black/10 align-top py-3 text-justify whitespace-normal">
                                    Demonstration of behavioural competencies and work performance consistently exceeded expectations in most areas of responsibility, and the quality of work overall was excellent. Achievement was regularly above expected level. Performance is sustained and uniformly high with thorough and on time results. Annual goals were met above expectation.
                                </TableCell>
                                <TableCell className="align-top italic text-muted-foreground py-3 whitespace-normal">
                                    There are not less than three (3) particular cases that can be cited to support the rating.
                                </TableCell>
                            </TableRow>
                            <TableRow className="border-b border-black/10 hover:bg-transparent align-top">
                                <TableCell className="text-center font-medium border-r border-black/10 align-top py-3">3</TableCell>
                                <TableCell className="border-r border-black/10 align-top py-3 font-semibold whitespace-normal">Met all Expectations</TableCell>
                                <TableCell className="border-r border-black/10 align-top py-3 text-justify whitespace-normal">
                                    Behavioural competencies and/or work performance consistently fully met expectations in all essential areas of responsibility, and the quality of work overall was very good. While minor deviations may occur, the overall level of performance meets all requirements. The worker has achieved all critical annual goals.
                                </TableCell>
                                <TableCell className="align-top italic text-muted-foreground py-3 whitespace-normal">
                                    Performance met the expected standards.
                                </TableCell>
                            </TableRow>
                            <TableRow className="border-b border-black/10 hover:bg-transparent align-top">
                                <TableCell className="text-center font-medium border-r border-black/10 align-top py-3">2</TableCell>
                                <TableCell className="border-r border-black/10 align-top py-3 font-semibold whitespace-normal">Below Expectation</TableCell>
                                <TableCell className="border-r border-black/10 align-top py-3 text-justify whitespace-normal">
                                    Behavioural competencies and/or work performance did not consistently meet expectations – performance failed to meet expectations in one or more <em>essential</em> areas of responsibility, and/or some of the most critical goals were not met. The employee generally struggles to fully meet expectations.
                                </TableCell>
                                <TableCell className="align-top italic text-muted-foreground py-3 whitespace-normal">
                                    Performance fell short of expected standards. There are not less than two (2) particular cases that can be cited to support the rating.
                                </TableCell>
                            </TableRow>
                            <TableRow className="border-b border-black/10 hover:bg-transparent align-top">
                                <TableCell className="text-center font-medium border-r border-black/10 align-top py-3">1</TableCell>
                                <TableCell className="border-r border-black/10 align-top py-3 font-semibold">Unacceptable</TableCell>
                                <TableCell className="border-r border-black/10 align-top py-3 text-justify whitespace-normal">
                                    Behavioural competencies and/or work performance was consistently below expectations in one or more of the most essential areas of responsibility, and/or reasonable progress toward critical goals was not made. Significant improvement is needed in three or more important areas. The employee is not meeting the job requirements. Performance must improve substantially within a reason able period of time if the individual is to remain in this position.
                                </TableCell>
                                <TableCell className="align-top italic text-muted-foreground py-3 whitespace-normal">
                                    Failed to meet performance standards. There are not less than three (3) particular cases that can be cited to support the rating.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                {/* Rating Scale */}
                <div className="mt-8">
                    <h4 className="font-semibold mb-4 text-primary uppercase">Combined Overall Rating Scale</h4>
                    <div className="border border-black/20 overflow-x-auto">
                        <Table className="table-fixed w-full">
                            <TableHeader>
                                <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-black/20">
                                    <TableHead className="font-bold text-black border-r border-black/10 text-center whitespace-normal h-12 align-middle" style={{ width: '15%' }}>Score</TableHead>
                                    <TableHead className="font-bold text-black border-r border-black/10 text-center whitespace-normal h-12 align-middle" style={{ width: '17%' }}>80% above</TableHead>
                                    <TableHead className="font-bold text-black border-r border-black/10 text-center whitespace-normal h-12 align-middle" style={{ width: '17%' }}>79-65 %</TableHead>
                                    <TableHead className="font-bold text-black border-r border-black/10 text-center whitespace-normal h-12 align-middle" style={{ width: '17%' }}>64-50%</TableHead>
                                    <TableHead className="font-bold text-black border-r border-black/10 text-center whitespace-normal h-12 align-middle" style={{ width: '17%' }}>49-41%</TableHead>
                                    <TableHead className="font-bold text-black text-center whitespace-normal h-12 align-middle" style={{ width: '17%' }}>40% & below</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="border-b border-black/10 hover:bg-transparent">
                                    <TableCell className="font-bold border-r border-black/10 bg-muted/30 text-center py-3">Rating</TableCell>
                                    <TableCell className="border-r border-black/10 font-medium py-3 whitespace-normal">5</TableCell>
                                    <TableCell className="border-r border-black/10 font-medium py-3 whitespace-normal">4</TableCell>
                                    <TableCell className="border-r border-black/10 font-medium py-3 whitespace-normal">3</TableCell>
                                    <TableCell className="border-r border-black/10 font-medium py-3 whitespace-normal">2</TableCell>
                                    <TableCell className="font-medium py-3 whitespace-normal">1</TableCell>
                                </TableRow>
                                <TableRow className="border-b border-black/10 hover:bg-transparent">
                                    <TableCell className="font-bold border-r border-black/10 bg-muted/30 text-center py-3">Description</TableCell>
                                    <TableCell className="border-r border-black/10 font-medium text-green-700 py-3 whitespace-normal">Exceptional, exceeded expectations</TableCell>
                                    <TableCell className="border-r border-black/10 font-medium text-blue-700 py-3 whitespace-normal">Exceeded Expectations</TableCell>
                                    <TableCell className="border-r border-black/10 font-medium text-slate-700 py-3 whitespace-normal">Met all Expectations</TableCell>
                                    <TableCell className="border-r border-black/10 font-medium text-orange-600 py-3 whitespace-normal">Below Expectation</TableCell>
                                    <TableCell className="font-medium text-red-600 py-3 whitespace-normal">Unacceptable</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

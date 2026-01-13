"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Section4Content } from "../types/guide-types"
import SignatureSection from "../shared/signature-section"

interface Section4EndOfYearReviewProps {
    content: Section4Content
}

export function Section4EndOfYearReview({ content }: Section4EndOfYearReviewProps) {
    return (
        <div className="space-y-6 max-w-4xl text-sm">
            {/* Header */}
            <div>
                <h3 className="font-bold text-base uppercase border-b-2 border-black/80 pb-1 mb-2">
                    SECTION 4: End-of-Year Review Form
                </h3>
                <p className="text-xs text-muted-foreground italic">
                    This is to be completed in December by the Appraiser and Appraisee.
                </p>
            </div>

            {/* End-of-Year Review Table */}
            <div className="border border-black/20 overflow-x-auto">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-black/20">
                            <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '6%' }}>NO.</TableHead>
                            <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '12%' }}>TARGET</TableHead>
                            <TableHead className="text-black text-xs font-bold h-10 text-center whitespace-normal" style={{ width: '14%' }}>
                                PERFORMANCE ASSESSMENT<br />
                                <span className="text-xs font-normal">(Rate 1-5, see Sec 5)</span>
                            </TableHead>
                            <TableHead className="text-black text-xs font-bold h-10 text-center whitespace-normal" style={{ width: '12%' }}>WEIGHT OF TARGET</TableHead>
                            <TableHead className="text-black text-xs font-bold h-10 text-center whitespace-normal" style={{ width: '12%' }}>
                                SCORE<br />
                                <span className="text-xs font-normal">(Assessment x Weight)</span>
                            </TableHead>
                            <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '30%' }}>COMMENTS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Data Rows */}
                        {content.rows.map((row, index) => (
                            <TableRow
                                key={index}
                                className="border-b border-black/10 hover:bg-transparent align-top"
                            >
                                <TableCell className="text-center py-3 align-top whitespace-normal font-semibold" style={{ width: '6%' }}>
                                    {row.no}
                                </TableCell>
                                <TableCell className="font-semibold py-3 align-top whitespace-normal" style={{ width: '12%' }}>
                                    {row.target}
                                </TableCell>
                                <TableCell className="text-center text-muted-foreground py-3 whitespace-normal" style={{ width: '14%' }}>
                                    {row.performanceAssessment}
                                </TableCell>
                                <TableCell className="text-center text-muted-foreground py-3 whitespace-normal" style={{ width: '12%' }}>
                                    {row.weightOfTarget}
                                </TableCell>
                                <TableCell className="text-center text-muted-foreground py-3 whitespace-normal" style={{ width: '12%' }}>
                                    {row.score}
                                </TableCell>
                                <TableCell className="text-muted-foreground py-3 whitespace-normal" style={{ width: '30%' }}>
                                    {row.comments}
                                </TableCell>
                            </TableRow>
                        ))}

                        {/* Total Row */}
                        <TableRow className="bg-muted/30 hover:bg-muted/30 border-t-2 border-black/40">
                            <TableCell colSpan={4} className="text-right font-bold py-3">
                                TOTAL (Q)
                            </TableCell>
                            <TableCell className="text-center font-bold py-3" style={{ width: '12%' }}>
                                {/* Total score placeholder */}
                            </TableCell>
                            <TableCell style={{ width: '30%' }}>
                                {/* Empty */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            {/* Signatures */}
            <SignatureSection sectionTypeDate="End-of-Year Date" />
        </div>
    )
}

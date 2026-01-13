"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Section3Content } from "../types/guide-types"
import SignatureSection from "../shared/signature-section"

interface Section3MidYearReviewProps {
    content: Section3Content
}

export function Section3MidYearReview({ content }: Section3MidYearReviewProps) {
    return (
        <div className="space-y-6 max-w-4xl text-sm">
            {/* Header */}
            <div>
                <h3 className="font-bold text-base uppercase border-b-2 border-black/80 pb-1 mb-2">
                    SECTION 3: Mid-Year Review Form
                </h3>
                <p className="text-xs text-muted-foreground italic">
                    This is to be completed in July by the Appraiser and Appraisee. Progress has been discussed and Agreements have been reached as detailed below.
                </p>
            </div>

            {/* Mid-Year Review Table */}
            <div className="border border-black/20 overflow-x-auto">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-black/20">
                            <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '8%' }}>NO.</TableHead>
                            <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '30%' }}>TARGET</TableHead>
                            <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '40%' }}>PROGRESS REVIEW</TableHead>
                            <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '22%' }}>REMARKS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Target Rows */}
                        {content.targets.map((row, index) => (
                            <TableRow
                                key={`target-${index}`}
                                className="border-b border-black/10 hover:bg-transparent align-top"
                            >
                                <TableCell className="text-center py-3 align-top whitespace-normal font-semibold" style={{ width: '8%' }}>
                                    {row.no}
                                </TableCell>
                                <TableCell className="font-semibold py-3 align-top whitespace-normal" style={{ width: '30%' }}>
                                    {row.item}
                                </TableCell>
                                <TableCell className="text-muted-foreground py-3 whitespace-normal" style={{ width: '40%' }}>
                                    {row.progressReview}
                                </TableCell>
                                <TableCell className="text-muted-foreground py-3 whitespace-normal" style={{ width: '22%' }}>
                                    {row.remarks}
                                </TableCell>
                            </TableRow>
                        ))}

                        {/* Competency Header Row */}
                        {content.competencies.length > 0 && (
                            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-black/20">
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '8%' }}>NO.</TableHead>
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '30%' }}>COMPETENCY</TableHead>
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '40%' }}>PROGRESS REVIEW</TableHead>
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '22%' }}>REMARKS</TableHead>
                            </TableRow>
                        )}

                        {/* Competency Rows */}
                        {content.competencies.map((row, index) => (
                            <TableRow
                                key={`competency-${index}`}
                                className="border-b border-black/10 hover:bg-transparent align-top"
                            >
                                <TableCell className="text-center py-3 align-top whitespace-normal font-semibold" style={{ width: '8%' }}>
                                    {row.no}
                                </TableCell>
                                <TableCell className="font-semibold py-3 align-top whitespace-normal" style={{ width: '30%' }}>
                                    {row.item}
                                </TableCell>
                                <TableCell className="text-muted-foreground py-3 whitespace-normal" style={{ width: '40%' }}>
                                    {row.progressReview}
                                </TableCell>
                                <TableCell className="text-muted-foreground py-3 whitespace-normal" style={{ width: '22%' }}>
                                    {row.remarks}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <SignatureSection 
                sectionTypeDate={`Mid-Year Date`}
            />
        </div>
    )
}

"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Section2Content } from "../types/guide-types"
import SignatureSection from "../shared/signature-section"

interface Section2PerformancePlanningProps {
    content: Section2Content
}

export function Section2PerformancePlanning({ content }: Section2PerformancePlanningProps) {
    return (
        <div className="space-y-6 max-w-4xl text-sm">
            {/* Header */}
            <div>
                <h3 className="font-bold text-base uppercase border-b-2 border-black/80 pb-1 mb-2">
                    SECTION 2: Performance Planning Form
                </h3>
                <p className="text-xs text-muted-foreground italic">
                    To be agreed between the appraiser and the employee at the start of the annual appraisal cycle
                </p>
            </div>

            {/* Performance Planning Table */}
            <div className="border border-black/20 overflow-x-auto">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-black/20 ">
                            <TableHead className="text-black font-bold h-10 text-center" style={{ width: '25%' }}>KEY RESULT AREAS</TableHead>
                            <TableHead className="text-black font-bold h-10 text-center whitespace-pre-wrap" style={{ width: '45%' }}>
                                TARGETS<br />
                                <span className="text-xs font-normal">(Specific, Measurable, Achievable, Relevant, Time-bound)</span>
                            </TableHead>
                            <TableHead className="text-black font-bold h-10 text-center" style={{ width: '30%' }}>RESOURCES REQUIRED</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {content.rows.map((row, index) => (
                            <TableRow
                                key={index}
                                className="border-b border-black/10 hover:bg-transparent align-top"
                            >
                                <TableCell className="font-semibold py-3 align-top whitespace-normal" style={{ width: '25%' }}>
                                    {row.keyResultArea}
                                </TableCell>
                                <TableCell className="text-muted-foreground py-3 whitespace-pre-wrap" style={{ width: '45%' }}>
                                    {row.targets}
                                </TableCell>
                                <TableCell className="text-muted-foreground py-3 whitespace-normal" style={{ width: '30%' }}>
                                    {row.resourcesRequired}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Signatures */}
            <SignatureSection 
                sectionTypeDate={`Planning Date`}
            />
        </div>
    )
}

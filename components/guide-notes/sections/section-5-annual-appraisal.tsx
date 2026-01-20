"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Section5Content } from "../types/guide-types"

interface Section5AnnualAppraisalProps {
    content: Section5Content
}

export function Section5AnnualAppraisal({ content }: Section5AnnualAppraisalProps) {
    return (
        <div className="space-y-6 max-w-4xl text-sm">
            {/* Header */}
            <div>
                <h3 className="font-bold text-base uppercase border-b-2 border-black/80 pb-1 mb-1">
                    SECTION 5: Annual Appraisal
                </h3>
                <p className="font-semibold text-sm">Assessment of Competencies</p>
            </div>

            {/* A. CORE COMPETENCIES */}
            <div className="space-y-3">
                <h4 className="font-bold text-sm">A. CORE COMPETENCIES</h4>

                <div className="border border-black/20 overflow-x-auto">
                    <Table className="table-fixed w-full">
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-black/20">
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '30%' }}>CORE COMPETENCIES</TableHead>
                                <TableHead className="text-black text-xs font-bold h-10 text-center whitespace-normal" style={{ width: '10%' }}>(W) weight</TableHead>
                                <TableHead className="text-black text-xs font-bold h-10 text-center whitespace-normal" style={{ width: '10%' }}>
                                    (S) Score on Scale 1-5
                                </TableHead>
                                <TableHead className="text-black text-xs font-bold h-10 text-center whitespace-normal" style={{ width: '10%' }}>W × S</TableHead>
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '40%' }}>
                                    COMMENTS<br />
                                    <span className="text-xs font-normal">(Guidance for Appraisers)</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Data Rows */}
                            {content.coreCompetencies.map((row, index) => (
                                <TableRow
                                    key={index}
                                    className="border-b border-black/10 hover:bg-transparent align-top"
                                >
                                    <TableCell className="py-3 align-top whitespace-normal" style={{ width: '30%' }}>
                                        {row.no && <span className="font-semibold">{row.no}. </span>}
                                        <span className="font-semibold">{row.competency}</span>
                                    </TableCell>
                                    <TableCell className="text-center text-muted-foreground py-3 whitespace-normal" style={{ width: '10%' }}>
                                        {row.weight}
                                    </TableCell>
                                    <TableCell className="text-center text-muted-foreground py-3 whitespace-normal" style={{ width: '10%' }}>
                                        {row.score}
                                    </TableCell>
                                    <TableCell className="text-center text-muted-foreground py-3 whitespace-normal" style={{ width: '10%' }}>
                                        {row.calculation}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground py-3 whitespace-normal" style={{ width: '40%' }}>
                                        {row.comments}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {/* Total Row */}
                            <TableRow className="border-b border-black/10 hover:bg-transparent">
                                <TableCell colSpan={4} className="text-right font-semibold py-2">
                                    Total
                                </TableCell>
                            </TableRow>

                            {/* Average Row */}
                            <TableRow className="bg-muted/20 hover:bg-muted/20">
                                <TableCell colSpan={4} className="text-right font-semibold py-2">
                                    Average (N)
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <p className="font-semibold text-sm mt-2">
                    Average of ALL averages for CORE COMPETENCES (N) = [Value]
                </p>
            </div>

            {/* B. NON-CORE COMPETENCIES */}
            <div className="space-y-3">
                <h4 className="font-bold text-sm">B. NON-CORE COMPETENCIES</h4>

                <div className="border border-black/20 overflow-x-auto">
                    <Table className="table-fixed w-full">
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-black/20">
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '40%' }}>NON-CORE COMPETENCIES</TableHead>
                                <TableHead className="text-black text-xs font-bold h-10 text-center whitespace-normal" style={{ width: '10%' }}>(W) weight</TableHead>
                                <TableHead className="text-black text-xs font-bold h-10 text-center whitespace-normal" style={{ width: '10%' }}>
                                    (S) Score on Scale 1-5
                                </TableHead>
                                <TableHead className="text-black text-xs font-bold h-10 text-center whitespace-normal" style={{ width: '10%' }}>W × S</TableHead>
                                <TableHead className="text-black font-bold h-10 text-center whitespace-normal" style={{ width: '30%' }}>COMMENTS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Data Rows */}
                            {content.nonCoreCompetencies.map((row, index) => (
                                <TableRow
                                    key={index}
                                    className="border-b border-black/10 hover:bg-transparent align-top"
                                >
                                    <TableCell className="py-3 align-top whitespace-normal font-semibold" style={{ width: '40%' }}>
                                        {row.competency}
                                    </TableCell>
                                    <TableCell className="text-center text-muted-foreground py-3 whitespace-normal" style={{ width: '10%' }}>
                                        {row.weight}
                                    </TableCell>
                                    <TableCell className="text-center text-muted-foreground py-3 whitespace-normal" style={{ width: '10%' }}>
                                        {row.score}
                                    </TableCell>
                                    <TableCell className="text-center text-muted-foreground py-3 whitespace-normal" style={{ width: '10%' }}>
                                        {row.calculation}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground py-3 whitespace-normal" style={{ width: '30%' }}>
                                        {row.comments}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {/* Total Row */}
                            <TableRow className="border-b border-black/10 hover:bg-transparent">
                                <TableCell colSpan={4} className="text-right font-semibold py-2">
                                    Total
                                </TableCell>
                            </TableRow>

                            {/* Average Row */}
                            <TableRow className="bg-muted/20 hover:bg-muted/20">
                                <TableCell colSpan={4} className="text-right font-semibold py-2">
                                    Average(O)
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <p className="font-semibold text-sm mt-2">
                    Average of ALL averages for NON-CORE COMPETENCES (O) =
                </p>
            </div>

            {/* OVERALL ASSESSMENT */}
            <div className="space-y-2 border-2 border-black/30 p-4 rounded-md bg-muted/10">
                <h4 className="font-bold text-base uppercase mb-3">OVERALL ASSESSMENT</h4>

                <div className="space-y-2 text-sm">
                    <div className="flex items-baseline gap-x-2">
                        <span className="font-semibold min-w-[350px]">PERFORMANCE ASSESSMENT (M) =</span>
                        <span className="text-muted-foreground">___________</span>
                    </div>

                    <div className="flex items-baseline gap-x-2">
                        <span className="font-semibold min-w-[350px]">CORE COMPETENCIES ASSESSMENT (N) =</span>
                        <span className="text-muted-foreground">___________</span>
                    </div>

                    <div className="flex items-baseline gap-x-2">
                        <span className="font-semibold min-w-[350px]">NON-CORE COMPETENCIES ASSESSMENT (O) =</span>
                        <span className="text-muted-foreground">___________</span>
                    </div>

                    <div className="flex items-baseline gap-x-2 pt-2 border-t border-black/20">
                        <span className="font-bold min-w-[350px]">OVERALL TOTAL (T) = M + N + O =</span>
                        <span className="font-bold">___________</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

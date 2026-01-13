"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function Section1AAppraiseeInfo() {
    return (
        <div className="space-y-6 max-w-2xl text-sm">
            {/* Header */}
            <div>
                <h3 className="font-bold text-base uppercase border-b-2 border-black/80 pb-1 mb-4">
                    SECTION 1 - A: Appraisee Personal Information
                </h3>

                {/* Period of Report */}
                <div className="flex items-end gap-x-4 mb-1">
                    <div className="bg-primary/90 text-primary-foreground px-2 py-1 font-bold text-xs uppercase tracking-wide">
                        Period of Report
                    </div>
                    <div className="flex gap-x-6 flex-1 border-b border-black/20 pb-1">
                        <div className="flex gap-x-2">
                            <span className="font-semibold">From (dd/mm/yyyy):</span>
                            <span className="text-muted-foreground">01/01/[Year]</span>
                        </div>
                        <div className="flex gap-x-2">
                            <span className="font-semibold">To (dd/mm/yyyy):</span>
                            <span className="text-muted-foreground">31/12/[Year]</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Info Grid */}
            <div className="grid gap-y-4">
                {/* Row 1: Title */}
                <div className="flex flex-wrap items-baseline gap-x-2 border-b border-black/10 pb-1">
                    <span className="font-bold min-w-[100px]">Title:</span>
                    <div className="flex gap-x-4 text-muted-foreground">
                        <span className="flex items-center gap-1">□ Mr.</span>
                        <span className="flex items-center gap-1">□ Mrs.</span>
                        <span className="flex items-center gap-1">□ Ms.</span>
                        <span className="flex items-center gap-1">□ Other (Pls. specify): _________________</span>
                    </div>
                </div>

                {/* Row 2: Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1 border-b border-black/10 pb-1">
                        <span className="font-bold">Surname:</span>
                        <span className="text-muted-foreground italic pl-2">[Appraisee's Surname]</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-black/10 pb-1">
                        <span className="font-bold">First Name:</span>
                        <span className="text-muted-foreground italic pl-2">[Appraisee's First Name]</span>
                    </div>
                </div>

                {/* Row 3: Other Names */}
                <div className="flex flex-col gap-1 border-b border-black/10 pb-1">
                    <span className="font-bold">Other Name(s):</span>
                    <span className="text-muted-foreground italic pl-2">[Appraisee's Other Names]</span>
                </div>

                {/* Row 4: Gender & Grade */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end border-b border-black/10 pb-1">
                    <div className="flex items-baseline gap-x-4">
                        <span className="font-bold">Gender:</span>
                        <div className="flex gap-x-4 text-muted-foreground">
                            <span className="flex items-center gap-1">□ Male</span>
                            <span className="flex items-center gap-1">□ Female</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-x-2">
                        <span className="font-bold whitespace-nowrap">Grade/Salary (p.a.):</span>
                        <span className="text-muted-foreground italic">[e.g., GH-TVET 4]</span>
                    </div>
                </div>

                {/* Row 5: Job Title */}
                <div className="flex flex-col gap-1 border-b border-black/10 pb-1">
                    <span className="font-bold">Present Job Title/Position:</span>
                    <span className="text-muted-foreground italic pl-2">[e.g., Facilitator (Automotive Engineering) / Technical Instructor]</span>
                </div>

                {/* Row 6: Department */}
                <div className="flex flex-col gap-1 border-b border-black/10 pb-1">
                    <span className="font-bold">Department/Division:</span>
                    <span className="text-muted-foreground italic pl-2">[e.g., Mechanical Engineering Dept.] / Ghana TVET Service</span>
                </div>

                {/* Row 7: Appointment Date */}
                <div className="flex items-baseline gap-x-2 border-b border-black/10 pb-1">
                    <span className="font-bold">Date of Appointment to Present Grade (dd/mm/yyyy):</span>
                    <span className="text-muted-foreground pl-2">[Date]</span>
                </div>
            </div>

            {/* Training Section */}
            <div className="mt-8">
                <h4 className="font-bold text-xs uppercase underline mb-2">
                    [TRAINING RECEIVED DURING THE PREVIOUS YEAR]
                </h4>

                <div className="border border-black/20">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-black/20">
                                <TableHead className="text-black font-bold h-9">Institution</TableHead>
                                <TableHead className="text-black font-bold h-9 w-[150px]">Date (dd-mm-yy)</TableHead>
                                <TableHead className="text-black font-bold h-9">Programme</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="border-b border-black/10 hover:bg-transparent">
                                <TableCell className="text-muted-foreground italic py-2">[e.g., Ghana TVET Service]</TableCell>
                                <TableCell className="text-muted-foreground italic py-2">[e.g., 10-07-23]</TableCell>
                                <TableCell className="text-muted-foreground italic py-2">[e.g., Advanced Pedagogical Skills for TVET]</TableCell>
                            </TableRow>
                            <TableRow className="border-b border-black/10 hover:bg-transparent">
                                <TableCell className="text-muted-foreground italic py-2">[e.g., CTVET]</TableCell>
                                <TableCell className="text-muted-foreground italic py-2">[e.g., 15-11-23]</TableCell>
                                <TableCell className="text-muted-foreground italic py-2">[e.g., Design Thinking for Curriculum Development]</TableCell>
                            </TableRow>
                            <TableRow className="hover:bg-transparent">
                                <TableCell className="text-muted-foreground italic py-2">[Add more as applicable]</TableCell>
                                <TableCell className="text-muted-foreground italic py-2">[Date]</TableCell>
                                <TableCell className="text-muted-foreground italic py-2">[Programme Name]</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

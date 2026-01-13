"use client"

export function Section1BAppraiserInfo() {
    return (
        <div className="space-y-6 max-w-2xl text-sm">
            {/* Header */}
            <div>
                <h3 className="font-bold text-base uppercase border-b-2 border-black/80 pb-1 mb-4">
                    SECTION 1 - B: Appraiser Information
                </h3>
            </div>

            {/* Info Grid */}
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
                        <span className="text-muted-foreground italic pl-2">[Appraiser's Surname]</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-black/10 pb-1">
                        <span className="font-bold">First Name:</span>
                        <span className="text-muted-foreground italic pl-2">[Appraiser's First Name]</span>
                    </div>
                </div>

                {/* Row 3: Other Names */}
                <div className="flex flex-col gap-1 border-b border-black/10 pb-1">
                    <span className="font-bold">Other Name(s):</span>
                    <span className="text-muted-foreground italic pl-2">[Appraiser's Other Names]</span>
                </div>

                {/* Row 4: Position */}
                <div className="flex flex-col gap-1 border-b border-black/10 pb-1">
                    <span className="font-bold">Position of Appraiser:</span>
                    <span className="text-muted-foreground italic pl-2">[e.g., Head of Department, Head of Section]</span>
                </div>
            </div>
        </div>
    )
}

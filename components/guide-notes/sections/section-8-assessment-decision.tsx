"use client"

export function Section8AssessmentDecision() {
    return (
        <div className="space-y-6 max-w-4xl text-sm">
            {/* Header */}
            <div>
                <h3 className="font-bold text-base uppercase border-b-2 border-black/80 pb-1 mb-4">
                    SECTION 8: Assessment Decision
                </h3>
            </div>

            {/* Promotion Assessment Options */}
            <div className="space-y-3 pl-2">
                <div className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">□</span>
                    <p className="text-sm">
                        <span className="font-semibold">Outstanding</span> -- should be promoted as soon as possible
                    </p>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">□</span>
                    <p className="text-sm">Suitable for promotion</p>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">□</span>
                    <p className="text-sm">Likely to be ready for promotion in 2 to 3 years</p>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">□</span>
                    <p className="text-sm">Not ready for promotion for at least 3 years</p>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">□</span>
                    <p className="text-sm">Unlikely to be promoted further</p>
                </div>
            </div>
        </div>
    )
}

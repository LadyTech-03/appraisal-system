"use client"

import { Section6Content } from "../types/guide-types"
import SignatureSection from "../shared/signature-section"

interface Section6AppraiserCommentsProps {
    content: Section6Content
}

export function Section6AppraiserComments({ content }: Section6AppraiserCommentsProps) {
    return (
        <div className="space-y-6 max-w-4xl text-sm">
            {/* Header */}
            <div>
                <h3 className="font-bold text-base uppercase border-b-2 border-black/80 pb-1 mb-2">
                    SECTION 6: Annual Appraisal (Continuation)
                </h3>
                <p className="font-semibold text-sm underline decoration-2">
                    Appraiser's Comments on Work plan Achievements
                </p>
                <p className="text-xs text-muted-foreground italic mt-1">
                    (The appraiser's narrative should now specifically reference the new evidence points)
                </p>
            </div>

            {/* Example Comment */}
            <div className="space-y-3">
                <p className="font-semibold text-sm">Example Comment:</p>

                <div className="border border-black/20 p-4 rounded-md bg-muted/5">
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                        {content.exampleComment}
                    </p>
                </div>
            </div>

            {/* Signature - Appraiser only */}
            <SignatureSection
                sectionTypeDate="Date"
                appraiseeSign={false}
                appraiserSign={true}
            />
        </div>
    )
}

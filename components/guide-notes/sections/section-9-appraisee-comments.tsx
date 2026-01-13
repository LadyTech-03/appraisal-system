"use client"

import { Section9Content } from "../types/guide-types"
import SignatureSection from "../shared/signature-section"

interface Section9AppraiseeCommentsProps {
    content: Section9Content
}

export function Section9AppraiseeComments({ content }: Section9AppraiseeCommentsProps) {
    return (
        <div className="space-y-6 max-w-4xl text-sm">
            {/* Header */}
            <div>
                <h3 className="font-bold text-base uppercase border-b-2 border-black/80 pb-1 mb-2">
                    SECTION 9: Appraisee's Comments
                </h3>
                <p className="text-xs text-muted-foreground italic">
                    [The appraisee should write their comments here, acknowledging feedback, agreeing/disagreeing with the assessment, and stating their career aspirations.]
                </p>
            </div>

            {/* Example Comment */}
            <div className="border border-black/20 p-4 rounded-md bg-muted/5">
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                    {content.exampleComment}
                </p>
            </div>

            {/* Signature - Appraisee only */}
            <SignatureSection
                sectionTypeDate="Date"
                appraiseeSign={true}
                appraiserSign={false}
            />
        </div>
    )
}

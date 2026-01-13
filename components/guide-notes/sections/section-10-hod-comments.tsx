"use client"

import { Section10Content } from "../types/guide-types"
import SignatureSection from "../shared/signature-section"

interface Section10HODCommentsProps {
    content: Section10Content
}

export function Section10HODComments({ content }: Section10HODCommentsProps) {
    return (
        <div className="space-y-6 max-w-4xl text-sm">
            {/* Header */}
            <div>
                <h3 className="font-bold text-base uppercase border-b-2 border-black/80 pb-1 mb-2">
                    SECTION 10: Head of Department's / Division's (HOD) Comments
                </h3>
                <p className="text-xs text-muted-foreground italic">
                    [The HOD provides final endorsement, comments on the staff's potential, and confirms institutional support for the development plan.]
                </p>
            </div>

            {/* Example Comment */}
            <div className="border border-black/20 p-4 rounded-md bg-muted/5">
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                    {content.exampleComment}
                </p>
            </div>

            {/* Custom HOD Signature */}
            <div className="grid gap-4 pt-4 mb-32">
                <div className="flex items-baseline gap-x-2">
                    <span className="font-bold whitespace-nowrap">HOD'S SIGNATURE:</span>
                    <span className="flex-1 text-muted-foreground">________________</span>
                    <span className="font-bold">DATE:</span>
                    <span className="text-muted-foreground">[Date]</span>
                </div>
            </div>
        </div>
    )
}

"use client"

import { Section7Content } from "../types/guide-types"

interface Section7CareerDevelopmentProps {
    content: Section7Content
}

export function Section7CareerDevelopment({ content }: Section7CareerDevelopmentProps) {
    return (
        <div className="space-y-6 max-w-4xl text-sm">
            {/* Header */}
            <div>
                <h3 className="font-bold text-base uppercase border-b-2 border-black/80 pb-1 mb-2">
                    SECTION 7: Career Development
                </h3>
                <p className="font-semibold text-sm underline decoration-2">
                    Training and Development - Comments and Plan
                </p>
                <p className="text-xs text-muted-foreground italic mt-1">
                    (The plan should now be informed by the enhanced appraisal)
                </p>
            </div>

            {/* Example Development Plan */}
            <div className="space-y-3">
                <p className="font-semibold text-sm">Example Development Plan:</p>

                <div className="border border-black/20 p-4 rounded-md bg-muted/5">
                    <div className="space-y-3 text-sm">
                        {content.examplePlan.split('\n').map((line, index) => {
                            const trimmedLine = line.trim()
                            if (trimmedLine.startsWith('•')) {
                                return (
                                    <div key={index} className="flex gap-2">
                                        <span className="text-muted-foreground">•</span>
                                        <p className="text-muted-foreground flex-1">{trimmedLine.substring(1).trim()}</p>
                                    </div>
                                )
                            }
                            return null
                        }).filter(Boolean)}
                    </div>
                </div>
            </div>
        </div>
    )
}

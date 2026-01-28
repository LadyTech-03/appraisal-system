"use client"

import { useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Eraser, Check, Pen } from "lucide-react"

interface SignaturePadProps {
    onSave: (blob: Blob) => Promise<void>
    disabled?: boolean
    width?: number
    height?: number
}

export function SignaturePad({
    onSave,
    disabled = false,
    width = 500,
    height = 200,
}: SignaturePadProps) {
    const signatureRef = useRef<SignatureCanvas>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [hasDrawn, setHasDrawn] = useState(false)

    const handleClear = () => {
        signatureRef.current?.clear()
        setHasDrawn(false)
    }

    const trimCanvas = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d")
        if (!ctx) return canvas

        const width = canvas.width
        const height = canvas.height
        const imageData = ctx.getImageData(0, 0, width, height)
        const data = imageData.data

        let top = height, bottom = 0, left = width, right = 0
        let hasPixels = false

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const alpha = data[(y * width + x) * 4 + 3]
                if (alpha > 0) {
                    if (x < left) left = x
                    if (x > right) right = x
                    if (y < top) top = y
                    if (y > bottom) bottom = y
                    hasPixels = true
                }
            }
        }

        if (!hasPixels) return canvas

        const trimWidth = right - left + 1
        const trimHeight = bottom - top + 1

        const trimmedCanvas = document.createElement("canvas")
        trimmedCanvas.width = trimWidth
        trimmedCanvas.height = trimHeight
        const trimmedCtx = trimmedCanvas.getContext("2d")

        if (trimmedCtx) {
            trimmedCtx.drawImage(
                canvas,
                left, top, trimWidth, trimHeight,
                0, 0, trimWidth, trimHeight
            )
        }

        return trimmedCanvas
    }

    const handleSave = async () => {
        if (!signatureRef.current || signatureRef.current.isEmpty()) {
            return
        }

        setIsSaving(true)
        try {
            // Get the raw canvas and trim it manually to avoid dependency issues with getTrimmedCanvas
            const rawCanvas = signatureRef.current.getCanvas()
            const canvas = trimCanvas(rawCanvas)

            const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob(
                    (blob) => {
                        if (blob) resolve(blob)
                        else reject(new Error("Failed to create blob"))
                    },
                    "image/png"
                )
            })

            await onSave(blob)
        } catch (error) {
            console.error("Error saving signature:", error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleBeginStroke = () => {
        setHasDrawn(true)
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Pen className="h-4 w-4" />
                <span>Draw your signature below</span>
            </div>

            <Card className="p-0 overflow-hidden border-2 border-dashed border-gray-300 bg-white">
                <SignatureCanvas
                    ref={signatureRef}
                    canvasProps={{
                        width,
                        height,
                        className: "signature-canvas w-full touch-none",
                        style: {
                            width: "100%",
                            height: `${height}px`,
                            cursor: disabled ? "not-allowed" : "crosshair",
                        },
                    }}
                    penColor="black"
                    minWidth={1.5}
                    maxWidth={3}
                    velocityFilterWeight={0.7}
                    onBegin={handleBeginStroke}
                />
            </Card>

            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    disabled={disabled || isSaving || !hasDrawn}
                    className="flex items-center gap-2"
                >
                    <Eraser className="h-4 w-4" />
                    Clear
                </Button>

                <Button
                    type="button"
                    size="sm"
                    onClick={handleSave}
                    disabled={disabled || isSaving || !hasDrawn}
                    className="flex items-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Check className="h-4 w-4" />
                            Save Signature
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}

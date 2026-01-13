const SignatureSection = ({ sectionTypeDate }: { sectionTypeDate: string }) => {
    return (
        <div>
            <div className="grid gap-4 pt-4">
                <div className="flex items-baseline gap-x-2">
                    <span className="font-bold whitespace-nowrap">APPRAISEE'S SIGNATURE:</span>
                    <span className="flex-1 text-muted-foreground">________________</span>
                    <span className="font-bold">DATE:</span>
                    <span className="text-muted-foreground">[{sectionTypeDate}]</span>
                </div>
                <div className="flex items-baseline gap-x-2">
                    <span className="font-bold whitespace-nowrap">APPRAISER'S SIGNATURE:</span>
                    <span className="flex-1 text-muted-foreground">________________</span>
                    <span className="font-bold">DATE:</span>
                    <span className="text-muted-foreground">[{sectionTypeDate}]</span>
                </div>
            </div>
        </div>
    )
}

export default SignatureSection;

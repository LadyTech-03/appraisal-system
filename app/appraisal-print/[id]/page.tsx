import AppraisalPrintView from "@/components/appraisal-print-view"

export default function AppraisalPrintPage({ params }: { params: { id: string } }) {
  return <AppraisalPrintView appraisalId={params.id} />
}

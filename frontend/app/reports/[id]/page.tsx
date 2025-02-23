import BackButton from "@/components/buttons/back"
import DeleteButton from "@/components/buttons/delete"
import EditReportForm from "@/components/forms/report/edit"
import { authOptions } from "@/lib/auth_options"
import { BaseError, CommonError } from "@/lib/errors/base"
import { reportService } from "@/lib/services"
import { Report } from "@/lib/types/report"
import { handleError } from "@/lib/utils/error"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function EditReportPage({ params }: Props) {
  const { id } = await params

  const session = await getServerSession(authOptions)
  if (!session) {
    throw new CommonError()
  }

  let report: Report
  try {
    report = await reportService.getReportDetails(session, id)
  } catch (error) {
    if (error instanceof BaseError) {
      handleError(error)
    }
    notFound()
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <BackButton />
          <DeleteButton reportId={report.id} />
        </div>
        <EditReportForm report={report} />
      </div>
    </div>
  )
}

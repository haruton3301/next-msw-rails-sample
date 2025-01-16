import NewButton from "@/components/buttons/new"
import Card from "@/components/common/Card"
import ReportTable from "@/components/tables/report"
import { authOptions } from "@/lib/auth_options"
import messages from "@/lib/constants/messages"
import { BaseError, CommonError } from "@/lib/errors/base"
import { reportService } from "@/lib/services"
import { Report } from "@/lib/types/report"
import { handleError } from "@/lib/utils/error"
import { getServerSession } from "next-auth"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw CommonError
  }

  let reports: Array<Report> = []
  try {
    reports = await reportService.getReports(session)
  } catch (error) {
    if (error instanceof BaseError) {
      handleError(error)
    }
    throw CommonError
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="flex justify-end mb-3">
          <NewButton />
        </div>
        <Card>
          {reports.length ? (
            <ReportTable reports={reports} />
          ) : (
            <p>{messages.reportNotExistMessage}</p>
          )}
        </Card>
      </div>
    </div>
  )
}

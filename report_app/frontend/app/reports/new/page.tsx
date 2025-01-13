import BackButton from "@/components/buttons/back"
import CreateReportForm from "@/components/forms/report/create"

export default function NewReportPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <div>
          <BackButton />
        </div>
        <CreateReportForm />
      </div>
    </div>
  )
}

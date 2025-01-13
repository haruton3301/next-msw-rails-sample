"use client"

import Card from "@/components/common/Card"
import messages from "@/lib/constants/messages"
import { CommonError } from "@/lib/errors/base"
import { reportService } from "@/lib/services"
import { ReportData, reportSchema } from "@/lib/validations/report"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import TextInput from "../common/Input"
import FormLabel from "../common/Label"
import SubmitButton from "../common/SubmitButton"
import TextArea from "../common/TextArea"
import FormTitle from "../common/Title"

type EditReportFormProps = {
  report: {
    id: string
    reported_at: string
    content: string
  }
}

export default function EditReportForm({ report }: EditReportFormProps) {
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reported_at: report.reported_at,
      content: report.content,
    },
  })

  const onSubmit: SubmitHandler<ReportData> = async (data) => {
    setIsSubmitting(true)
    try {
      if (!session) {
        throw new CommonError()
      }

      await reportService.updateReport(session, report.id, data)

      toast.success(messages.reportUpdatedMessage)
    } catch {
      toast.error(messages.commonMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        <FormTitle>日報の編集</FormTitle>

        <div className="space-y-1">
          <FormLabel>日付</FormLabel>
          <TextInput
            type="date"
            error={errors.reported_at?.message}
            {...register("reported_at")}
          />
        </div>

        <div className="space-y-1">
          <FormLabel>内容</FormLabel>
          <TextArea
            rows={5}
            error={errors.content?.message}
            {...register("content")}
          />
        </div>

        <div className="pt-3">
          <SubmitButton disabled={isSubmitting}>更新</SubmitButton>
        </div>
      </form>
    </Card>
  )
}

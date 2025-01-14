"use client"

import Card from "@/components/common/Card"
import messages from "@/lib/constants/messages"
import { CommonError } from "@/lib/errors/base"
import { reportService } from "@/lib/services"
import { getTodayIsoString } from "@/lib/utils/date"
import { ReportData, reportSchema } from "@/lib/validations/report"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import TextInput from "../common/Input"
import FormLabel from "../common/Label"
import SubmitButton from "../common/SubmitButton"
import TextArea from "../common/TextArea"
import FormTitle from "../common/Title"

export default function CreateReportForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reported_at: getTodayIsoString(),
    },
  })

  const onSubmit: SubmitHandler<ReportData> = async (data) => {
    setIsSubmitting(true)
    try {
      if (!session) {
        throw new CommonError()
      }

      const createdReport = await reportService.createReport(session, data)

      toast.success(messages.reportCreatedMessage)
      router.push(`/reports/${createdReport.id}`)
      router.refresh()
    } catch {
      toast.error(messages.commonMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        <FormTitle>日報の新規作成</FormTitle>

        <div className="space-y-1">
          <FormLabel htmlFor="date">日付</FormLabel>
          <TextInput
            id="date"
            type="date"
            error={errors.reported_at?.message}
            {...register("reported_at")}
          />
        </div>

        <div className="space-y-1">
          <FormLabel htmlFor="content">内容</FormLabel>
          <TextArea
            id="content"
            rows={5}
            error={errors.content?.message}
            {...register("content")}
          />
        </div>

        <div className="pt-3">
          <SubmitButton disabled={isSubmitting}>作成</SubmitButton>
        </div>
      </form>
    </Card>
  )
}

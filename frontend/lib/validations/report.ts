import { z } from "zod"
import messages from "../constants/messages"

export const reportSchema = z.object({
  reported_at: z.string().nonempty(messages.requiredMessage),
  content: z.string().nonempty(messages.requiredMessage),
})

export type ReportData = z.infer<typeof reportSchema>

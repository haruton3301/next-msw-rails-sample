import { z } from "zod"
import messages from "../constants/messages"

export const registerSchema = z.object({
  name: z.string().nonempty({ message: messages.requiredMessage }),
  email: z
    .string()
    .nonempty({ message: messages.requiredMessage })
    .email({ message: messages.emailInvalidFormtMessage }),
  password: z
    .string()
    .nonempty({ message: messages.requiredMessage })
    .min(6, { message: messages.passwordMinimumSizeMessage }),
})

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: messages.requiredMessage })
    .email({ message: messages.emailInvalidFormtMessage }),
  password: z.string().nonempty({ message: messages.requiredMessage }),
})

export type RegisterData = z.infer<typeof registerSchema>
export type LoginData = z.infer<typeof loginSchema>

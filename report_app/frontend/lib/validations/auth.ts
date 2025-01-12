import { z } from "zod"
import messages from "../constants/messages"

export const registerSchema = z.object({
  name: z.string().min(1, { message: messages.requiredMessage }),
  email: z.string().email({ message: messages.emailInvalidFormtMessage }),
  password: z.string().min(6, { message: messages.passwordMinimumSizeMessage }),
})

export const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(6, "パスワードは6文字以上である必要があります"),
})

export type RegisterData = z.infer<typeof registerSchema>
export type LoginData = z.infer<typeof loginSchema>

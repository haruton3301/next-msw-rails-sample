"use client"

import messages from "@/lib/constants/messages"
import { LoginData, loginSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import FormCard from "./common/Card"
import TextInput from "./common/Input"
import FormLabel from "./common/Label"
import SubmitButton from "./common/SubmitButton"
import FormTitle from "./common/Title"

export default function LoginForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (response?.error) {
        setIsSubmitting(false)
        toast.error(response.error)
      } else {
        toast.success(messages.loginSuccessfulMessage)
        router.push("/")
        router.refresh()
      }
    } catch {
      setIsSubmitting(false)
      toast.error(messages.commonMessage)
    }
  }

  return (
    <FormCard>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        <FormTitle>ログイン</FormTitle>

        <div className="space-y-1">
          <FormLabel>メールアドレス</FormLabel>
          <TextInput
            type="email"
            error={errors.email?.message} // エラーメッセージを渡す
            {...register("email")}
          />
        </div>

        <div className="space-y-1">
          <FormLabel>パスワード</FormLabel>
          <TextInput
            type="password"
            error={errors.password?.message} // エラーメッセージを渡す
            {...register("password")}
          />
        </div>

        <div className="pt-3">
          <SubmitButton disabled={isSubmitting}>ログイン</SubmitButton>
        </div>
      </form>
    </FormCard>
  )
}

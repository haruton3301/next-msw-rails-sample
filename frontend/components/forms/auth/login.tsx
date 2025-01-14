"use client"

import Card from "@/components/common/Card"
import messages from "@/lib/constants/messages"
import { LoginData, loginSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import TextInput from "../common/Input"
import FormLabel from "../common/Label"
import SubmitButton from "../common/SubmitButton"
import FormTitle from "../common/Title"

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
    <Card className="max-w-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        <FormTitle>ログイン</FormTitle>

        <div className="space-y-1">
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <TextInput
            id="email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="space-y-1">
          <FormLabel htmlFor="password">パスワード</FormLabel>
          <TextInput
            id="password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>

        <div className="pt-3">
          <SubmitButton disabled={isSubmitting}>ログイン</SubmitButton>
        </div>
      </form>
    </Card>
  )
}

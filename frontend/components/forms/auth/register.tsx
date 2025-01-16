"use client"

import messages from "@/lib/constants/messages"
import { EmailAlreadyTakenError } from "@/lib/errors/auth"
import { BaseError, CommonError } from "@/lib/errors/base"
import { authService } from "@/lib/services"
import { RegisterData, registerSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import Card from "@/components/common/Card"
import { handleError } from "@/lib/utils/error"
import TextInput from "../common/Input"
import FormLabel from "../common/Label"
import SubmitButton from "../common/SubmitButton"
import FormTitle from "../common/Title"

export default function RegisterForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    setIsSubmitting(true)
    try {
      await authService.signUp(data)

      // 登録処理後にログインする
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (response?.error) {
        toast.error(response.error)
      } else {
        toast.success(messages.registerSuccessfulMessage)
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      setIsSubmitting(false)

      if (error instanceof BaseError) {
        handleError(error)
      }

      if (error instanceof EmailAlreadyTakenError) {
        toast.error(error.message)
      } else if (error instanceof CommonError) {
        toast.error(error.message)
      } else {
        toast.error(messages.commonMessage)
      }
    }
  }

  return (
    <Card className="max-w-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        <FormTitle>ユーザー登録</FormTitle>

        <div className="space-y-1">
          <FormLabel htmlFor="name">ユーザー名</FormLabel>
          <TextInput
            id="name"
            type="text"
            error={errors.name?.message}
            {...register("name")}
          />
        </div>

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
          <SubmitButton disabled={isSubmitting}>登録</SubmitButton>
        </div>
      </form>
    </Card>
  )
}

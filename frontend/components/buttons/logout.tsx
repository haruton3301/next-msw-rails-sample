"use client"

import messages from "@/lib/constants/messages"
import { BaseError, CommonError } from "@/lib/errors/base"
import { authService } from "@/lib/services"
import { handleError } from "@/lib/utils/error"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function LogoutButton() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      if (!session) {
        throw new CommonError()
      }

      await authService.signOut(session)
      await signOut({ redirect: false })
      toast.success(messages.logoutSuccessfulMessage)
      router.push("login")
      router.refresh()
    } catch (error) {
      if (error instanceof BaseError) {
        handleError(error)
      }
      toast.error(messages.commonMessage)
    }
  }

  return (
    <a onClick={handleSignOut} className="btn">
      ログアウト
    </a>
  )
}

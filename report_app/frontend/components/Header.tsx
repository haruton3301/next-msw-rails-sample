"use client"

import messages from "@/lib/constants/messages"
import { CommonError } from "@/lib/errors/base"
import { authService } from "@/lib/services"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function Header() {
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
    } catch {
      toast.error(messages.commonMessage)
    }
  }

  return (
    <header className="sticky top-0 left-0 w-full p-3">
      <div className="navbar bg-base-100 rounded-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">日報アプリ</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 flex items-center gap-3">
            {!session ? (
              <>
                <li>
                  <a href="/register" className="btn">
                    ユーザー登録
                  </a>
                </li>
                <li>
                  <a href="/login" className="btn">
                    ログイン
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="font-bold text-lg">{session.user?.name}</li>
                <li>
                  <a onClick={handleSignOut} className="btn">
                    ログアウト
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}

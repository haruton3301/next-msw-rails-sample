"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import LogoutButton from "./buttons/logout"

export default function Header() {
  const { data: session } = useSession()
  const isLoggedIn = !!session
  const name = session?.user.name || ""

  return (
    <header className="sticky top-0 left-0 w-full p-3">
      <div className="navbar bg-base-100 rounded-lg">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            日報アプリ
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <li>
                  <Link href="/register" className="btn">
                    ユーザー登録
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="btn">
                    ログイン
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="font-bold text-lg">{name}</li>
                <li>
                  <LogoutButton />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}

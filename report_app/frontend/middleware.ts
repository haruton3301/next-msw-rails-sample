import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const publicPages = ["/login", "/register"]

  const path = req.nextUrl.pathname

  // 静的ファイルやAPIリクエストを除外
  if (
    path.startsWith("/_next") || // Next.jsのビルドファイル
    path.startsWith("/api") || // APIリクエスト
    path.startsWith("/favicon.ico") || // Favicon
    path.startsWith("/public") // publicディレクトリ内のファイル
  ) {
    return NextResponse.next()
  }

  // 非ログイン状態でpublicPages以外にアクセスした場合、ログインページにリダイレクト
  if (!token && !publicPages.includes(path)) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // ログインしているユーザーがloginまたはregisterページにアクセスした場合、ルートにリダイレクト
  if (token && publicPages.includes(path)) {
    const url = req.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

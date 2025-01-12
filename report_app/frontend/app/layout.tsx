import Header from "@/components/Header"
import { NextAuthProvider } from "@/components/providers/NextAuthProvider"
import { authOptions } from "@/lib/auth_options"
import clsx from "clsx"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Noto_Sans_JP } from "next/font/google"
import { ToastContainer } from "react-toastify"
import "./globals.css"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: "日報アプリ",
  description: "日報を書けます",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="ja">
      <body className={clsx(notoSansJP.variable, "font-sans bg-slate-100")}>
        <NextAuthProvider session={session}>
          <Header />
          <main className="px-4 py-6">{children}</main>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </NextAuthProvider>
      </body>
    </html>
  )
}

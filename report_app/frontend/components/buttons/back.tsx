"use client"

import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa6"

export default function BackButton() {
  return (
    <Link href="/" className="btn btn-ghost">
      <FaArrowLeft size={18} />
      戻る
    </Link>
  )
}

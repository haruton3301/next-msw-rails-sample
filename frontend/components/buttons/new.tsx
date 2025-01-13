"use client"

import Link from "next/link"
import { FaPlus } from "react-icons/fa6"

export default function NewButton() {
  return (
    <Link href="/reports/new" className="btn btn-primary">
      <FaPlus size={18} />
      新規作成
    </Link>
  )
}

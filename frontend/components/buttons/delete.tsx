"use client"

import messages from "@/lib/constants/messages"
import { BaseError, CommonError } from "@/lib/errors/base"
import { reportService } from "@/lib/services"
import { handleError } from "@/lib/utils/error"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaTrashCan } from "react-icons/fa6"
import { toast } from "react-toastify"

type DeleteButtonProps = {
  reportId: string
}

export default function DeleteButton({ reportId }: DeleteButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDelete = async () => {
    try {
      if (!session) {
        throw new CommonError()
      }

      await reportService.deleteReport(session, reportId)
      toast.success(messages.reportDeletedMessage)
      router.push("/")
      router.refresh()
    } catch (error) {
      if (error instanceof BaseError) {
        handleError(error)
      }
      toast.error(messages.commonMessage)
    } finally {
      setIsModalOpen(false)
    }
  }

  return (
    <div>
      <a
        onClick={() => setIsModalOpen(true)}
        className="btn btn-ghost text-error"
      >
        <FaTrashCan size={16} />
        削除
      </a>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-lg">本当に削除しますか？</h2>
            <div className="modal-action">
              <button onClick={handleDelete} className="btn btn-error">
                削除
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

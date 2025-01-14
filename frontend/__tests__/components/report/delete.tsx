import DeleteButton from "@/components/buttons/delete"
import messages from "@/lib/constants/messages"
import { validDummySession } from "@/mocks/data/auth"
import { server } from "@/mocks/setup/server"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useSession } from "next-auth/react"
import { ToastContainer } from "react-toastify"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}))

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("DeleteButton", () => {
  const reportId = "1"

  it("should delete a report successfully", async () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: validDummySession,
    })

    render(
      <>
        <DeleteButton reportId={reportId} />
        <ToastContainer />
      </>,
    )

    fireEvent.click(screen.getByText(/削除/i))
    fireEvent.click(screen.getByRole("button", { name: /削除/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.reportDeletedMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should show error message when report ID does not exist", async () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: validDummySession,
    })

    const nonExistingReportId = "9999"

    render(
      <>
        <DeleteButton reportId={nonExistingReportId} />
        <ToastContainer />
      </>,
    )

    fireEvent.click(screen.getByText(/削除/i))
    fireEvent.click(screen.getByRole("button", { name: /削除/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.commonMessage)).toBeInTheDocument(),
    )
  })

  it("should show error message if session is null", async () => {
    ;(useSession as jest.Mock).mockReturnValue({ data: null })

    render(
      <>
        <DeleteButton reportId={reportId} />
        <ToastContainer />
      </>,
    )

    fireEvent.click(screen.getByText(/削除/i))
    fireEvent.click(screen.getByRole("button", { name: /削除/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.commonMessage)).toBeInTheDocument(),
    )
  })
})

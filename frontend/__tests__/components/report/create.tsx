import CreateReportForm from "@/components/forms/report/create"
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

describe("CreateReportForm", () => {
  it("should create report successfully", async () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: validDummySession,
    })

    render(
      <>
        <CreateReportForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("日付"), {
      target: { value: "2025-01-14" },
    })
    fireEvent.change(screen.getByLabelText("内容"), {
      target: { value: "Test content" },
    })
    fireEvent.click(screen.getByRole("button", { name: /作成/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.reportCreatedMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should show validation error when date is empty", async () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: validDummySession,
    })

    render(
      <>
        <CreateReportForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("日付"), {
      target: { value: "" },
    })
    fireEvent.change(screen.getByLabelText("内容"), {
      target: { value: "Test content" },
    })
    fireEvent.click(screen.getByRole("button", { name: /作成/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should show validation error when content is empty", async () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: validDummySession,
    })

    render(
      <>
        <CreateReportForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("日付"), {
      target: { value: "2025-01-14" },
    })
    fireEvent.change(screen.getByLabelText("内容"), {
      target: { value: "" },
    })
    fireEvent.click(screen.getByRole("button", { name: /作成/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should show error message if session is not available", async () => {
    ;(useSession as jest.Mock).mockReturnValue({ data: null })

    render(
      <>
        <CreateReportForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("日付"), {
      target: { value: "2025-01-14" },
    })
    fireEvent.change(screen.getByLabelText("内容"), {
      target: { value: "Test content" },
    })
    fireEvent.click(screen.getByRole("button", { name: /作成/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.commonMessage)).toBeInTheDocument(),
    )
  })
})

import EditReportForm from "@/components/forms/report/edit"
import messages from "@/lib/constants/messages"
import { validDummySession } from "@/mocks/data/auth"
import { mockReports } from "@/mocks/data/report"
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

describe("EditReportForm", () => {
  const mockReport = mockReports[0]

  it("should load existing report data into the form", () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: validDummySession,
    })

    render(<EditReportForm report={mockReport} />)

    const dateInput = screen.getByLabelText("日付")
    const contentInput = screen.getByLabelText("内容")

    expect(dateInput).toHaveValue(mockReport.reported_at)
    expect(contentInput).toHaveValue(mockReport.content)
  })

  it("should update report successfully", async () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: validDummySession,
    })

    render(
      <>
        <EditReportForm report={mockReport} />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("日付"), {
      target: { value: "2025-01-15" },
    })
    fireEvent.change(screen.getByLabelText("内容"), {
      target: { value: "Updated report content" },
    })
    fireEvent.click(screen.getByRole("button", { name: /更新/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.reportUpdatedMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should show validation error when date is empty", async () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: validDummySession,
    })

    render(
      <>
        <EditReportForm report={mockReport} />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("日付"), {
      target: { value: "" },
    })
    fireEvent.change(screen.getByLabelText("内容"), {
      target: { value: "Updated report content" },
    })
    fireEvent.click(screen.getByRole("button", { name: /更新/i }))

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
        <EditReportForm report={mockReport} />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("日付"), {
      target: { value: "2025-01-15" },
    })
    fireEvent.change(screen.getByLabelText("内容"), {
      target: { value: "" },
    })
    fireEvent.click(screen.getByRole("button", { name: /更新/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should show error message if session is not available", async () => {
    ;(useSession as jest.Mock).mockReturnValue({ data: null })

    render(
      <>
        <EditReportForm report={mockReport} />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("日付"), {
      target: { value: "2025-01-15" },
    })
    fireEvent.change(screen.getByLabelText("内容"), {
      target: { value: "Updated report content" },
    })
    fireEvent.click(screen.getByRole("button", { name: /更新/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.commonMessage)).toBeInTheDocument(),
    )
  })
})

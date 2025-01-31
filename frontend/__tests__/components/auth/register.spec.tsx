import RegisterForm from "@/components/forms/auth/register"
import messages from "@/lib/constants/messages"
import { server } from "@/mocks/setup/server"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { signIn } from "next-auth/react"
import { ToastContainer } from "react-toastify"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}))

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("RegisterForm", () => {
  it("should show error message for already taken email", async () => {
    render(
      <>
        <RegisterForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("ユーザー名"), {
      target: { value: "John Doe" },
    })
    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "user@example.com" },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password123" },
    })
    fireEvent.click(screen.getByRole("button", { name: /登録/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.emailAlreadyTakenMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should show error message for missing name", async () => {
    render(
      <>
        <RegisterForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "test@example.com" },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password123" },
    })
    fireEvent.click(screen.getByRole("button", { name: /登録/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should show error message for missing email", async () => {
    render(
      <>
        <RegisterForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("ユーザー名"), {
      target: { value: "John Doe" },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password123" },
    })
    fireEvent.click(screen.getByRole("button", { name: /登録/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should show error message for invalid email format", async () => {
    render(
      <>
        <RegisterForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("ユーザー名"), {
      target: { value: "John Doe" },
    })
    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "invalid@email" },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password123" },
    })
    fireEvent.click(screen.getByRole("button", { name: /登録/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.emailInvalidFormtMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should show error message for missing password", async () => {
    render(
      <>
        <RegisterForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("ユーザー名"), {
      target: { value: "John Doe" },
    })
    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "test@example.com" },
    })
    fireEvent.click(screen.getByRole("button", { name: /登録/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should register successfully", async () => {
    ;(signIn as jest.Mock).mockResolvedValueOnce({ error: null })

    render(
      <>
        <RegisterForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("ユーザー名"), {
      target: { value: "John Doe" },
    })
    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "valid@example.com" },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password123" },
    })
    fireEvent.click(screen.getByRole("button", { name: /登録/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.registerSuccessfulMessage),
      ).toBeInTheDocument(),
    )
  })
})

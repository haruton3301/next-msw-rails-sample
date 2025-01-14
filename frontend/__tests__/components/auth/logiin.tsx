import LoginForm from "@/components/forms/auth/login"
import messages from "@/lib/constants/messages"
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

describe("LoginForm", () => {
  it("should show error message for invalid credentials", async () => {
    ;(signIn as jest.Mock).mockResolvedValueOnce({
      error: messages.invalidCredentialsMessage,
    })

    render(
      <>
        <LoginForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "invalid@example.com" },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "wrongpassword" },
    })
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.invalidCredentialsMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should show error message for missing email", async () => {
    render(
      <>
        <LoginForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password123" },
    })
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should show error message for invalid email format", async () => {
    render(
      <>
        <LoginForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "invalid@email" },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password123" },
    })
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.emailInvalidFormtMessage),
      ).toBeInTheDocument(),
    )
  })

  it("should show error message for missing password", async () => {
    render(
      <>
        <LoginForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "test@example.com" },
    })
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }))

    await waitFor(() =>
      expect(screen.getByText(messages.requiredMessage)).toBeInTheDocument(),
    )
  })

  it("should login successfully", async () => {
    ;(signIn as jest.Mock).mockResolvedValueOnce({ error: null })

    render(
      <>
        <LoginForm />
        <ToastContainer />
      </>,
    )

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "valid@example.com" },
    })
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password123" },
    })
    fireEvent.click(screen.getByRole("button", { name: /ログイン/i }))

    await waitFor(() =>
      expect(
        screen.getByText(messages.loginSuccessfulMessage),
      ).toBeInTheDocument(),
    )
  })
})

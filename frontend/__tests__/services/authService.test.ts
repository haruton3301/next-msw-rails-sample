import {
  EmailAlreadyTakenError,
  InvalidCredentialsError,
} from "@/lib/errors/auth"
import AuthService from "@/lib/services/authService"
import {
  invalidDummySession,
  mockPassword,
  mockUser,
  validDummySession,
} from "@/mocks/data/auth"
import { server } from "@/mocks/setup/server"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("AuthService", () => {
  let authService: AuthService

  beforeEach(() => {
    authService = new AuthService()
  })

  describe("signUp", () => {
    it("should handle successful sign up", async () => {
      const response = await authService.signUp({
        name: "newUser",
        email: "newuser@example.com",
        password: mockPassword,
      })
      expect(response).toBeUndefined()
    })

    it("should handle email already taken error", async () => {
      await expect(
        authService.signUp({
          name: mockUser.name,
          email: mockUser.email,
          password: mockPassword,
        }),
      ).rejects.toThrow(EmailAlreadyTakenError)
    })
  })

  describe("signIn", () => {
    it("should handle successful sign in", async () => {
      const { authHeaders, user } = await authService.signIn({
        email: mockUser.email,
        password: mockPassword,
      })

      expect(user).toEqual(mockUser)
      expect(authHeaders).toEqual(validDummySession.user)
    })

    it("should handle invalid credentials error", async () => {
      await expect(
        authService.signIn({
          email: mockUser.email,
          password: "InvalidPassword",
        }),
      ).rejects.toThrow(InvalidCredentialsError)
    })
  })

  describe("signOut", () => {
    it("should handle successful sign out", async () => {
      await authService.signOut(validDummySession)
    })

    it("should handle unauthorized sign out", async () => {
      await expect(authService.signOut(invalidDummySession)).rejects.toThrow()
    })
  })
})

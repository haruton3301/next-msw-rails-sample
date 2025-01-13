import { http, HttpResponse, RequestHandler } from "msw"

const mockUser = {
  id: 1,
  email: "user@example.com",
  name: "Mock User",
}

const mockAuthHeaders = {
  "access-token": "mockAccessToken",
  client: "mockClient",
  expiry: "2025-01-14T12:00:00Z",
  uid: mockUser.email,
}

export const createAuthHandlers = (mockEndPoint: string): RequestHandler[] => {
  return [
    http.post(`${mockEndPoint}/v1/auth`, async ({ request }) => {
      const body = await request.json()
      const { email } = body as { email: string }

      if (email === mockUser.email) {
        return HttpResponse.json(
          { errors: { email: ["has already been taken"] } },
          { status: 422 },
        )
      }

      return HttpResponse.json(null, { status: 201 })
    }),

    http.post(`${mockEndPoint}/v1/auth/sign_in`, async ({ request }) => {
      const body = await request.json()
      const { email, password } = body as { email: string; password: string }

      if (email === mockUser.email && password === "password") {
        return HttpResponse.json(
          { data: { ...mockUser } },
          {
            status: 200,
            headers: mockAuthHeaders,
          },
        )
      }

      return HttpResponse.json(
        { errors: ["Invalid login credentials. Please try again."] },
        { status: 401 },
      )
    }),

    http.delete(`${mockEndPoint}/v1/auth/sign_out`, ({ request }) => {
      const accessToken = request.headers.get("access-token")

      if (accessToken === mockAuthHeaders["access-token"]) {
        return HttpResponse.text(null, { status: 200 })
      }

      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
    }),
  ]
}

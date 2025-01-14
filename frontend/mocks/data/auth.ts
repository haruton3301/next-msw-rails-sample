import { Session } from "next-auth"

export const mockUser = {
  id: 1,
  email: "user@example.com",
  name: "Mock User",
}

export const mockPassword = "password123"

export const mockAuthHeaders = {
  "access-token": "mockAccessToken",
  client: "mockClient",
  expiry: "2025-01-14T12:00:00Z",
  uid: mockUser.email,
}

export const validDummySession: Session = {
  user: {
    accessToken: mockAuthHeaders["access-token"],
    client: mockAuthHeaders.client,
    expiry: mockAuthHeaders.expiry,
    uid: mockAuthHeaders.uid,
  },
} as unknown as Session

export const invalidDummySession: Session = {
  user: {
    accessToken: "invalid-access-token",
    client: mockAuthHeaders.client,
    uid: mockAuthHeaders.uid,
  },
} as unknown as Session

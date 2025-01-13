export const mockUser = {
  id: 1,
  email: "user@example.com",
  name: "Mock User",
}

export const mockAuthHeaders = {
  "access-token": "mockAccessToken",
  client: "mockClient",
  expiry: "2025-01-14T12:00:00Z",
  uid: mockUser.email,
}

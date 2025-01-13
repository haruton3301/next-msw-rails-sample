export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_MOCK_MODE === "true"
  ) {
    await import("@/mocks")
  }
}

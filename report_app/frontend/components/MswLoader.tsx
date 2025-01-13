"use client"

if (
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_MOCK_MODE === "true"
) {
  await import("@/mocks")
}

export default function MswLoader() {
  return <></>
}

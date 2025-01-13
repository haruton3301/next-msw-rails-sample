import { initMocks } from "./setup"

initMocks()

export {}

// export function initNextMock() {
//   if (
//     process.env.NEXT_RUNTIME === "nodejs" &&
//     process.env.NODE_ENV === "development" &&
//     process.env.NEXT_MOCK_MODE === "true"
//   ) {
//     console.log("Mock Initialized")
//     initMocks()
//   }
// }

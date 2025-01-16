import { BaseError } from "../errors/base"

export const handleError = (error: BaseError): void => {
  if (process.env.NODE_ENV === "development") {
    console.error("Error Name:", error.name)
    console.error("Error Message:", error.message)
    console.error("Stack Trace:", error.stack)
  } else {
    console.error("An error occurred. Please try again later.")
  }
}

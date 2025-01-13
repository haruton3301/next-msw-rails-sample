import validationMessage from "../constants/messages"

export class BaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "Error"
  }
}

export class CommonError extends BaseError {
  constructor() {
    super(validationMessage.commonMessage)
    this.name = "CommonError"
  }
}

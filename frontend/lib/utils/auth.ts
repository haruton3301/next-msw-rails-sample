import { Session } from "next-auth"
import { AuthHeaders, User } from "../types/auth"

export async function extractUser(response: Response): Promise<User> {
  const {
    data: { id, name, email },
  } = await response.json()

  if (!id || !name || !email) {
    throw new Error("Invalid user data")
  }

  return {
    id,
    name,
    email,
  }
}

export function extractAuthHeaders(response: Response): AuthHeaders {
  const accessToken = response.headers.get("access-token")
  const client = response.headers.get("client")
  const expiry = response.headers.get("expiry")
  const uid = response.headers.get("uid")

  if (!accessToken || !client || !expiry || !uid) {
    throw new Error("Credentials could not be obtained correctly")
  }

  return {
    accessToken,
    client,
    expiry,
    uid,
  }
}

export function sessionToAuthHeaders(session: Session) {
  const { user } = session

  return {
    "access-token": user.accessToken,
    client: user.client,
    uid: user.uid,
  }
}

import { AuthHeaders, User } from "@/lib/types/auth"
import "next-auth"

declare module "next-auth" {
  interface User extends User, AuthHeaders {}

  interface Session {
    user: User & AuthHeaders
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User, AuthHeaders {}
}

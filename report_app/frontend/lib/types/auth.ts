export interface SignUpParams {
  name: string
  email: string
  password: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthHeaders {
  accessToken: string
  client: string
  expiry: string
  uid: string
}

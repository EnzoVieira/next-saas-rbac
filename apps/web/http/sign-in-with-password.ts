import { api } from './api-client'

interface SignInPasswordRequest {
  email: string
  password: string
}

interface SignInPasswordResponse {
  token: string
}

export async function signInWithPassword({
  email,
  password,
}: SignInPasswordRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInPasswordResponse>()

  return result
}

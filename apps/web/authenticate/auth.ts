import { getProfile } from '@/http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export function isAuthenticated() {
  return !!cookies().get('next-saas:token')?.value
}

export async function auth() {
  const token = cookies().get('next-saas:token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (err) {
    console.error(err)
  }

  redirect('/api/auth/sign-out')
}

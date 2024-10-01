import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { acceptInvite } from '@/http/accept-invite'
import { signInWithPassword } from '@/http/sign-in-with-github'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'GitHub OAuth code was not found' },
      { status: 400 },
    )
  }

  const { token } = await signInWithPassword({ code })

  cookies().set('next-saas:token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  const inviteId = cookies().get('inviteId')?.value

  if (inviteId) {
    try {
      await acceptInvite(inviteId)
      cookies().delete('inviteId')
    } catch {}
  }

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}

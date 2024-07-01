'use server'

import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSinInURL = new URL('login/oauth/authorize', 'https://github.com')

  githubSinInURL.searchParams.set('client_id', 'Ov23liaxg0Riqj7KAHJB')
  githubSinInURL.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback'
  )
  githubSinInURL.searchParams.set('scope', 'user')

  redirect(githubSinInURL.toString())
}

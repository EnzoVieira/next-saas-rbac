'use server'

import { env } from '@repo/env'
import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSinInURL = new URL('login/oauth/authorize', 'https://github.com')

  githubSinInURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubSinInURL.searchParams.set(
    'redirect_uri',
    env.GITHUB_OAUTH_CLIENT_REDIRECT_URI
  )
  githubSinInURL.searchParams.set('scope', 'user')

  redirect(githubSinInURL.toString())
}

import ky from 'ky'
import { getCookie } from 'cookies-next'
import { env } from '@repo/env'
import type { CookiesFn } from 'cookies-next/lib/types'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        // Running on the server
        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          cookieStore = serverCookies
        }

        const token = getCookie('next-saas:token', { cookies: cookieStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})

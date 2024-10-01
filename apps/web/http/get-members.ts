import { Role } from '@repo/auth'

import { api } from './api-client'

interface GetMembersResponse {
  members: {
    name: string | null
    id: string
    avatarUrl: string | null
    role: Role
    userId: string
    email: string
  }[]
}

export async function getMembers(org: string) {
  const result = await api
    .get(`organizations/${org}/members`, { next: { tags: [`${org}/members`] } })
    .json<GetMembersResponse>()

  return result
}

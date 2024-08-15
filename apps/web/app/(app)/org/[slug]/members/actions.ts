'use server'

import { getCurrentOrg } from '@/authenticate/auth'
import { removeMember } from '@/http/remove-member'
import { updateMember } from '@/http/update-member'
import { Role } from '@repo/auth'
import { revalidateTag } from 'next/cache'

export async function removeMemberAction(memberId: string) {
  const currentOrg = getCurrentOrg()

  await removeMember({ org: currentOrg!, memberId })

  revalidateTag(`${currentOrg}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = getCurrentOrg()

  await updateMember({ org: currentOrg!, memberId, role })

  revalidateTag(`${currentOrg}/members`)
}

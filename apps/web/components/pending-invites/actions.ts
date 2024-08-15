'use server'

import { acceptInvite } from '@/http/accept-invite'
import { rejectInvite } from '@/http/reject-invite'
import { revalidateTag } from 'next/cache'

export async function acceptInviteAction(inviteId: string) {
  await acceptInvite(inviteId)

  revalidateTag('organizations')
}

export async function rejectInviteAction(inviteId: string) {
  await rejectInvite(inviteId)

  revalidateTag('organizations')
}

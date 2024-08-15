'use server'

import { z } from 'zod'

import { HTTPError } from 'ky'
import { createOrganization } from '@/http/create-organization'
import { getCurrentOrg } from '@/authenticate/auth'
import { updateOrganization } from '@/http/update-organization'
import { revalidateTag } from 'next/cache'

const organizationSchema = z
  .object({
    name: z.string().min(4, { message: 'Include at least 4 characters' }),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

            return domainRegex.test(value)
          }

          return true
        },
        { message: 'Enter a valid domain' }
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === 'on' || value === true)
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }

      return true
    },
    {
      message: 'Domain is required when auto-join is enabled',
      path: ['domain'],
    }
  )

export type OrganizationSchema = z.infer<typeof organizationSchema>

export async function createOrganizationAction(data: FormData) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { name, domain, shouldAttachUsersByDomain } = result.data

    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    revalidateTag('organizations')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization',
    errors: null,
  }
}

export async function updateOrganizationAction(data: FormData) {
  const currentOrg = getCurrentOrg()
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { name, domain, shouldAttachUsersByDomain } = result.data

    await updateOrganization({
      org: currentOrg!,
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    revalidateTag('organizations')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization',
    errors: null,
  }
}

import {
  createMongoAbility,
  CreateAbility,
  MongoAbility,
  AbilityBuilder,
} from '@casl/ability'
import { z } from 'zod'
import { User } from './models/user'
import { permissions } from './permissions'
import { userSubject } from './subjects/user'
import { projectSubject } from './subjects/project'
import { organizationSubject } from './subjects/organization'
import { inviteSubject } from './subjects/invite'
import { billingSubject } from './subjects/billing'

export * from './models/organization'
export * from './models/project'
export * from './models/user'

const appAbilitiesSchema = z.union([
  projectSubject,
  userSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,

  z.tuple([z.literal('manage'), z.literal('all')]),
])
type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Unknown role: ${user.role}`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  return ability
}

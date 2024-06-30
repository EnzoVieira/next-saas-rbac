import { defineAbilityFor, userSchema, type Role } from '@repo/auth'

export function getUserPermissions(userId: string, role: Role) {
  const user = userSchema.parse({
    id: userId,
    role,
  })

  const ability = defineAbilityFor(user)

  return ability
}

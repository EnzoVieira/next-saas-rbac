import { Button } from './ui/button'
import { ability, getCurrentOrg } from '@/authenticate/auth'
import { NavLink } from './nav-link'

export async function Tabs() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  const canGetProjects = permissions?.can('get', 'Project')
  const canGetMembers = permissions?.can('get', 'User')

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        {canGetProjects && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground"
            asChild
          >
            <NavLink href={`/org/${currentOrg}`}>Projects</NavLink>
          </Button>
        )}

        {canGetMembers && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground"
            asChild
          >
            <NavLink href={`/org/${currentOrg}/members`}>Members</NavLink>
          </Button>
        )}

        {(canGetBilling || canUpdateOrganization) && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground"
            asChild
          >
            <NavLink href={`/org/${currentOrg}/settings`}>
              Settings & Billing
            </NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}

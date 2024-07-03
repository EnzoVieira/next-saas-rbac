import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { OrganizationForm } from '../../create-organization/organization-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create Organization</SheetTitle>
        </SheetHeader>

        <OrganizationForm />
      </InterceptedSheetContent>
    </Sheet>
  )
}

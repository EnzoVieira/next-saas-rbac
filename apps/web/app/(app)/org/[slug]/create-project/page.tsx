import { Header } from '@/components/header'
import { ProjectForm } from './project-form'
import { ability } from '@/authenticate/auth'
import { redirect } from 'next/navigation'

export default async function CreateProject() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Create Project</h1>

        <ProjectForm />
      </main>
    </div>
  )
}

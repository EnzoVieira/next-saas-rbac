import { auth } from '@/authenticate/auth'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const { user } = await auth()
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

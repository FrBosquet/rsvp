import { SignUp } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

// TODO: Check clerk getting started and do things right
export default async function Page() {
  const user = await currentUser()

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-500">
        <p>Ya estás registrado</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-500">
      <SignUp fallbackRedirectUrl="/private" />
    </div>
  )
}

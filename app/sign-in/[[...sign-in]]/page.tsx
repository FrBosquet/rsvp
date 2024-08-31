import { SignedOut, SignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()

  if (user) {
    redirect('/private')
  }

  return (
    <SignedOut>
      <div className="flex min-h-screen items-center justify-center bg-gray-300">
        <SignIn />
      </div>
    </SignedOut>
  )
}

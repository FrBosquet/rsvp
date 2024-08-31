'use client'

import { SignedIn, SignedOut, SignIn, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Page() {
  const user = useUser()

  if (user) {
    redirect('/private')
  }

  return (
    <>
      <SignedIn>Volver</SignedIn>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-gray-300">
          <SignIn />
        </div>
      </SignedOut>
    </>
  )
}

'use client'

import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs'

export default function Page() {
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

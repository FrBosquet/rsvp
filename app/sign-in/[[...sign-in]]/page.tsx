'use client'

import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <SignedIn>
        <Link href="/private">Dashboard</Link>
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-gray-300">
          <SignIn />
        </div>
      </SignedOut>
    </>
  )
}

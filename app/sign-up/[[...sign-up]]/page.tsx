import { SignedOut, SignUp } from '@clerk/nextjs'

export default async function Page() {
  return (
    <SignedOut>
      <div className="flex min-h-screen items-center justify-center bg-gray-300">
        <SignUp />
      </div>
    </SignedOut>
  )
}

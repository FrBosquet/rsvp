import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <div className="flex min-h-screen items-center justify-center bg-slate-500">
    <SignUp afterSignUpUrl='/private'
      afterSignInUrl='/private' />
  </div>
}

import { UserButton } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function PrivatePage() {
  const { userId } = auth()

  const user = await currentUser()

  return <section className="container mx-auto flex flex-col gap-3 p-4">
    <header className="flex w-full items-center justify-between gap-2 rounded-2xl py-4">
      <h1 className="text-lg font-bold uppercase">Tus eventos</h1>
      <UserButton afterSignOutUrl='/'
        showName />
    </header>

    {userId} {user?.fullName}
  </section>
}

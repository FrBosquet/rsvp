import { prisma } from '@/lib/prisma'
import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Manager } from './manager'

interface Route {
  params: {
    slug: string
  }
}

export default async function EventDashboardPage({ params }: Route) {
  const { userId } = auth()
  const { slug } = params

  if (!userId) return redirect('/')

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  const isAdmin = user?.role === 'admin'

  const event = await prisma.event.findUnique({
    where: {
      slug
    },
    include: {
      users: {
        include: {
          user: true
        }
      }
    }
  })

  if (!event || (!isAdmin && !event?.users.some((userOnEvent) => userOnEvent.userId === userId))) {
    redirect('/private')
  }

  return <section className="container m-auto flex h-screen flex-col gap-3 p-4 text-reset">
    <header className="flex w-full items-center gap-4 rounded-2xl bg-slate-800 p-2 text-zinc-200 shadow-lg">
      <UserButton />
      <h1 className="text-lg uppercase">{event.name}</h1>
    </header>

    <Manager />
  </section>
}

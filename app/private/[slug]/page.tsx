import { prisma } from "@/lib/prisma";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Route = {
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

  return <section className="p-4 flex flex-col gap-2 [--letter-size:1rem] m-auto max-w-[1500px]">
    <menu className="w-full flex rounded-2xl bg-zinc-900 p-2 gap-2 text-zinc-200 items-center shadow-lg">
      <UserButton />
      <h1 className="uppercase text-lg">{event.name}</h1>
    </menu>
  </section>
}
import { EventItem } from '@/components/event-list/event-item'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function PrivatePage() {
  const clerkUser = await currentUser()

  if (!clerkUser) redirect('/sign-in')

  const user = await prisma.user.findUnique({
    where: {
      id: clerkUser.id
    }
  })

  // TODO: Handle user being created but not in the database yet
  if (!user) redirect('/sign-in')

  const { role } = user

  const isAdmin = role === 'admin'

  const events = await prisma.event.findMany({
    include: {
      users: {
        include: {
          user: true
        }
      }
    },
    where: isAdmin
      ? {}
      : {
        users: {
          some: {
            email: user.email
          }
        }
      }
  })

  const menu = <menu>
    <Link href="/private/new"
      className='contents'>
      <Button size="sm"
        variant="menu">
        <PlusCircle />
        Crear evento
      </Button>
    </Link>
  </menu>

  return <section className='flex flex-col gap-4'>
    {
      isAdmin && menu
    }
    <ul className='flex flex-col gap-2'>
      {events.map(event => {
        return <EventItem key={event.slug}
          event={event}
          currentUser={user} />
      })}
    </ul>
  </section>
}

import { EventItem } from '@/components/event-list/event-item'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { getUser } from '@/lib/server/user'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default async function PrivatePage() {
  const user = await getUser()

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

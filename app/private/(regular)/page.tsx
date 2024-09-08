import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { EventItem } from '@/components/event-list/event-item'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { getUserData } from '@/lib/server/user'
import { getTranslator } from '@/lib/translator'

const getWhereQuery = (isAdmin: boolean, email: string) => {
  if (isAdmin) {
    return {}
  }

  return {
    users: {
      some: {
        email
      }
    }
  }
}

export default async function PrivatePage() {
  const user = await getUserData()

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
    where: getWhereQuery(isAdmin, user.email)
  })

  const translator = getTranslator(user.prefs.language)

  const menu = (
    <menu>
      <Link className="contents" href="/private/new">
        <Button size="sm" variant="menu">
          <PlusCircle />
          {translator.intl('dashboard.create')}
        </Button>
      </Link>
    </menu>
  )

  return (
    <section className="flex flex-col gap-4">
      {isAdmin && menu}
      <ul className="flex flex-col gap-2">
        {events.map((event) => {
          return <EventItem key={event.slug} currentUser={user} event={event} />
        })}
      </ul>
    </section>
  )
}

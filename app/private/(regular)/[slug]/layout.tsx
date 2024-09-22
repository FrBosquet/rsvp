import React from 'react'

import { EventHeader } from '@/components/dashboard/event-header'
import { prisma } from '@/lib/prisma'
import { getUserData } from '@/lib/server/user'

interface Route {
  params: {
    slug: string
  }
  children: React.ReactNode
}

export default async function EventDashboardPage({ params, children }: Route) {
  const user = await getUserData()
  const { slug } = params
  const { role } = user

  const isAdmin = role === 'admin'

  const event = await prisma.event.findUnique({
    where: {
      slug
    },
    include: {
      users: {
        include: {
          user: true
        }
      },
      guests: {
        include: {
          host: true,
          notes: true
        },
        orderBy: {
          slug: 'asc'
        }
      }
    }
  })

  if (
    !event ||
    (!isAdmin &&
      !event?.users.some((userOnEvent) => userOnEvent.userId === user.id))
  ) {
    // TODO: How to handle this?
    return null
  }

  return (
    <section className="container flex h-s-screen flex-col gap-3 px-0 text-reset">
      <EventHeader serverEvent={event} />
      {children}
    </section>
  )
}

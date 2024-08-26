import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { EventHeader } from './_components/event-header'

interface Route {
  params: {
    slug: string
  }
  children: React.ReactNode
}

export default async function EventDashboardPage({ params, children }: Route) {
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

  if (!event || (!isAdmin && !event?.users.some((userOnEvent) => userOnEvent.userId === userId))) {
    redirect('/private')
  }

  return <section className="container m-auto flex h-s-screen flex-col gap-3 p-4 text-reset">
    <EventHeader serverEvent={event} />
    {children}
  </section>
}

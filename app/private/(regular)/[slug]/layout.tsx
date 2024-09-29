import React from 'react'

import { EventSidebar } from '@/components/dashboard/event/side-bar'

interface Route {
  params: {
    slug: string
  }
  children: React.ReactNode
}

export default async function EventDashboardPage({ children }: Route) {
  return (
    <section className="container flex h-s-screen px-0 text-reset">
      <EventSidebar />
      <section className="flex-1">{children}</section>
    </section>
  )
}

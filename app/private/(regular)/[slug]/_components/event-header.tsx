'use client'

import { type Event } from '@prisma/client'

import { useEvent } from '@/components/hooks/use-event'
import { Skeleton } from '@/components/ui/skeleton'
import { type GuestWithHost } from '@/types'

import { NavigationMenu } from './navigation-menu'

interface Props {
  serverEvent: Event & { guests: GuestWithHost[] }
}

export const EventHeader = ({ serverEvent }: Props) => {
  const { event, isReady } = useEvent(serverEvent)

  return (
    <header className="flex w-full items-center gap-4 rounded-2xl bg-slate-800 p-2 text-zinc-200 shadow-lg">
      <h1 className="flex-1 text-lg uppercase">
        {isReady ? (
          event?.name
        ) : (
          <Skeleton className="bg-slate-700">Jana y Odette</Skeleton>
        )}
      </h1>
      <NavigationMenu />
    </header>
  )
}

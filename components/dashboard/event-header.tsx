'use client'

import { type Event } from '@prisma/client'

import { useLegacyEvent } from '@/components/hooks/use-legacy-event'
import { Skeleton } from '@/components/ui/skeleton'
import { type GuestWithHost } from '@/types'

import { NavigationMenu } from './navigation-menu'

interface Props {
  serverEvent: Event & { guests: GuestWithHost[] }
}

export const EventHeader = ({ serverEvent }: Props) => {
  const { event, isReady } = useLegacyEvent(serverEvent)

  return (
    <header className="flex w-full items-center gap-4  border-b-2 py-4">
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

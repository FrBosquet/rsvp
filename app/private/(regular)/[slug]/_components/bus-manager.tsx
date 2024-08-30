/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { useMemo } from 'react'

import { useEvent } from '@/components/hooks/use-event'
import { Spinner } from '@/components/spinner'

import { GuestRow } from './guest-row'

export const BusManager = () => {
  const { isReady, updateGuest, deleteGuest, guests } = useEvent()

  const guestWithBus = useMemo(
    () =>
      (guests ?? []).filter((guest) =>
        guest.notes?.some(
          (note) => note.type === 'bus' && note.content === 'true'
        )
      ),
    [guests]
  )

  const pax = guestWithBus.reduce((acc, guest) => acc + (guest.amount ?? 0), 0)

  if (!isReady) return <Spinner /> // TODO: Add an skeleton

  return (
    <>
      <article className="flex w-full flex-col items-start gap-1 rounded-2xl bg-slate-700 p-3 text-zinc-200 shadow-md">
        <h2 className="font-semibold">Autobus</h2>
        <p>{pax} invitados usaran el autobus</p>
      </article>

      <article className="flex w-full flex-1 flex-col gap-4 overflow-y-auto rounded-2xl bg-gradient-to-br from-olive-900 to-olive-950 p-4 text-slate-200">
        {guestWithBus?.map((guest) => {
          return (
            <GuestRow
              key={guest.slug}
              guest={guest}
              onDeleteGuest={deleteGuest}
              onUpdateGuest={updateGuest}
            />
          )
        })}
      </article>
    </>
  )
}

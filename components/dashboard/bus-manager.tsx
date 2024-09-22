/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { useMemo } from 'react'

import { useEvent } from '@/components/hooks/use-event'
import { Spinner } from '@/components/spinner'

import { useIntl } from '../providers/translator'
import { GuestRow } from './guest-row'

export const BusManager = () => {
  const { t } = useIntl()
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
      <article className="flex w-full flex-col items-start gap-1 bg-zinc-200 p-3 shadow-inner">
        <h2 className="font-semibold">{t('event.bus.title')}</h2>
        <p className="text-sm">{t('event.bus.guests', { pax })}</p>
      </article>

      <article className="flex w-full flex-1 flex-col gap-4 overflow-y-auto rounded-2xl bg-gradient-to-br p-4">
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

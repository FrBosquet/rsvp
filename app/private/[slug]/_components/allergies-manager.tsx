/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { useEvent } from '@/components/hooks/use-event'
import { Spinner } from '@/components/spinner'
import { NOTES } from '@/types'
import { useMemo } from 'react'
import { GuestRow } from './guest-row'

export const AllergiesManager = () => {
  const { isReady, updateGuest, deleteGuest, guests } = useEvent()

  const guestWithAllergies = useMemo(() => (guests ?? []).filter(guest =>
    guest.notes?.some(note => note.type === NOTES.allergies))
    , [guests])

  const pax = guestWithAllergies.length

  if (!isReady) return <Spinner /> // TODO: Add an skeleton

  return (
    <>
      <article className="flex w-full flex-col items-start gap-1 rounded-2xl bg-slate-700 p-3 text-zinc-200 shadow-md">
        <h2 className='font-semibold'>Alergias</h2>
        <p>{pax} invitaciones se anotaron con alergias</p>
      </article>

      <article className="flex w-full flex-1 flex-col gap-2 rounded-2xl bg-gradient-to-b from-olive-900 to-olive-950/10 p-2 text-slate-200">
        {guestWithAllergies?.map((guest) => {
          return <article className='flex flex-col gap-1 rounded-md bg-olive-950 p-2'
            key={guest.slug}>
            <GuestRow onDeleteGuest={deleteGuest}
              onUpdateGuest={updateGuest}
              guest={guest} />
            <em>&quot;{guest.notes?.find(note => note.type === NOTES.allergies)?.content}&quot;</em>
          </article>
        })}
      </article>
    </>
  )
}

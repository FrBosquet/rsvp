/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { useEvent } from '@/components/hooks/use-event'
import { Spinner } from '@/components/spinner'
import { AddGuestModal } from './add-guest-modal'
import { GuestRow } from './guest-row'
import { GuestStateFilter } from './guest-state-filter'
import { InvitationResume } from './invitation-resume'
import { SearchInput } from './search-input'
import { UserSelector } from './user-selector'

export const GuestManager = () => {
  const { isReady, addGuest, updateGuest, deleteGuest, guestInvited, invitationAmount, filteredGuests } = useEvent()

  if (!isReady) return <Spinner /> // TODO: Add an skeleton

  return (
    <>
      <InvitationResume guestInvited={guestInvited}
        invitationAmount={invitationAmount}
        className='text-zinc-200 md:hidden' />
      <article className="flex w-full items-center gap-2 rounded-2xl bg-slate-700 p-2 text-zinc-200 shadow-md">
        <UserSelector users={[]} />
        <SearchInput />
        <InvitationResume guestInvited={guestInvited}
          invitationAmount={invitationAmount}
          className='hidden flex-1 md:block' />
        <AddGuestModal className='hidden md:block'
          onNewGuest={addGuest} />
        <div className='mx-3 hidden h-6 border-l-2 md:block' />
        <GuestStateFilter className='hidden md:flex' />
      </article>

      <article className="flex w-full flex-1 flex-col gap-4 rounded-2xl bg-gradient-to-b from-olive-900 to-olive-950/10 p-4 text-slate-200">
        {filteredGuests.map((guest) => {
          return <GuestRow onDeleteGuest={deleteGuest}
            onUpdateGuest={updateGuest}
            key={guest.slug}
            guest={guest} />
        })}
      </article>
      <menu className='flex w-full items-center justify-between gap-2 rounded-xl bg-slate-900 p-3 text-zinc-200 md:hidden'>
        <GuestStateFilter />
        <AddGuestModal onNewGuest={addGuest} />
      </menu>
    </>
  )
}

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
  const {
    isReady,
    addGuest,
    updateGuest,
    deleteGuest,
    guestInvited,
    invitationAmount,
    filteredGuests
  } = useEvent()

  if (!isReady) return <Spinner /> // TODO: Add an skeleton

  return (
    <>
      <InvitationResume
        className="text-zinc-200 md:hidden"
        guestInvited={guestInvited}
        invitationAmount={invitationAmount}
      />
      <article className="flex w-full items-center gap-2 bg-zinc-200 px-3 py-2 shadow-inner">
        <UserSelector users={[]} />
        <SearchInput />
        <InvitationResume
          className="hidden flex-1 md:block"
          guestInvited={guestInvited}
          invitationAmount={invitationAmount}
        />
        <AddGuestModal className="hidden md:block" onNewGuest={addGuest} />
        <div className="mx-3 hidden h-6 border-l-2 md:block" />
        <GuestStateFilter className="hidden md:flex" />
      </article>

      <article className="flex w-full flex-1 flex-col gap-4 overflow-y-auto p-4 text-slate-200">
        {filteredGuests.map((guest) => {
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
      <menu className="flex w-full items-center justify-between gap-2 rounded-xl bg-slate-900 p-3 text-zinc-200 md:hidden">
        <GuestStateFilter />
        <AddGuestModal onNewGuest={addGuest} />
      </menu>
    </>
  )
}

/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { useEvent } from '@/components/hooks/use-event'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { STATE, type GuestWithHost } from '@/types'
import { type User } from '@prisma/client'
import { UserSearch } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { AddGuestModal } from './_components/add-guest-modal'
import { GuestRow } from './_components/guest-row'

const UserSelector = ({ users, className }: { users: User[], className?: string }) => {
  const { hosts, setFilter, filters } = useEvent()

  const handleChange = (value: string) => {
    if (value === '-') {
      setFilter('host', null)
    } else {
      setFilter('host', value)
    }
  }

  const hostName = hosts.find((host) => host.id === filters.host)?.name ?? 'Invitado de'

  return <Select onValueChange={handleChange}>
    <SelectTrigger className={twMerge('max-w-32', className)}>
      {hostName}
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="-">Todos</SelectItem>
      {
        hosts.map((host) => {
          return <SelectItem key={host.id}
            value={host.id}>{host.name}</SelectItem>
        })
      }
    </SelectContent>
  </Select>
}

const InvitationResume = ({ guestInvited, invitationAmount, className }: { guestInvited: number, invitationAmount: number, className: string }) => {
  return <p className={twMerge('text-sm font-semibold uppercase', className)}>{invitationAmount} invitaciones / {guestInvited} invitados</p>
}

const SearchInput = ({ className }: { className?: string }) => {
  const { updateNameFilter } = useEvent()

  return <p className={twMerge('relative flex items-center px-1', className)}>
    <UserSearch size={16}
      className='absolute' />
    <input className="bg-transparent pl-6"
      onChange={updateNameFilter}
      placeholder="buscar..." />
  </p>
}

const GuestStateFilter = ({ className }: { className?: string }) => {
  const { toggleStateFilter, guestPending, guestAccepted, guestRejected, filters } = useEvent()

  return <div className={twMerge('flex gap-1', className)}>
    <button onClick={() => {
      toggleStateFilter(STATE.pending)
    }}
      data-selected={filters.state === STATE.pending}
      className="aspect-square w-8 rounded-md border-yellow-500 bg-yellow-500 text-sm font-semibold text-slate-900 hover:bg-yellow-300
      data-[selected='true']:border data-[selected='true']:bg-transparent data-[selected='true']:text-yellow-300 md:w-6 ">{guestPending}</button>

    <button onClick={() => {
      toggleStateFilter(STATE.accepted)
    }}
      data-selected={filters.state === STATE.accepted}
      className="aspect-square w-8 rounded-md border-green-500 bg-green-500 text-sm font-semibold text-slate-900 hover:bg-green-300
      data-[selected='true']:border data-[selected='true']:bg-transparent data-[selected='true']:text-green-300 md:w-6 ">{guestAccepted}</button>

    <button onClick={() => {
      toggleStateFilter(STATE.rejected)
    }}
      data-selected={filters.state === STATE.rejected}
      className="aspect-square w-8 rounded-md border-red-500 bg-red-500 text-sm font-semibold text-slate-900 hover:bg-red-300
      data-[selected='true']:border data-[selected='true']:bg-transparent data-[selected='true']:text-red-300 md:w-6 ">{guestRejected}</button>
  </div>
}

export const Manager = ({ serverGuests }: { serverGuests: GuestWithHost[] }) => {
  const { addGuest, updateGuest, deleteGuest, guestInvited, invitationAmount, filteredGuests } = useEvent(serverGuests)

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

'use client'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { type GuestWithHost } from '@/types'
import { type User } from '@prisma/client'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AddGuestModal } from './_components/add-guest-modal'
import { GuestRow } from './_components/guest-row'

const UserSelector = ({ users }: { users: User[] }) => {
  return <Select>
    <SelectTrigger className="max-w-32">
      Invitado de
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="system">System</SelectItem>
    </SelectContent>
  </Select>
}

export const Manager = ({ serverGuests }: { serverGuests: GuestWithHost[] }) => {
  const [guests, setGuests] = useState<GuestWithHost[]>(serverGuests)

  const handleNewGuest = (guest: GuestWithHost) => {
    setGuests((prev) => [...prev, guest].sort((a, b) => a.slug.localeCompare(b.slug)))
  }

  const { guestInvited, guestAccepted, guestPending, guestRejected } = useMemo(() => guests.reduce((acc, guest) => {
    acc.guestInvited += guest.maxAmount
    if (guest.state === 'accepted') {
      acc.guestAccepted += guest.amount!
      acc.guestRejected += (guest.maxAmount) - (guest.amount!)
    }
    if (guest.state === 'pending') acc.guestPending += guest.maxAmount
    if (guest.state === 'rejected') acc.guestRejected += guest.maxAmount
    return acc
  }, { guestInvited: 0, guestAccepted: 0, guestPending: 0, guestRejected: 0 }), [guests])

  return (
    <>
      <article className="flex w-full items-center gap-2 rounded-2xl bg-slate-700 p-2 text-zinc-200 shadow-md">
        <UserSelector users={[]} />
        <Search />
        <input className="bg-transparent" placeholder="buscar..." />
        <p className='flex-1 text-sm font-semibold uppercase'>{guests.length} invitaciones / {guestInvited} invitados</p>
        <div className='flex gap-1'>
          <AddGuestModal onNewGuest={handleNewGuest} />
          <div className='mx-3 h-6 border-l-2' />
          <button className="aspect-square w-6 rounded-md bg-yellow-500 text-sm font-semibold text-slate-900 hover:bg-yellow-300">{guestPending}</button>
          <button className="aspect-square w-6 rounded-md bg-green-500 text-sm font-semibold text-slate-900 hover:bg-green-300">{guestAccepted}</button>
          <button className="aspect-square w-6 rounded-md bg-red-500 text-sm font-semibold text-slate-900 hover:bg-red-300">{guestRejected}</button>
        </div>
      </article>
      <article className="flex w-full flex-1 flex-col gap-4 rounded-2xl bg-gradient-to-b from-olive-900 to-olive-950/10 p-4 text-slate-200">
        {guests.map((guest) => {
          return <GuestRow key={guest.slug} guest={guest} />
        })}
      </article>
    </>
  )
}

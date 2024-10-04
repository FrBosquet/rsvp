'use client'

import { twMerge } from 'tailwind-merge'

import { type GuestWithNotes } from '@/types'

import { useGuest } from '../hooks/use-guest'
import { AcceptanceCard } from './AcceptanceCard'
import { AcceptedCard } from './accepted-card/accepted-card'
import { Backface } from './backface'
import { Frontface } from './Frontface'

interface Props {
  guest: GuestWithNotes
}

export const CardFlipper = ({ guest: serverGuest }: Props) => {
  const { guest } = useGuest(serverGuest)

  return (
    <aside
      className={twMerge(
        'flex items-center text-md justify-center overflow-hidden perspective size-screen opacity-0 transition',
        guest != null && 'opacity-100'
      )}
    >
      <Frontface />
      <Backface />
      <AcceptedCard />

      <AcceptanceCard />
    </aside>
  )
}

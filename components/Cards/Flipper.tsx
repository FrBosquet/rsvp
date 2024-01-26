'use client'

import { STATE } from '@/types'
import { type Guest } from '@prisma/client'
import { useState } from 'react'
import { AcceptanceCard } from './AcceptanceCard'
import { Backface } from './Backface'
import { Frontface } from './Frontface'

interface Props {
  guest: Guest
}

export const CardFlipper = ({ guest: userGuest }: Props) => {
  const [guest, setGuest] = useState<Guest>(userGuest)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleUpdateGuest = (guest: Guest) => {
    setGuest(guest)
  }

  const handleClick = () => {
    setIsFlipped(f => !f)
  }

  const handleStateChange = (state: STATE) => {
    setGuest(g => {
      return {
        ...g,
        state
      }
    })
  }

  return (
    <aside className="flex items-center justify-center overflow-hidden perspective size-screen">
      <Frontface guest={guest} isFlipped={isFlipped} onClick={handleClick} />
      <Backface guest={guest} isFlipped={isFlipped} onClick={handleStateChange} />

      <AcceptanceCard guest={guest} state={guest.state as STATE} onAccepted={handleUpdateGuest} onCancel={() => { handleStateChange(STATE.pending) }} />

    </aside>
  )
}

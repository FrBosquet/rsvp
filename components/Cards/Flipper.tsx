'use client'

import { STATE } from '@/types'
import { type Guest } from '@prisma/client'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { AcceptanceCard } from './AcceptanceCard'
import { Backface } from './Backface'
import { Card } from './Card'
import { Frontface } from './Frontface'

interface Props {
  guest: Guest
}

export const CardFlipper = ({ guest: userGuest }: Props) => {
  const [guest, setGuest] = useState<Guest>(userGuest)
  const [isFlipped, setIsFlipped] = useState(false)
  const [acceptCardVisible, setAcceptCardVisible] = useState(false)

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

  console.log(isFlipped)

  return (
    <aside className="flex items-center justify-center overflow-hidden perspective size-screen">
      <Frontface guest={guest} isFlipped={isFlipped} onClick={handleClick} />
      <Backface guest={guest} isFlipped={isFlipped} onClick={handleStateChange} />

      <AcceptanceCard guest={guest} state={guest.state as STATE} onAccepted={handleUpdateGuest} onCancel={() => { handleStateChange(STATE.pending) }} />

      {/* accepted card */}
      <div
        className={twMerge(
          'absolute inset-0 bg-black opacity-0 transition-opacity duration-1000 pointer-events-none',
          acceptCardVisible && 'pointer-events-auto opacity-30'
        )}
        onClick={() => { setAcceptCardVisible(false) }}
      />
      <Card className={twMerge(
        'accepted-card justify-start shadow-heavy ',
        (!isFlipped || guest.state !== STATE.accepted) && 'accepted-card-hidden',
        acceptCardVisible && 'accepted-card-visible'
      )}>
        <button
          disabled={acceptCardVisible}
          onClick={() => { setAcceptCardVisible(true) }}
          className={twMerge(
            'absolute inset-0',
            acceptCardVisible && 'pointer-events-none'
          )}
        />

        <h1 className='font-serif text-lg uppercase'>Asistencia</h1>
      </Card>

    </aside>
  )
}

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

export const CardFlipper = ({ guest }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [state, setState] = useState<STATE>(guest.state as STATE)

  const handleClick = () => {
    setIsFlipped(f => !f)
  }

  const handleStateChange = (state: STATE) => {
    setState(state)
  }

  return (
    <aside className="flex items-center justify-center overflow-hidden perspective size-screen">
      <Frontface guest={guest} isFlipped={isFlipped} onClick={handleClick} />
      <Backface guest={guest} isFlipped={isFlipped} onClick={handleStateChange} />

      <AcceptanceCard guest={guest} state={state} onCancel={() => { setState(STATE.pending) }} />

    </aside>
  )
}

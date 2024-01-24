'use client'

import { type Guest } from '@prisma/client'
import { useState } from 'react'
import { Backface } from './Backface'
import { Frontface } from './Frontface'

interface Props {
  guest: Guest
}

export const CardFlipper = ({ guest }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = () => {
    setIsFlipped(f => !f)
  }

  return (
    <aside className="flex items-center justify-center perspective">
      <Frontface guest={guest} isFlipped={isFlipped} onClick={handleClick} />
      <Backface guest={guest} isFlipped={isFlipped} onClick={handleClick} />
    </aside>
  )
}

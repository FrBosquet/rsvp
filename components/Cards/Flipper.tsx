'use client'

import { Guest } from "@/types"
import { useState } from "react"
import { Backface } from "./Backface"
import { Frontface } from "./Frontface"

type Props = {
  guest: Guest
}

export const CardFlipper = ({ guest }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = () => {
    console.log('click');
    setIsFlipped(f => !f)
  }

  return (
    <main className="w-screen h-screen flex justify-center items-center perspective">
      <Frontface guest={guest} isFlipped={isFlipped} onClick={handleClick} />
      <Backface guest={guest} isFlipped={isFlipped} onClick={handleClick} />
    </main>
  )
}
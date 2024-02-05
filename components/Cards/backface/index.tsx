'use client'

import { twMerge } from 'tailwind-merge'
import { useGuest } from '../../hooks/use-guest'
import { Card } from '../Card'
import { BackfaceMenu } from './backface-menu'

export const Backface = () => {
  const { guest, isFlipped } = useGuest()

  if (!guest) return null

  return (
    <Card
      className={twMerge(
        'justify-between text-center gap-c50 p-c20',
        'text-zinc-700',
        isFlipped ? 'flipped-back' : 'flipped-non-back'
      )}
    >
      <div className='flex flex-1 items-center justify-center font-serif text-3xl uppercase leading-none tracking-xl'>
        <p>Jana & Odette</p>
      </div>
      <p className='px-c20 text-sm uppercase leading-6 text-zinc-500'>os invitan a la celebración de su boda el</p>
      <p className='font-serif text-xl uppercase tracking-2xl'>11.05.2024</p>
      <p className='text-sm uppercase leading-6 text-zinc-500'>
        A las 13:00 de la tarde<br />
        <span className='text-xs'>en</span>La Huerta de peñalen<br />
        <span className='text-xs'>Camí de l’Assagador, Vilarreal</span><br />
      </p>
      <BackfaceMenu />
    </Card>
  )
}

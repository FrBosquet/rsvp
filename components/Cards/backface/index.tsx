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
        'justify-between text-center gap-c50 p-c20 font-noto',
        'text-zinc-700',
        isFlipped ? 'flipped-back' : 'flipped-non-back'
      )}
    >
      <div className='flex flex-1 -skew-y-12 flex-col items-center justify-center font-dancing text-5xl font-semibold leading-none backface-hidden'>
        <p>Jana</p>
        <p className='text-xl'>&</p>
        <p>Odette</p>
      </div>
      <p className='px-c20 text-md leading-6 text-zinc-500'>¡Deseando que nos acompañéis el día de nuestra boda!</p>
      <p className='font-serif text-xl font-bold uppercase tracking-2xl'>11.05.2024</p>
      <p className='text-md leading-10 text-zinc-500'>
        Sábado, a las 13:00h<br />
        Huerta de Peñalen<br />
        <span className='text-xs uppercase'>Camí de l’Assagador, Vilarreal</span><br />
      </p>
      <BackfaceMenu />
    </Card>
  )
}

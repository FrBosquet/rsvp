'use client'

import { STATE } from '@/types'
import { type Guest } from '@prisma/client'
import { twMerge } from 'tailwind-merge'
import { Card } from './Card'

interface CoverProps { guest: Guest }
type Props = CoverProps & { isFlipped: boolean, onClick: (state: STATE) => void }

export const Backface = ({ guest, isFlipped, onClick }: Props) => {
  return (
    <Card
      className={twMerge(
        'justify-end text-center gap-c50 p-c10',
        'text-zinc-700',
        isFlipped ? 'flipped-back' : 'flipped-non-back'
      )}
    >
      <p className='pb-c5 font-serif text-3xl uppercase leading-none tracking-xl'>Jana & Odette</p>
      <p className='px-c10 text-sm uppercase leading-6 text-zinc-500'>os invitan a la celebración de su boda el</p>
      <p className='font-serif text-xl uppercase tracking-2xl'>11.05.2024</p>
      <p className='text-sm uppercase leading-6 text-zinc-500'>
        A las 13:00 de la tarde<br />
        <span className='text-xs'>en</span>La Huerta de peñalen<br />
        <span className='text-xs'>Camí de l’Assagador, Vilarreal</span><br />
      </p>
      <p className='pt-c10 font-script text-lg text-red-950'>¿Contamos con vosotros?</p>
      <menu className='flex w-full justify-center gap-c100 p-c50'>
        <button onClick={() => { onClick(STATE.accepting) }} className='button-fill-base flex-1 rounded-md bg-right font-serif text-sm font-light uppercase text-zinc-400 transition-all bg-color-emerald hover:button-fill-hover hover:text-zinc-700'>Sí</button>
        <button onClick={() => { onClick(STATE.rejected) }} className='button-fill-base flex-1 rounded-md font-serif text-sm font-light uppercase text-zinc-400 transition-all bg-color-rose hover:button-fill-hover hover:text-zinc-700 '>No</button>
      </menu>
    </Card>
  )
}

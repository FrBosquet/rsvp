'use client'

import { Guest } from '@/types'
import { twMerge } from 'tailwind-merge'
import { Card } from './Card'

type CoverProps = { guest: Guest }
type Props = CoverProps & { isFlipped: boolean; onClick: () => void }

export const Backface = ({ guest, isFlipped }: Props) => {

  return (
    <Card
      className={twMerge(
        'justify-end text-center gap-c50 p-c10',
        'text-zinc-700',
        isFlipped ? 'flipped-back' : 'flipped-non-back'
      )}
    >
      <p className='text-3xl font-serif uppercase leading-none tracking-[1rem] pb-c5'>Jana & Odette</p>
      <p className='text-sm uppercase leading-6 text-zinc-500 px-c10'>os invitan a la celebración de su boda el</p>
      <p className='text-xl font-serif uppercase tracking-[0.5em]'>11.05.2024</p>
      <p className='text-sm uppercase leading-6 text-zinc-500'>
        A las 13:00 de la tarde<br />
        <span className='text-xs'>en</span> La Huerta de peñalen<br />
        <span className='text-xs'>Camí de l’Assagador, Vilarreal</span><br />
      </p>
      <p className='font-script pt-c10 text-lg text-red-950'>¿Contamos con vosotros?</p>
      <menu className='w-full flex justify-center gap-c100 p-c50'>
        <button className='flex-1 font-serif uppercase transition-all text-sm text-zinc-400 hover:text-zinc-700 font-light rounded-md button-fill-base hover:button-fill-hover bg-color-emerald [background-position:right]'>Sí</button>
        <button className='flex-1 font-serif uppercase transition-all text-sm text-zinc-400 hover:text-zinc-700 font-light rounded-md button-fill-base hover:button-fill-hover bg-color-rose '>No</button>
      </menu>
    </Card>
  )
}

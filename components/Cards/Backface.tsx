'use client'

import { STATE } from '@/types'
import { twMerge } from 'tailwind-merge'
import { useGuest } from '../hooks/use-guest'
import { useRejectAssistance } from '../hooks/use-reject-assitance'
import { Card } from './Card'
import { AnimatedButton } from './animated-button'

export const Backface = () => {
  const { guest, showAcceptance, isFlipped } = useGuest()
  const { handleReject, loading } = useRejectAssistance()

  if (!guest) return null

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
        <AnimatedButton disabled={loading}
          onClick={showAcceptance}
          className='flex-1 bg-color-emerald'>Sí</AnimatedButton>
        <AnimatedButton isMarked={guest.state === STATE.rejected}
          onClick={handleReject}
          loading={loading}
          className='flex-1 bg-color-rose'>No</AnimatedButton>

      </menu>
    </Card>
  )
}

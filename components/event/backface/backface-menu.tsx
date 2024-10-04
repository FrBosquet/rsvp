'use client'

import { twMerge } from 'tailwind-merge'

import { STATE } from '@/types'

import { useGuest } from '../../hooks/use-guest'
import { useRejectAssistance } from '../../hooks/use-reject-assistance'
import { AnimatedButton } from '../animated-button'
import { sections } from '../sections'

export const Pending = () => {
  const { guest, showAcceptance } = useGuest()
  const { handleReject, loading } = useRejectAssistance()

  return (
    <article
      className={twMerge(
        'absolute bottom-0 flex w-full flex-col opacity-0 transition-opacity duration-700 pointer-events-none',
        guest?.state !== STATE.accepted && 'opacity-100 pointer-events-auto'
      )}
    >
      <p className="skew-x-6 pt-c10 font-dancing text-lg font-semibold italic">
        ¿Contamos con vosotros?
      </p>
      <article className="flex justify-center gap-c100 p-c50">
        <AnimatedButton
          className="flex-1 bg-color-emerald"
          disabled={loading}
          onClick={showAcceptance}
        >
          Sí
        </AnimatedButton>
        <AnimatedButton
          className="relative flex-1 bg-color-rose"
          isMarked={guest?.state === STATE.rejected}
          loading={loading}
          onClick={handleReject}
        >
          No
        </AnimatedButton>
      </article>
    </article>
  )
}

export const Accepted = () => {
  const { guest, showAcceptedCard } = useGuest()

  return (
    <menu
      className={twMerge(
        'flex w-full justify-around transition-opacity duration-700 opacity-0 absolute bottom-0 pointer-events-none gap-c80',
        guest?.state === STATE.accepted && 'opacity-100 pointer-events-auto'
      )}
    >
      {sections.map(({ Icon, label, tab }, i) => (
        <AnimatedButton
          key={i}
          className="flex aspect-square flex-1 flex-col items-center justify-center gap-c80 border bg-color-emerald disabled:opacity-50"
          onClick={() => {
            showAcceptedCard(tab)
          }}
        >
          <Icon size={24} />
          <span className="text-xs font-semibold">{label}</span>
        </AnimatedButton>
      ))}
    </menu>
  )
}

export const BackfaceMenu = () => {
  return (
    <menu className="relative h-c8 w-full">
      <Accepted />
      <Pending />
    </menu>
  )
}

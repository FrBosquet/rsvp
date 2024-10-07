'use client'

import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import { type GuestWithNotes, InvitationConfig } from '@/types'

import { useGuest } from '../hooks/use-guest'
import { AcceptanceCard } from './AcceptanceCard'
import { AcceptedCard } from './accepted-card/accepted-card'
import { Backface } from './backface'
import { Frontface } from './Frontface'

interface Props {
  guest: GuestWithNotes
  config: InvitationConfig
}

/**
 * Invitation is the whole thing: Background plus cards and additional modals
 *
 * @param param0
 * @returns
 */
export const Invitation = ({ guest: serverGuest, config }: Props) => {
  const { guest } = useGuest(serverGuest)

  const style = useMemo<any>(() => {
    return {
      ['--available-height']: config.containerHeight,
      ['--available-width']: config.containerWidth,
      ['--card-margin']: '2rem',
      ['--max-height-vertical']:
        'calc(var(--available-height) - var(--card-margin))',
      ['--max-width-horizontal']:
        'calc((var(--available-width) - var(--card-margin)) * 2)',
      ['--card-height']:
        'min(var(--max-height-vertical), var(--max-width-horizontal))',
      ['--card-bg']: 'pink',
      ['--card-unit']: 'calc(var(--card-height) / 100)'
    }
  }, [config])

  return (
    <aside
      className={twMerge(
        'flex items-center text-md justify-center overflow-hidden perspective size-available opacity-0 transition bg-card-bg h-full',
        guest != null && 'opacity-100'
      )}
      style={style}
    >
      <Frontface />
      <Backface />
      <AcceptedCard />

      <AcceptanceCard />
    </aside>
  )
}

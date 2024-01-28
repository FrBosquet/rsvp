'use client'

import { useGuest } from '@/components/hooks/use-guest'
import { STATE, TABS } from '@/types'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Card } from '../Card'
import { Assistance } from './asistance'
import { Contact } from './contact'

export const AcceptedCard = () => {
  const { guest, isFlipped, setCurrentTab } = useGuest()
  const [acceptCardVisible, setAcceptCardVisible] = useState(false)

  if (!guest) return null

  const isAccepted = guest.state === STATE.accepted

  return (
    <>
      <div
        className={twMerge(
          'fixed inset-0 bg-black opacity-0 transition-opacity duration-1000 pointer-events-none',
          acceptCardVisible && 'pointer-events-auto opacity-30'
        )}
        onClick={() => { setAcceptCardVisible(false) }}
      />
      <Card className={twMerge(
        'accepted-card shadow-heavy',
        (!isFlipped || !isAccepted) && 'accepted-card-hidden',
        acceptCardVisible && 'accepted-card-visible'
      )}>
        <div className='relative w-full flex-1 overflow-y-auto' >
          <Assistance />
          <Contact />
        </div>
        <menu className='flex w-full justify-around'>
          <button onClick={() => { setCurrentTab(TABS.assistance) }}>ASS</button>
          <button onClick={() => { setCurrentTab(TABS.contact) }}>CON</button>
        </menu>
        <button
          disabled={acceptCardVisible}
          onClick={() => { setAcceptCardVisible(true) }}
          className={twMerge(
            'absolute inset-0',
            acceptCardVisible && 'pointer-events-none'
          )}
        />
      </Card>

    </>
  )
}

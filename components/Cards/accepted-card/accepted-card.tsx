'use client'

import { useGuest } from '@/components/hooks/use-guest'
import { STATE, TABS } from '@/types'
import { Bus, GiftIcon, Hotel, Phone, User } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Card } from '../Card'
import { AnimatedButton } from '../animated-button'
import { Assistance } from './assistance'
import { Commuting } from './commuting'
import { Contact } from './contact'
import { Gift } from './gift'
import { Housing } from './housing'

const sections = [
  { Icon: User, label: 'Asistencia', tab: TABS.assistance, component: Assistance },
  { Icon: Phone, label: 'Contacto', tab: TABS.contact, component: Contact },
  { Icon: Hotel, label: 'Alojamiento', tab: TABS.housing, component: Housing },
  { Icon: GiftIcon, label: 'Regalo', tab: TABS.gift, component: Gift },
  { Icon: Bus, label: 'Transporte', tab: TABS.commuting, component: Commuting }
]

export const AcceptedCard = () => {
  const { guest, isFlipped, setCurrentTab, currentTab } = useGuest()
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
        <div className='pointer-events-none relative w-full flex-1' >
          {
            sections.map(({ component: Component, tab }, i) => (
              <Component key={i}
                visible={tab && tab === currentTab} />
            ))
          }
        </div>
        <menu className='flex w-full justify-around'>
          {
            sections.map(({ Icon, label, tab }, i) => (
              <AnimatedButton
                key={i}
                disabled={currentTab === tab}
                onClick={() => { setCurrentTab(tab) }}
                className={twMerge(
                  'flex flex-col items-center justify-center bg-color-emerald p-1 disabled:opacity-50',
                  currentTab === tab && 'text-color-emerald'
                )}
              >
                <Icon size={24} />
                <span className='text-xs'>{label}</span>
              </AnimatedButton>
            ))
          }
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

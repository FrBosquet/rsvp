'use client'

import { Bus, GiftIcon, Hotel, Phone, User } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { useGuest } from '@/components/hooks/use-guest'
import { TABS } from '@/types'

import { Card } from '../Card'
import { Assistance } from './assistance'
import { Commuting } from './commuting'
import { Contact } from './contact'
import { Gift } from './gift'
import { Housing } from './housing'

const sections = [
  {
    Icon: User,
    label: 'Asistencia',
    tab: TABS.assistance,
    component: Assistance
  },
  { Icon: Phone, label: 'Contacto', tab: TABS.contact, component: Contact },
  { Icon: Hotel, label: 'Alojamiento', tab: TABS.housing, component: Housing },
  { Icon: GiftIcon, label: 'Regalo', tab: TABS.gift, component: Gift },
  { Icon: Bus, label: 'Transporte', tab: TABS.commuting, component: Commuting }
]

export const AcceptedCard = () => {
  const {
    guest,
    isFlipped,
    currentTab,
    isAcceptedCardVisible,
    hideAcceptedCard
  } = useGuest()

  if (!guest) return null

  return (
    <>
      <div
        className={twMerge(
          'fixed inset-0 bg-black opacity-0 transition-opacity duration-1000 pointer-events-none',
          isAcceptedCardVisible && 'pointer-events-auto opacity-30'
        )}
        onClick={() => {
          hideAcceptedCard()
        }}
      />
      <Card
        className={twMerge(
          'accepted-card shadow-heavy',
          isFlipped && isAcceptedCardVisible && 'accepted-card-visible'
        )}
      >
        <div className="pointer-events-none relative w-full flex-1">
          {sections.map(({ component: Component, tab }, i) => (
            <Component key={i} visible={tab && tab === currentTab} />
          ))}
        </div>
      </Card>
    </>
  )
}

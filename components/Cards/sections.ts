'use client'

import { Bus, GiftIcon, Hotel, Phone, User } from 'lucide-react'

import { TABS } from '@/types'

export const sections = [
  { Icon: User, label: 'Asistencia', tab: TABS.assistance },
  { Icon: Phone, label: 'Contacto', tab: TABS.contact },
  { Icon: Hotel, label: 'Alojamiento', tab: TABS.housing },
  { Icon: GiftIcon, label: 'Regalo', tab: TABS.gift },
  { Icon: Bus, label: 'Transporte', tab: TABS.commuting }
]

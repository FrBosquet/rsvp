'use client'

import { TABS } from '@/types'
import { Bus, GiftIcon, Hotel, Phone, User } from 'lucide-react'

export const sections = [
  { Icon: User, label: 'Asistencia', tab: TABS.assistance },
  { Icon: Phone, label: 'Contacto', tab: TABS.contact },
  { Icon: Hotel, label: 'Alojamiento', tab: TABS.housing },
  { Icon: GiftIcon, label: 'Regalo', tab: TABS.gift },
  { Icon: Bus, label: 'Transporte', tab: TABS.commuting }
]

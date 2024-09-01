'use client'

import { UserButton as ClerkUB } from '@clerk/nextjs'
import { CircleUser } from 'lucide-react'

const { MenuItems, Link } = ClerkUB

export const UserButton = () => {
  return (
    <ClerkUB showName>
      <MenuItems>
        <Link
          href="/private/preferences"
          label={'Preferencias'}
          labelIcon={<CircleUser size={14} />}
        />
      </MenuItems>
    </ClerkUB>
  )
}

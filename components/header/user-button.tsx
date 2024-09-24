'use client'

import { UserButton as ClerkUB } from '@clerk/nextjs'
import { CircleUser } from 'lucide-react'

import { useIntl } from '../providers/translator'

const { MenuItems, Link } = ClerkUB

export const UserButton = () => {
  const { t } = useIntl()

  return (
    <ClerkUB showName>
      <MenuItems>
        <Link
          href="/private/preferences"
          label={t('preferences')}
          labelIcon={<CircleUser size={14} />}
        />
      </MenuItems>
    </ClerkUB>
  )
}

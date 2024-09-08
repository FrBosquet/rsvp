/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { twMerge } from 'tailwind-merge'

import { useIntl } from '@/components/providers/translator'

export const InvitationResume = ({
  guestInvited,
  invitationAmount,
  className
}: {
  guestInvited: number
  invitationAmount: number
  className: string
}) => {
  const { t } = useIntl()

  return (
    <p className={twMerge('text-sm font-semibold uppercase', className)}>
      {t('event.resume', {
        amount: invitationAmount,
        guest: guestInvited
      })}
    </p>
  )
}

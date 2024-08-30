/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { twMerge } from 'tailwind-merge'

export const InvitationResume = ({
  guestInvited,
  invitationAmount,
  className
}: {
  guestInvited: number
  invitationAmount: number
  className: string
}) => {
  return (
    <p className={twMerge('text-sm font-semibold uppercase', className)}>
      {invitationAmount} invitaciones / {guestInvited} invitados
    </p>
  )
}

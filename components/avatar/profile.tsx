import { cn } from '@/lib/utils'
import { UserOnEventWithUser } from '@/types'

import { Tooltip } from '../tooltip/tooltip'
import { AvatarChip } from './chip'

type Props = {
  userOnEvent: UserOnEventWithUser
  className?: string
  itsYou?: boolean
}

const Profile = ({ userOnEvent, itsYou }: Props) => {
  const { user, email, createdAt: invitationCreatedAt } = userOnEvent

  if (!user)
    return (
      <div className="flex w-36 flex-col items-center gap-2">
        <p>Usuario invitado. Esperando que acceda a la plataforma</p>
        <p className="w-full text-slate-400">{email}</p>
        <p className="w-full font-sans text-xs">
          Invitación creada el{' '}
          {new Date(invitationCreatedAt).toLocaleDateString('es', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}
        </p>
      </div>
    )

  const { createdAt: userCreatedAt } = user

  return (
    <div className="flex w-36 flex-col items-center gap-2">
      <AvatarChip className="size-24" userOnEvent={userOnEvent} />
      <h2 className="w-full text-lg font-semibold">
        {user.name} {itsYou && ' (tu)'}
      </h2>
      <p className="text-xs uppercase"></p>
      <p className="w-full text-slate-400">{user.email}</p>
      <p className="w-full font-sans text-xs">
        Usuario desde el{' '}
        {new Date(userCreatedAt).toLocaleDateString('es', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })}
      </p>
    </div>
  )
}

export const AvatarWithProfile = ({
  userOnEvent,
  className,
  itsYou
}: Props) => {
  return (
    <Tooltip content={<Profile itsYou={itsYou} userOnEvent={userOnEvent} />}>
      <AvatarChip
        className={cn(className, itsYou && 'border border-emerald-400')}
        userOnEvent={userOnEvent}
      />
    </Tooltip>
  )
}

import { UserOnEventWithUser } from '@/types'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
  userOnEvent: UserOnEventWithUser
  className?: string
}

const toInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toLocaleUpperCase()
}

export const AvatarChip = ({ userOnEvent, className }: Props) => {
  const { user } = userOnEvent

  return (
    <Avatar className={className}>
      <AvatarImage alt={user?.name} src={user?.image} />
      <AvatarFallback>{user ? toInitials(user.name) : '?'}</AvatarFallback>
    </Avatar>
  )
}

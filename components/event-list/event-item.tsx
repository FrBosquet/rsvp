import { type User } from '@prisma/client'
import Link from 'next/link'

import { type EventWithUsers } from '@/types'

import { AvatarWithProfile } from '../avatar/profile'
import { AcceptHostButton } from './accept-host-button'

interface Props {
  event: EventWithUsers
  currentUser: User
}

const UserAvatars = ({ event, currentUser }: Props) => {
  const { users } = event

  return (
    <ul className="flex">
      {users
        .filter((user) => {
          if (currentUser.role === 'admin') return true

          return user.role === 'host'
        })
        .map((user) => (
          <AvatarWithProfile
            key={user.id}
            className="-ml-2"
            itsYou={currentUser.id === user.userId}
            userOnEvent={user}
          />
        ))}
    </ul>
  )
}

export const EventItem = ({ event, currentUser }: Props) => {
  const isAccepted = event.users.some(
    (userOnEvent) => userOnEvent.user?.email === currentUser.email
  )

  return (
    <li
      key={event.slug}
      className="flex w-full gap-2 border p-2 hover:bg-slate-200"
    >
      <Link className="block flex-1" href={`private/${event.slug}`}>
        {event.name}
      </Link>
      {isAccepted ? (
        <UserAvatars currentUser={currentUser} event={event} />
      ) : (
        <AcceptHostButton event={event} />
      )}
    </li>
  )
}

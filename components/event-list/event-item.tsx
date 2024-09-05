import Link from 'next/link'

import { cn } from '@/lib/utils'
import { type EventWithUsers, UserWithPrefs } from '@/types'

import { AvatarWithProfile } from '../avatar/profile'
import { AcceptHostButton } from './accept-host-button'

interface Props {
  event: EventWithUsers
  currentUser: UserWithPrefs
}

export const EventItem = ({ event, currentUser }: Props) => {
  const isAccepted = event.users.some(
    (userOnEvent) => userOnEvent.user?.email === currentUser.email
  )

  const { users } = event

  return (
    <li
      key={event.slug}
      className={cn(
        'flex w-full gap-2 border p-2',
        isAccepted && 'hover:bg-slate-200'
      )}
    >
      {isAccepted ? (
        <Link className="block flex-1" href={`private/${event.slug}`}>
          {event.name}
        </Link>
      ) : (
        <p className="block flex-1">{event.name}</p>
      )}
      {isAccepted ? (
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
      ) : (
        <AcceptHostButton event={event} />
      )}
    </li>
  )
}

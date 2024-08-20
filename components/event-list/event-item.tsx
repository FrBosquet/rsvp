import { type EventWithUsers } from '@/types'
import { type User } from '@prisma/client'
import Link from 'next/link'
import { AcceptHostButton } from './accept-host-button'

interface Props {
  event: EventWithUsers
  currentUser: User
}

export const EventItem = ({ event, currentUser }: Props) => {
  const isAccepted = event.users.some(userOnEvent => userOnEvent.user?.email === currentUser.email)

  return <li key={event.slug}
    className='flex w-full gap-2 border p-2 hover:bg-slate-200'>
    <Link href={`private/${event.slug}`}
      className='block flex-1'>
      {event.name}
    </Link>
    <p>{isAccepted ? 'si' : <AcceptHostButton event={event} />}</p>
  </li>
}

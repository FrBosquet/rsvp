import { auth } from '@clerk/nextjs/server'
import { type Event, type User, type UserOnEvent } from '@prisma/client'
import { ArrowRightCircle, Trash, UserCheck, UserSearch } from 'lucide-react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { SubmitButton } from '@/components/SubmitButton'

import {
  acceptEventOwnership,
  addOwnerToEvent,
  deleteEvent,
  removeOwnerFromEvent
} from '../../actions'

interface Props {
  isAdmin: boolean
  event: Event & { users: Array<UserOnEvent & { user: User | null }> }
}

const AcceptInvitation = ({ eventSlug }: { eventSlug: string }) => {
  const { userId } = auth()

  return (
    <form action={acceptEventOwnership}>
      <input name="eventSlug" type="hidden" value={eventSlug} />
      <input name="userId" type="hidden" value={userId!} />
      <SubmitButton className="bg-green-600 p-1" variant="acceptance">
        Aceptar
      </SubmitButton>
    </form>
  )
}

const EnterEvent = ({ slug }: { slug: string }) => {
  return (
    <Link
      className="flex rounded-2xl bg-orange-400 p-2 text-sm font-bold uppercase text-zinc-800 shadow-lg hover:bg-rose-400 disabled:cursor-wait disabled:opacity-25"
      href={`/private/${slug}`}
    >
      {' '}
      <ArrowRightCircle size={16} />
    </Link>
  )
}

const UserLine = ({
  userOnEvent,
  isAdmin,
  eventSlug
}: {
  userOnEvent: UserOnEvent
  isAdmin: boolean
  eventSlug: string
}) => {
  const isAccepted = userOnEvent.userId !== null

  return (
    <div
      key={userOnEvent.id}
      className={twMerge(
        'text-zinc-600 pr-4 inline-flex gap-1 items-center',
        isAccepted && 'text-zinc-400'
      )}
    >
      {isAccepted ? <UserCheck size={16} /> : <UserSearch size={16} />}{' '}
      {userOnEvent.email}
      {isAdmin ? (
        <form action={removeOwnerFromEvent}>
          <input name="eventSlug" type="hidden" value={eventSlug} />
          <input name="email" type="hidden" value={userOnEvent.email} />
          <SubmitButton className="bg-red-600 p-1" variant="acceptance">
            <Trash size={10} />
          </SubmitButton>
        </form>
      ) : null}
    </div>
  )
}

export const EventCard = ({ event, isAdmin }: Props) => {
  const { userId } = auth()
  const { users } = event

  const isAccepted = users.some(
    (userOnEvent) => userOnEvent.user?.id === userId
  )

  return (
    <div
      key={event.slug}
      className="flex w-full flex-col gap-2 rounded-2xl bg-slate-900 p-4 text-zinc-200 shadow-md"
    >
      <h2 className="font-semibold">
        {event.name}{' '}
        <span className="font-thin text-zinc-400">/{event.slug}</span>
      </h2>
      <div className="flex flex-wrap text-zinc-400">
        {event.users.map((user, index) => (
          <UserLine
            key={index}
            eventSlug={event.slug}
            isAdmin={isAdmin}
            userOnEvent={user}
          />
        ))}
      </div>

      <menu className="flex w-full items-center justify-end gap-2 pt-4">
        {isAdmin ? (
          <form action={deleteEvent}>
            <input name="slug" type="hidden" value={event.slug} />
            <SubmitButton className="bg-red-600" variant="acceptance">
              <Trash size={14} />
            </SubmitButton>
          </form>
        ) : null}

        {isAdmin ? (
          <form
            action={addOwnerToEvent}
            className="flex flex-1 items-center justify-end gap-2 justify-self-end"
          >
            <input name="slug" type="hidden" value={event.slug} />
            <input
              className="border-none bg-transparent text-zinc-200"
              name="email"
              placeholder="email"
              type="email"
            />
            <SubmitButton variant="acceptance">invitar</SubmitButton>
          </form>
        ) : null}
        {!isAccepted && !isAdmin ? (
          <AcceptInvitation eventSlug={event.slug} />
        ) : null}
        {isAccepted || isAdmin ? <EnterEvent slug={event.slug} /> : null}
      </menu>
    </div>
  )
}

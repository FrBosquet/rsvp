import { SubmitButton } from "@/components/SubmitButton";

import { auth } from "@clerk/nextjs";
import { Event, User, UserOnEvent } from "@prisma/client";
import { ArrowRightCircle, Trash, UserCheck, UserSearch } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { acceptEventOwnership, addOwnerToEvent, deleteEvent, removeOwnerFromEvent } from "../actions";

type Props = {
  isAdmin: boolean
  event: Event & { users: Array<UserOnEvent & { user: User | null }> }
}

const AcceptInvitation = ({ eventId }: { eventId: string }) => {
  const { userId } = auth()

  return <form action={acceptEventOwnership}>
    <input type="hidden" name="eventId" value={eventId} />
    <input type="hidden" name="userId" value={userId as string} />
    <SubmitButton className="bg-green-600 p-1">Aceptar</SubmitButton>
  </form>
}

const EnterEvent = ({ slug }: { slug: string }) => {
  return <Link className="uppercase text-sm font-bold bg-orange-400 hover:bg-rose-400 text-zinc-800 p-2 rounded-2xl shadow-lg disabled:opacity-25 disabled:cursor-wait flex" href={`/private/${slug}`}> <ArrowRightCircle size={16} /></Link>
}

const UserLine = ({ userOnEvent, isAdmin, eventId }: { userOnEvent: UserOnEvent, isAdmin: boolean, eventId: string }) => {
  const isAccepted = userOnEvent.userId !== null

  return <div key={userOnEvent.id} className={twMerge("text-zinc-600 pr-4 inline-flex gap-1 items-center", isAccepted && 'text-zinc-400')}>
    {isAccepted
      ? <UserCheck size={16} />
      : <UserSearch size={16} />
    } {userOnEvent.email}

    {
      isAdmin
        ? <form action={removeOwnerFromEvent}>
          <input type="hidden" name="id" value={eventId} />
          <input type="hidden" name="email" value={userOnEvent.email} />
          <SubmitButton className="bg-red-600 p-1"><Trash size={10} /></SubmitButton>
        </form>
        : null
    }
  </div>
}

export const EventCard = ({ event, isAdmin }: Props) => {
  const { userId } = auth()
  const { users } = event

  const isAccepted = users.some((userOnEvent) => userOnEvent.user?.id === userId)

  return <div key={event.id} className="w-full flex flex-col rounded-2xl bg-slate-900 p-2 gap-2 text-zinc-200 shadow-md p-4">
    <h2 className="font-semibold">{event.name} <span className="text-zinc-400 font-thin">/{event.slug}</span></h2>
    <div className="text-zinc-400 flex flex-wrap">
      {
        event.users.map((user, index) => <UserLine key={index} userOnEvent={user} isAdmin={isAdmin} eventId={event.id} />)
      }
    </div>

    <menu className="flex gap-2 items-center justify-end w-full pt-4">
      {
        isAdmin
          ? <form action={deleteEvent}>
            <input type="hidden" name="id" value={event.id} />
            <SubmitButton className="bg-red-600"><Trash size={14} /></SubmitButton>
          </form>
          : null
      }

      {
        isAdmin
          ? <form action={addOwnerToEvent} className="flex-1 flex justify-end items-center gap-2 justify-self-end" >
            <input type="hidden" name="id" value={event.id} />
            <input type="email" name="email" placeholder="email" className="text-zinc-200 border-none bg-transparent" />
            <SubmitButton>invitar</SubmitButton>
          </form>
          : null
      }
      {
        !isAccepted && !isAdmin
          ? <AcceptInvitation eventId={event.id} />
          : null
      }
      {
        isAccepted || isAdmin
          ? <EnterEvent slug={event.slug} />
          : null
      }
    </menu>
  </div>
}
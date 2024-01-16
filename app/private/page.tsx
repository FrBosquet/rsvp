import { Fieldset, Form } from "@/components/Form";
import { SubmitButton } from "@/components/SubmitButton";
import { prisma } from "@/lib/prisma";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { createEvent } from "../actions";
import { EventCard } from "./event-card";

export default async function PrivatePage() {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  const isAdmin = user?.role === 'admin'

  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      users: {
        include: {
          user: true
        }
      }
    },
    where: !isAdmin
      ? {
        users: {
          some: {
            OR: [
              { userId },
              { email: user?.email }
            ]
          }
        }
      }
      : undefined
  })

  return <section className="p-4 flex flex-col gap-2 [--letter-size:1rem] m-auto max-w-[1500px]">
    <menu className="w-full flex rounded-2xl bg-zinc-900 p-2 gap-2 text-zinc-200 items-center shadow-lg">
      <UserButton />
      <h1 className="uppercase text-lg">Tus eventos</h1>
    </menu>

    {isAdmin
      ? <article className="w-full flex rounded-2xl bg-green-900 p-2 gap-2 text-zinc-200 shadow-md">
        <h2 className="font-semibold">Crear nuevo evento</h2>
        <Form action={createEvent} className="flex w-full">
          <Fieldset className="flex flex-1 gap-2 w-full">
            <input required className="bg-transparent border-b-2 flex-1 p-1" name="name" placeholder="Nombre del evento" />
            <input required className="bg-transparent border-b-2 flex-1 p-1" name="slug" placeholder="URL del evento" />
          </Fieldset>
          <SubmitButton>Crear</SubmitButton>
        </Form>
      </article>
      : null
    }

    <article className="grid md:grid-cols-2 xl:grid-cols-3 gap-2 pt-6">
      {events.map(event => <EventCard key={event.id} event={event} isAdmin={isAdmin} />)}
    </article>
  </section>
}
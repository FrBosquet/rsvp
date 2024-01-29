import { Fieldset, Form } from '@/components/Form'
import { SubmitButton } from '@/components/SubmitButton'
import { prisma } from '@/lib/prisma'
import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { createEvent } from '../actions'
import { EventCard } from './event-card'

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

  return <section className="container m-auto flex flex-col gap-3 p-4 text-reset">
    <header className="flex w-full items-center gap-2 rounded-2xl bg-slate-800 p-2 text-zinc-200 shadow-lg">
      <UserButton />
      <h1 className="text-lg uppercase">Tus eventos</h1>
    </header>

    {isAdmin
      ? <article className="flex w-full gap-2 rounded-2xl bg-green-900 p-2 text-zinc-200 shadow-md">
        <h2 className="font-semibold">Crear nuevo evento</h2>
        <Form action={createEvent} className="flex w-full">
          <Fieldset className="flex w-full flex-1 gap-2">
            <input required className="flex-1 border-b-2 bg-transparent p-1" name="name" placeholder="Nombre del evento" />
            <input required className="flex-1 border-b-2 bg-transparent p-1" name="slug" placeholder="URL del evento" />
          </Fieldset>
          <SubmitButton>Crear</SubmitButton>
        </Form>
      </article>
      : null
    }

    <article className="grid gap-2 pt-6 md:grid-cols-2 xl:grid-cols-3">
      {events.map(event => <EventCard key={event.slug} event={event} isAdmin={isAdmin} />)}
    </article>
  </section>
}

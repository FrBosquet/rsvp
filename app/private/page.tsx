import { Fieldset, Form } from "@/components/Form";
import { SubmitButton } from "@/components/SubmitButton";
import { prisma } from "@/lib/prisma";
import { UserButton } from "@clerk/nextjs";
import { Trash } from "lucide-react";
import { createEvent, deleteEvent } from "../actions";

export default async function PrivatePage() {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      users: true
    }
  })

  return <section className="p-4 flex flex-col gap-2 [--letter-size:1rem]">
    <menu className="w-full flex rounded-2xl bg-zinc-900 p-2 gap-2 text-zinc-200 items-center shadow-lg">
      <UserButton />
      <h1 className="uppercase">Tu evento</h1>
    </menu>
    <article className="w-full flex rounded-2xl bg-green-900 p-2 gap-2 text-zinc-200 shadow-md">
      <h2 className="font-semibold">Crear nuevo evento</h2>
      <Form action={createEvent} className="flex w-full">
        <Fieldset className="flex flex-1 gap-2 w-full">
          <input required className="bg-transparent border-b-2 flex-1 p-1" name="name" placeholder="Nombre del evento" />
          <input required className="bg-transparent border-b-2 flex-1 p-1" name="slug" placeholder="URL del evento" />
        </Fieldset>
        <SubmitButton>Crear</SubmitButton>
      </Form>
    </article>

    <article className="grid grid-cols-2 gap-2">
      {events.map(event => <div key={event.id} className="w-full flex flex-col rounded-2xl bg-slate-900 p-2 gap-2 text-zinc-200 shadow-md p-4">
        <h2 className="font-semibold">{event.name}</h2>
        <p className="text-zinc-400">{event.slug}</p>
        <form action={deleteEvent}>
          <input type="hidden" name="id" value={event.id} />
          <SubmitButton><Trash size={14} /></SubmitButton>
        </form>
      </div>)}
    </article>
  </section>
}
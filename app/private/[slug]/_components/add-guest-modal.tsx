'use client'

import { addGuestToEvent } from '@/app/actions'
import { Spinner } from '@/components/spinner'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { type GuestWithHost } from '@/types'
import { useUser } from '@clerk/nextjs'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRef, useState, type FormEvent, type MouseEvent } from 'react'
import { toast } from 'sonner'

const AddButton = () => {
  return <Tooltip>
    <TooltipTrigger asChild><PlusCircleIcon /></TooltipTrigger>
    <TooltipContent>Añadir invitado</TooltipContent>
  </Tooltip>
}

interface Props {
  onNewGuest: (guest: GuestWithHost) => void
}

export const AddGuestModal = ({ onNewGuest }: Props) => {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const hostId = user?.id
  const params = useParams()
  const eventSlug = (params?.slug as string) ?? null

  const slugInput = useRef<HTMLInputElement>(null)
  const guestsInput = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      setLoading(true)
      const newGuest = await addGuestToEvent(formData)

      onNewGuest(newGuest)
      toast.success('Invitación creada correctamente')
      setOpen(false)
    } catch (err) {
      let message = 'Unknown Error'
      if (err instanceof Error) message = err.message

      switch (true) {
        case message.includes('Unique constraint'):
          toast.error('El enlace único especificado ya existe para este evento. Por favor, utiliza un enlace diferente!')
          break
        default:
          toast.error('Error desconocido! Por favor, contacta con el administrador si el error persiste')
          break
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const value = target.value

    const sanitizedValue = value.replace(/,/g, 'y').replace(/[^a-z0-9]/gi, '').toLowerCase()

    if (slugInput?.current) {
      slugInput.current.value = sanitizedValue
    }
  }

  const handleGuestIncrease = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    const op = target.dataset.op as 'minus' | 'plus'

    const currentValue = parseInt(guestsInput.current?.value ?? '0', 10)

    if (op === 'minus') {
      if (currentValue <= 1) return
      guestsInput.current!.value = `${currentValue - 1}`
    } else {
      guestsInput.current!.value = `${currentValue + 1}`
    }
  }

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className="h-0" ><AddButton /></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Añadir invitado</DialogTitle>
        <DialogDescription>Crea una nueva invitación</DialogDescription>
      </DialogHeader>

      <form id='add-guest-modal' onSubmit={handleSubmit}>
        <fieldset className='flex flex-col gap-4' disabled={loading}>
          <input type="hidden" name="eventSlug" value={eventSlug} />
          <input type="hidden" name="hostId" value={hostId} />

          <article className='flex flex-col gap-2'>
            <label className='font-semibold' htmlFor="names">Nombres</label>
            <Input required placeholder="Nombres de los invitados" name='names' id="names" onChange={handleChange} />
            <p className='text-sm text-slate-400'>Separados por comas. Pej. &quot;Lola,Ramón&quot;</p>
          </article>

          <article className='flex flex-col gap-2'>
            <label className='font-semibold' htmlFor="slug">Enlace</label>
            <Input ref={slugInput} required placeholder="Slug de la invitación" name='slug' id="slug" />
            <p className='text-sm text-slate-400'>Enlace personalizado y único para cada invitación. Este sirve para distinguir el enlace que enviaras a cada invitado.</p>
          </article>

          <article className='flex flex-col gap-2'>
            <div className="flex items-center space-x-2">
              <Checkbox id="family" name="family" />
              <label
                htmlFor="family"
              >
                Es una familia
              </label>
            </div>
            <p className='text-sm text-slate-400'>Marcar si van mas miembros a parte de los nombrados</p>
          </article>

          <article className='flex flex-col gap-2'>
            <label className='font-semibold' htmlFor="guests">Invitados</label>
            <div className="flex items-center justify-center gap-4">
              <button type='button' onClick={handleGuestIncrease} data-op="minus"><MinusCircleIcon /></button>
              <input ref={guestsInput} name="guests" id="guests" className='w-8 border-none bg-transparent text-center text-lg' defaultValue={2} />
              <button type='button' onClick={handleGuestIncrease} data-op="plus"><PlusCircleIcon /></button>
            </div>
            <p className='text-sm text-slate-400'>Cuantas personas, como máximo, incluye esta invitación</p>
          </article>
        </fieldset>
      </form>

      <DialogFooter>
        <button type='submit' form='add-guest-modal'>{loading ? <Spinner /> : 'Crear'}</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

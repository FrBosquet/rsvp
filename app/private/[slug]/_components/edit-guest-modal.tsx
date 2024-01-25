'use client'

import { editGuest } from '@/app/actions'
import { Spinner } from '@/components/spinner'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { type GuestWithHost } from '@/types'
import { type Guest } from '@prisma/client'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRef, useState, type FormEvent, type MouseEvent } from 'react'
import { toast } from 'sonner'

interface Props {
  onEditGuest: (guest: GuestWithHost) => void
  guest: Guest
  children: React.ReactNode
}

export const EditGuestModal = ({ onEditGuest, guest, children }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const eventSlug = (params?.slug as string) ?? null

  const guestsInput = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      setLoading(true)
      const newGuest = await editGuest(formData)

      onEditGuest(newGuest)
      toast.success('Invitación actualizada correctamente')
      setOpen(false)
    } catch (err) {
      // let message = 'Unknown Error'
      // if (err instanceof Error) message = err.message

      switch (true) {
        default:
          toast.error('Error desconocido! Por favor, contacta con el administrador si el error persiste')
          break
      }
    } finally {
      setLoading(false)
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
    <DialogTrigger>{children}</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar invitación de {guest.name}</DialogTitle>
        <DialogDescription>Crea una nueva invitación</DialogDescription>
      </DialogHeader>

      <form id='edit-guest-modal' onSubmit={handleSubmit}>
        <fieldset className='flex flex-col gap-4' disabled={loading}>
          <input type="hidden" name="eventSlug" value={eventSlug} />
          <input type="hidden" name="slug" value={guest.slug} />

          <article className='flex flex-col gap-2'>
            <label className='font-semibold' htmlFor="names">Nombres</label>
            <Input required placeholder="Nombres de los invitados" name='names' id="names" defaultValue={guest.name} />
            <p className='text-sm text-slate-400'>Separados por comas. Pej. &quot;Lola,Ramón&quot;</p>
          </article>

          <article className='flex flex-col gap-2'>
            <label className='font-semibold' htmlFor="slug">Enlace</label>
            <Input disabled id="slug" defaultValue={guest.slug} />
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
              <input ref={guestsInput} type='number' min={1} name="guests" id="guests" className='w-8 border-none bg-transparent text-center text-lg' defaultValue={guest.maxAmount} />
              <button type='button' onClick={handleGuestIncrease} data-op="plus"><PlusCircleIcon /></button>
            </div>
            <p className='text-sm text-slate-400'>Cuantas personas, como máximo, incluye esta invitación</p>
          </article>
        </fieldset>
      </form>

      <DialogFooter>
        <button type='submit' form='edit-guest-modal'>{loading ? <Spinner /> : 'Guardar'}</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

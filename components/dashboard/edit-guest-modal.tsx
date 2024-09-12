import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type FormEvent, type MouseEvent, useRef, useState } from 'react'
import { toast } from 'sonner'

import { editGuest } from '@/app/actions'
import { Spinner } from '@/components/spinner'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { type GuestWithHost } from '@/types'

import { useIntl } from '../providers/translator'
import { DeleteGuestModal } from './delete-guest-overlay'

interface Props {
  onEditGuest: (guest: GuestWithHost) => void
  onDeleteGuest: (guest: GuestWithHost) => void
  guest: GuestWithHost
  children: React.ReactNode
}

export const EditGuestModal = ({
  onEditGuest,
  onDeleteGuest,
  guest,
  children
}: Props) => {
  const { t } = useIntl()
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
      switch (true) {
        default:
          toast.error(
            'Error desconocido! Por favor, contacta con el administrador si el error persiste'
          )
          break
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (guest: GuestWithHost) => {
    onDeleteGuest(guest)
    setOpen(false)
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('edit-guest.title', { guestName: guest.name })}
          </DialogTitle>
          <DialogDescription>Edita una invitación</DialogDescription>
        </DialogHeader>

        <form id="edit-guest-modal" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-4" disabled={loading}>
            <input name="eventSlug" type="hidden" value={eventSlug} />
            <input name="slug" type="hidden" value={guest.slug} />

            <article className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="names">
                Nombres
              </label>
              <Input
                required
                defaultValue={guest.name}
                id="names"
                name="names"
                placeholder="Nombres de los invitados"
              />
              <p className="text-sm text-slate-400">
                Separados por comas. Pej. &quot;Lola,Ramón&quot;
              </p>
            </article>

            <article className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="slug">
                Enlace
              </label>
              <Input disabled defaultValue={guest.slug} id="slug" />
            </article>

            <article className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="family" name="family" />
                <label htmlFor="family">Es una familia</label>
              </div>
              <p className="text-sm text-slate-400">
                Marcar si van mas miembros a parte de los nombrados
              </p>
            </article>

            <article className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="guests">
                Invitados
              </label>
              <div className="flex items-center justify-center gap-4">
                <button
                  data-op="minus"
                  type="button"
                  onClick={handleGuestIncrease}
                >
                  <MinusCircleIcon />
                </button>
                <input
                  ref={guestsInput}
                  className="w-8 border-none bg-transparent text-center text-lg"
                  defaultValue={guest.maxAmount}
                  id="guests"
                  min={1}
                  name="guests"
                  type="number"
                />
                <button
                  data-op="plus"
                  type="button"
                  onClick={handleGuestIncrease}
                >
                  <PlusCircleIcon />
                </button>
              </div>
              <p className="text-sm text-slate-400">
                Cuantas personas, como máximo, incluye esta invitación
              </p>
            </article>
          </fieldset>
        </form>

        <DialogFooter>
          <menu className=" flex w-full justify-between">
            <DeleteGuestModal guest={guest} onDeleteGuest={handleDelete}>
              <button className="rounded-sm bg-red-700 p-1" type="button">
                Eliminar
              </button>
            </DeleteGuestModal>

            <button form="edit-guest-modal" type="submit">
              {loading ? <Spinner /> : 'Guardar'}
            </button>
          </menu>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

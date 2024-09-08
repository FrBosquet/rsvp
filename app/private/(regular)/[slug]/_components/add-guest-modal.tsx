import { useUser } from '@clerk/nextjs'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type FormEvent, type MouseEvent, useRef, useState } from 'react'
import removeAccents from 'remove-accents'
import { toast } from 'sonner'

import { addGuestToEvent } from '@/app/actions'
import { useIntl } from '@/components/providers/translator'
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { type GuestWithHost } from '@/types'

const AddButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <PlusCircleIcon />
      </TooltipTrigger>
      <TooltipContent>Añadir invitado</TooltipContent>
    </Tooltip>
  )
}

interface Props {
  onNewGuest: (guest: GuestWithHost) => void
  className?: string
}

export const AddGuestModal = ({ onNewGuest, className }: Props) => {
  const { t } = useIntl()
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
      toast.success(t('event.create_invitation.success'))
      setOpen(false)
    } catch (err) {
      let message = 'Unknown Error'
      if (err instanceof Error) message = err.message

      switch (true) {
        case message.includes('Unique constraint'):
          toast.error(t('errors.event.unique_slug'))
          break
        default:
          toast.error(t('errors.event.unknown'))
          break
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const value = target.value

    const sanitizedValue = removeAccents(value)
      .replace(/,/g, 'y')
      .replace(/[^a-z0-9]/gi, '')
      .toLowerCase()

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={className}>
        <AddButton />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir invitado</DialogTitle>
          <DialogDescription>Crea una nueva invitación</DialogDescription>
        </DialogHeader>

        <form id="add-guest-modal" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-4" disabled={loading}>
            <input name="eventSlug" type="hidden" value={eventSlug} />
            <input name="hostId" type="hidden" value={hostId} />

            <article className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="names">
                {t('names')}
              </label>
              <Input
                required
                id="names"
                name="names"
                placeholder={t('events.guest_names')}
                onChange={handleChange}
              />
              <p className="text-sm text-slate-400">
                {t('events.guest_names.helptext')}
              </p>
            </article>

            <article className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="slug">
                Enlace
              </label>
              <Input
                ref={slugInput}
                required
                id="slug"
                name="slug"
                placeholder="Slug de la invitación"
              />
              <p className="text-sm text-slate-400">
                Enlace personalizado y único para cada invitación. Este sirve
                para distinguir el enlace que enviaras a cada invitado.
              </p>
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
                  defaultValue={2}
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
          <button form="add-guest-modal" type="submit">
            {loading ? <Spinner /> : 'Crear'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

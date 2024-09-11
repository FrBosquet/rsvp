'use client'

import { useParams } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import { toast } from 'sonner'

import { deleteGuest } from '@/app/actions'
import { Spinner } from '@/components/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { type GuestWithHost } from '@/types'

interface Props {
  onDeleteGuest: (guest: GuestWithHost) => void
  guest: GuestWithHost
  children: React.ReactNode
}

export const DeleteGuestModal = ({ onDeleteGuest, guest, children }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const eventSlug = (params?.slug as string) ?? null

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      setLoading(true)
      const guest = await deleteGuest(formData)

      onDeleteGuest(guest)
      toast.success('Invitación eliminada correctamente')
      setOpen(false)
    } catch (err) {
      // let message = 'Unknown Error'
      // if (err instanceof Error) message = err.message

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {' '}
            ¿Estas seguro de que quieres borrar esta invitación?
          </DialogTitle>
          <DialogDescription>
            Esta acción no puede ser revertida
          </DialogDescription>
        </DialogHeader>

        <form id="delete-guest-modal" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-4" disabled={loading}>
            <input name="eventSlug" type="hidden" value={eventSlug} />
            <input name="slug" type="hidden" value={guest.slug} />
          </fieldset>
        </form>

        <DialogFooter>
          <menu className="flex w-full justify-between">
            <button
              type="button"
              onClick={() => {
                setOpen(false)
              }}
            >
              Cancelar
            </button>
            <button
              className="rounded-sm bg-red-700 p-1"
              form="delete-guest-modal"
              type="submit"
            >
              {loading ? <Spinner /> : 'Eliminar'}
            </button>
          </menu>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

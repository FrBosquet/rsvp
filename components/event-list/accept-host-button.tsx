'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { acceptHost } from '@/actions/event'
import { type EventWithUsers } from '@/types'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from '../ui/dialog'

interface Props {
  event: EventWithUsers
}

export const AcceptHostButton = ({ event }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAccept = async () => {
    setLoading(true)
    // TODO: Add next js progress

    try {
      const formData = new FormData()
      formData.append('slug', event.slug)

      await acceptHost(formData)
    } catch (error) {
      toast.error('Error al aceptar la invitación')
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open || loading} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>Aceptar invitación</DialogHeader>
          <DialogDescription>
            <p>¿Quieres ser anfitrión de este evento?</p>
          </DialogDescription>
          <DialogFooter>
            <Button
              disabled={loading}
              variant="destructive"
              onClick={() => {
                setOpen(false)
              }}
            >
              Cancelar
            </Button>
            <Button disabled={loading} onClick={handleAccept}>
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Soy anfitrión de este evento
      </Button>
    </>
  )
}

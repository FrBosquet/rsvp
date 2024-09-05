'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { acceptHost } from '@/actions/event'
import { type EventWithUsers } from '@/types'

import { useIntl } from '../providers/translator'
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
  const { intl } = useIntl()
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
      toast.error(intl('errors.dashboard.accept_event'))
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open || loading} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>{intl('dashboard.event.accept')}</DialogHeader>
          <DialogDescription>
            <p>{intl('dashboard.event.i-own')}</p>
          </DialogDescription>
          <DialogFooter>
            <Button
              disabled={loading}
              variant="destructive"
              onClick={() => {
                setOpen(false)
              }}
            >
              {intl('cancel')}
            </Button>
            <Button disabled={loading} onClick={handleAccept}>
              {intl('accept')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        {intl('dashboard.event.i-own')}
      </Button>
    </>
  )
}

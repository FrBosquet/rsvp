'use client'

import { HelpCircle, type LucideIcon, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

import { toggleContacted } from '@/app/actions'
import { CopyText } from '@/components/copy'
import { useLegacyEvent } from '@/components/hooks/use-legacy-event'
import { Spinner } from '@/components/spinner'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { type GuestWithHost, STATE } from '@/types'

import { EditGuestModal } from './edit-guest-modal'

interface Props {
  guest: GuestWithHost
  onUpdateGuest: (guest: GuestWithHost) => void
  onDeleteGuest: (guest: GuestWithHost) => void
}

const StateWidget = ({ state }: { state: string }) => {
  const isAccepted = state === STATE.accepted
  const isRejected = state === STATE.rejected
  const isPending = state === STATE.pending

  let Icon: LucideIcon = HelpCircle

  if (isAccepted) Icon = ThumbsUp
  if (isRejected) Icon = ThumbsDown

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Icon
          className={twMerge(
            'text-slate-900',
            isAccepted && 'text-green-500',
            isRejected && 'text-red-500',
            isPending && 'text-yellow-500'
          )}
          size={16}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">
          {isAccepted ? 'El invitado ha aceptado la invitación' : null}
          {isRejected ? 'El invitado ha rechazado la invitación' : null}
          {isPending ? 'El invitado aun no ha contestado la invitación' : null}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}

const ContactedWidget = ({ guest }: { guest: GuestWithHost }) => {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { updateGuest } = useLegacyEvent()
  const eventSlug = (params?.slug as string) ?? null

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('contacted', e.target.checked ? 'true' : 'false')
      formData.append('slug', guest.slug)
      formData.append('event', eventSlug)

      const updatedGuest = await toggleContacted(formData)

      updateGuest(updatedGuest)
    } catch (err) {
      toast.error(
        'Error desconocido! Por favor, contacta con el administrador si el error persiste'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex aspect-square w-4 items-center justify-center">
      {loading ? (
        <Spinner size={10} />
      ) : (
        <input
          checked={guest.contacted}
          className="accent-olive-400"
          type="checkbox"
          onChange={handleCheck}
        />
      )}
    </div>
  )
}

export const GuestRow = ({ guest, onUpdateGuest, onDeleteGuest }: Props) => {
  const { host } = guest
  const params = useParams<{ slug: string }>()
  const url = `${location.protocol}//${location.host}/${params?.slug}/${guest.slug}`

  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex aspect-square w-6 items-center justify-center gap-2 rounded-full bg-orange-700 text-xs md:w-8 md:text-base">
        {host.name.split(' ').map((name) => name[0])}
      </div>
      <div className="flex">
        <StateWidget state={guest.state} />
      </div>
      <div className="flex flex-1 flex-col">
        <EditGuestModal
          guest={guest}
          onDeleteGuest={onDeleteGuest}
          onEditGuest={onUpdateGuest}
        >
          <p className="text-left text-base font-semibold transition hover:text-pink-400">
            {guest.name}
          </p>
        </EditGuestModal>
        <a
          className="font-mono text-sm text-yellow-600"
          href={url}
          rel="noreferrer"
          target="_blank"
        >
          /{guest.slug}
        </a>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <p className="">
          {guest.state === 'pending' ? '...' : guest.amount}/{guest.maxAmount}
        </p>
        <CopyText onlyIcon iconSize={16} value={url} />
        <ContactedWidget guest={guest} />
      </div>
    </div>
  )
}

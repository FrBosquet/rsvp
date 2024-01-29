'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { STATE, type GuestWithHost } from '@/types'
import { type Guest } from '@prisma/client'
import { Copy, HelpCircle, type LucideIcon, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useParams } from 'next/navigation'
import { EditGuestModal } from './edit-guest-modal'

interface Props {
  guest: GuestWithHost
  onUpdateGuest: (guest: GuestWithHost) => void
  onDeleteGuest: (guest: Guest) => void
}

const StateWidget = ({ state }: { state: string }) => {
  const isAccepted = state === STATE.accepted
  const isRejected = state === STATE.rejected
  const isPending = state === STATE.pending

  let Icon: LucideIcon = HelpCircle

  if (isAccepted) Icon = ThumbsUp
  if (isRejected) Icon = ThumbsDown

  return <Tooltip>
    <TooltipTrigger asChild>
      <Icon size={16} />
    </TooltipTrigger>
    <TooltipContent>
      <p className="text-sm">
        {isAccepted ? 'El invitado ha aceptado la invitación' : null}
        {isRejected ? 'El invitado ha rechazado la invitación' : null}
        {isPending ? 'El invitado aun no ha contestado la invitación' : null}
      </p>
    </TooltipContent>
  </Tooltip>
}

export const GuestRow = ({ guest, onUpdateGuest, onDeleteGuest }: Props) => {
  const { host } = guest
  const params = useParams<{ slug: string }>()

  return <div className='flex w-full items-center gap-4'>
    <div className="flex aspect-square w-8 items-center justify-center gap-2 rounded-full bg-pink-400">
      {host.name.split(' ').map((name) => name[0])}
    </div>
    <div className="flex">
      <StateWidget state={guest.state} />
    </div>
    <div className="flex flex-1 flex-col">
      <EditGuestModal onDeleteGuest={onDeleteGuest} guest={guest} onEditGuest={onUpdateGuest}>
        <p className="text-left text-base font-semibold transition hover:text-pink-400">{guest.name}</p>
      </EditGuestModal>
      <a href={`/${params?.slug}/${guest.slug}`} target='_blank' className="font-mono text-sm text-yellow-600" rel="noreferrer">/{guest.slug}</a>
    </div>
    <div className="flex items-center gap-4 text-sm">
      <p className="">{guest.state === 'pending' ? '...' : guest.amount}/{guest.maxAmount}</p>
      <Copy size={16} />
      <input type='checkbox' checked={guest.contacted} />
    </div>

  </div>
}

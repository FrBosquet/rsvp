'use client'

import { type GuestWithHost } from '@/types'
import { Copy } from 'lucide-react'
import { useParams } from 'next/navigation'
import { EditGuestModal } from './edit-guest-modal'

interface Props {
  guest: GuestWithHost
  onUpdateGuest: (guest: GuestWithHost) => void
}

export const GuestRow = ({ guest, onUpdateGuest }: Props) => {
  const { host } = guest
  const params = useParams<{ slug: string }>()

  return <div className='flex w-full items-center gap-4'>
    <div className="flex aspect-square w-8 items-center justify-center gap-2 rounded-full bg-pink-400">
      {host.name.split(' ').map((name) => name[0])}
    </div>
    <div className="flex flex-1 flex-col">
      <EditGuestModal guest={guest} onEditGuest={onUpdateGuest}>
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

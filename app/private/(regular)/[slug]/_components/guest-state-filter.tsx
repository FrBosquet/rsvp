/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { useEvent } from '@/components/hooks/use-event'
import { STATE } from '@/types'
import { twMerge } from 'tailwind-merge'

export const GuestStateFilter = ({ className }: { className?: string }) => {
  const { toggleStateFilter, guestPending, guestAccepted, guestRejected, filters } = useEvent()

  return <div className={twMerge('flex gap-1', className)}>
    <button onClick={() => {
      toggleStateFilter(STATE.pending)
    }}
      data-selected={filters.state === STATE.pending}
      className="aspect-square w-8 rounded-md border-yellow-500 bg-yellow-500 text-sm font-semibold text-slate-900 hover:bg-yellow-300
      data-[selected='true']:border data-[selected='true']:bg-transparent data-[selected='true']:text-yellow-300 md:w-6 ">{guestPending}</button>

    <button onClick={() => {
      toggleStateFilter(STATE.accepted)
    }}
      data-selected={filters.state === STATE.accepted}
      className="aspect-square w-8 rounded-md border-green-500 bg-green-500 text-sm font-semibold text-slate-900 hover:bg-green-300
      data-[selected='true']:border data-[selected='true']:bg-transparent data-[selected='true']:text-green-300 md:w-6 ">{guestAccepted}</button>

    <button onClick={() => {
      toggleStateFilter(STATE.rejected)
    }}
      data-selected={filters.state === STATE.rejected}
      className="aspect-square w-8 rounded-md border-red-500 bg-red-500 text-sm font-semibold text-slate-900 hover:bg-red-300
      data-[selected='true']:border data-[selected='true']:bg-transparent data-[selected='true']:text-red-300 md:w-6 ">{guestRejected}</button>
  </div>
}

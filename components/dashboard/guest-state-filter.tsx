/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { twMerge } from 'tailwind-merge'

import { useLegacyEvent } from '@/components/hooks/use-legacy-event'
import { STATE } from '@/types'

export const GuestStateFilter = ({ className }: { className?: string }) => {
  const {
    toggleStateFilter,
    guestPending,
    guestAccepted,
    guestRejected,
    filters
  } = useLegacyEvent()

  return (
    <div className={twMerge('flex gap-1', className)}>
      <button
        className="aspect-square w-8 rounded-md border-yellow-500 bg-yellow-500 text-sm font-semibold text-slate-900 hover:bg-yellow-300
      data-[selected='true']:border data-[selected='true']:bg-transparent data-[selected='true']:text-yellow-300 md:w-6 "
        data-selected={filters.state === STATE.pending}
        onClick={() => {
          toggleStateFilter(STATE.pending)
        }}
      >
        {guestPending}
      </button>

      <button
        className="aspect-square w-8 rounded-md border-green-500 bg-green-500 text-sm font-semibold text-slate-900 hover:bg-green-300
      data-[selected='true']:border data-[selected='true']:bg-transparent data-[selected='true']:text-green-300 md:w-6 "
        data-selected={filters.state === STATE.accepted}
        onClick={() => {
          toggleStateFilter(STATE.accepted)
        }}
      >
        {guestAccepted}
      </button>

      <button
        className="aspect-square w-8 rounded-md border-red-500 bg-red-500 text-sm font-semibold text-slate-900 hover:bg-red-300
      data-[selected='true']:border data-[selected='true']:bg-transparent data-[selected='true']:text-red-300 md:w-6 "
        data-selected={filters.state === STATE.rejected}
        onClick={() => {
          toggleStateFilter(STATE.rejected)
        }}
      >
        {guestRejected}
      </button>
    </div>
  )
}

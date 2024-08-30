/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { UserSearch } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { useEvent } from '@/components/hooks/use-event'

export const SearchInput = ({ className }: { className?: string }) => {
  const { updateNameFilter } = useEvent()

  return (
    <p className={twMerge('relative flex items-center px-1', className)}>
      <UserSearch className="absolute" size={16} />
      <input
        className="bg-transparent pl-6"
        placeholder="buscar..."
        onChange={updateNameFilter}
      />
    </p>
  )
}

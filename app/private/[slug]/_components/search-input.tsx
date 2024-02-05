/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { useEvent } from '@/components/hooks/use-event'
import { UserSearch } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export const SearchInput = ({ className }: { className?: string }) => {
  const { updateNameFilter } = useEvent()

  return <p className={twMerge('relative flex items-center px-1', className)}>
    <UserSearch size={16}
      className='absolute' />
    <input className="bg-transparent pl-6"
      onChange={updateNameFilter}
      placeholder="buscar..." />
  </p>
}

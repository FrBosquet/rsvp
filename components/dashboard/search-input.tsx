/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { UserSearch } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { useLegacyEvent } from '@/components/hooks/use-legacy-event'
import { useIntl } from '@/components/providers/translator'

export const SearchInput = ({ className }: { className?: string }) => {
  const { t } = useIntl()
  const { updateNameFilter } = useLegacyEvent()

  return (
    <p className={twMerge('relative flex items-center px-1', className)}>
      <UserSearch className="absolute" size={16} />
      <input
        className="bg-transparent pl-6"
        placeholder={t('search_dots')}
        onChange={updateNameFilter}
      />
    </p>
  )
}

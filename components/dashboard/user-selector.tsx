'use client'

import { type User } from '@prisma/client'
import { twMerge } from 'tailwind-merge'

import { useLegacyEvent } from '@/components/hooks/use-legacy-event'
import { useIntl } from '@/components/providers/translator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select'

export const UserSelector = ({
  className
}: {
  users: User[]
  className?: string
}) => {
  const { t } = useIntl()
  const { hosts, setFilter, filters } = useLegacyEvent()

  const handleChange = (value: string) => {
    if (value === '-') {
      setFilter('host', null)
    } else {
      setFilter('host', value)
    }
  }

  const hostName =
    hosts.find((host) => host.id === filters.host)?.name ?? t('event.guest_of')

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className={twMerge('max-w-32', className)}>
        {hostName}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="-">{t('everyone')}</SelectItem>
        {hosts.map((host) => {
          return (
            <SelectItem key={host.id} value={host.id}>
              {host.name}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

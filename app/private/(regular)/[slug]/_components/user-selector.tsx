/* eslint-disable tailwindcss/no-arbitrary-value */
'use client'

import { useEvent } from '@/components/hooks/use-event'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { type User } from '@prisma/client'
import { twMerge } from 'tailwind-merge'

export const UserSelector = ({ users, className }: { users: User[], className?: string }) => {
  const { hosts, setFilter, filters } = useEvent()

  const handleChange = (value: string) => {
    if (value === '-') {
      setFilter('host', null)
    } else {
      setFilter('host', value)
    }
  }

  const hostName = hosts.find((host) => host.id === filters.host)?.name ?? 'Invitado de'

  return <Select onValueChange={handleChange}>
    <SelectTrigger className={twMerge('max-w-32', className)}>
      {hostName}
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="-">Todos</SelectItem>
      {
        hosts.map((host) => {
          return <SelectItem key={host.id}
            value={host.id}>{host.name}</SelectItem>
        })
      }
    </SelectContent>
  </Select>
}

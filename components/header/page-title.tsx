'use client'

import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useIntl } from '../providers/translator'

const useTitle = () => {
  const { intl } = useIntl()

  const pathname = usePathname()

  // Slice to remove the initial /
  const chunks = pathname.slice(1).split('/')
  const chunkAmount = chunks.length

  if (chunkAmount === 2 && chunks[1] === 'new') return 'Nuevo evento'
  if (chunkAmount === 2 && chunks[1] === 'preferences')
    return intl('preferences.title')
  if (chunkAmount === 2 && chunks[0] === 'private') return 'Tu evento'
  if (chunkAmount === 1 && chunks[0] === 'private')
    return intl('dashboard.title')

  return pathname
}

export const PageTitle = () => {
  const title = useTitle()

  return (
    <h1 className="flex items-center gap-2 text-lg font-bold uppercase">
      <Link className="grow-0" href="/private">
        <Home />
      </Link>
      {title}
    </h1>
  )
}

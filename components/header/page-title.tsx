'use client'

import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useIntl } from '../providers/translator'

const useTitle = () => {
  const { t } = useIntl()

  const pathname = usePathname()

  // Slice to remove the initial /
  const chunks = pathname.slice(1).split('/')
  const chunkAmount = chunks.length

  if (chunkAmount === 3 && chunks[2] === 'bus') return t('event.bus.title')
  if (chunkAmount === 3 && chunks[2] === 'settings') return t('settings')
  if (chunkAmount === 3 && chunks[2] === 'allergies')
    return t('allergies.title')
  if (chunkAmount === 2 && chunks[1] === 'new') return t('new_event.title')
  if (chunkAmount === 2 && chunks[1] === 'preferences')
    return t('preferences.title')
  if (chunkAmount === 2 && chunks[0] === 'private') return t('event.title')
  if (chunkAmount === 1 && chunks[0] === 'private') return t('dashboard.title')

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

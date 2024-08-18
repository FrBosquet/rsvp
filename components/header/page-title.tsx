'use client'

import { usePathname } from 'next/navigation'

const useTitle = () => {
  const pathname = usePathname()

  // Slice to remove the initial /
  const chunks = pathname.slice(1).split('/')

  if (chunks.length === 2 && chunks[0] === 'private') {
    return 'Tu evento'
  }

  if (chunks.length === 1 && chunks[0] === 'private') {
    return 'Tus eventos'
  }

  return pathname
}

export const PageTitle = () => {
  const title = useTitle()

  return <h1 className="text-lg font-bold uppercase">{title}</h1>
}

'use client'

import { usePathname } from 'next/navigation'

const useTitle = () => {
  const pathname = usePathname()

  // Slice to remove the initial /
  const chunks = pathname.slice(1).split('/')
  const chunkAmount = chunks.length

  if (chunkAmount === 2 && chunks[1] === 'new') return 'Nuevo evento'
  if (chunkAmount === 2 && chunks[1] === 'preferences') return 'Preferencias'
  if (chunkAmount === 2 && chunks[0] === 'private') return 'Tu evento'
  if (chunkAmount === 1 && chunks[0] === 'private') return 'Tus eventos'

  return pathname
}

export const PageTitle = () => {
  const title = useTitle()

  return <h1 className="text-lg font-bold uppercase">{title}</h1>
}

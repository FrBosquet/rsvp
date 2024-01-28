'use client'

import { useGuest } from '@/components/hooks/use-guest'
import { TABS } from '@/types'
import { Wrapper } from './wrapper'

export const Contact = () => {
  const { guest, currentTab } = useGuest()

  if (!guest) return null

  return (<Wrapper visible={currentTab === TABS.contact}>
    <h1 className='w-full border-b-2 border-zinc-400 pb-3 text-center font-serif text-xl uppercase'>Contacto</h1>

  </Wrapper>)
}

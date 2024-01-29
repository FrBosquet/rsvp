import { TABS } from '@/types'
import { type Guest } from '@prisma/client'
import { useEffect } from 'react'
import { create } from 'zustand'

interface Store {
  guest: Guest | null
  setGuest: (guest: Guest) => void
  isFlipped: boolean
  isAcceptingCardVisible: boolean
  setFlipped: (isFlipped: boolean) => void
  setAcceptingCardVisible: (isAcceptingCardVisible: boolean) => void
  currentTab: TABS
  setCurrentTab: (tab: TABS) => void
}

const useStore = create<Store>((set) => ({
  guest: null,
  setGuest: (guest: Guest) => { set({ guest }) },
  isFlipped: false,
  isAcceptingCardVisible: false,
  setFlipped: (isFlipped: boolean) => { set({ isFlipped }) },
  setAcceptingCardVisible: (isAcceptingCardVisible: boolean) => { set({ isAcceptingCardVisible }) },
  currentTab: TABS.contact,
  setCurrentTab: (currentTab: TABS) => { set({ currentTab }) }
}))

export const useGuest = (serverGuest?: Guest) => {
  const guest = useStore((state) => state.guest)
  const updateGuest = useStore((state) => state.setGuest)
  const isFlipped = useStore((state) => state.isFlipped)
  const setFlipped = useStore((state) => state.setFlipped)
  const isAcceptingCardVisible = useStore((state) => state.isAcceptingCardVisible)
  const setAcceptingCardVisible = useStore((state) => state.setAcceptingCardVisible)
  const currentTab = useStore((state) => state.currentTab)
  const setCurrentTab = useStore((state) => state.setCurrentTab)

  useEffect(() => {
    if (!guest && serverGuest) updateGuest(serverGuest)
  }, [serverGuest])

  const flip = () => {
    setFlipped(!isFlipped)
  }

  const showAcceptance = () => {
    setAcceptingCardVisible(true)
  }

  const hideAcceptance = () => {
    setAcceptingCardVisible(false)
  }

  return {
    guest,
    updateGuest,
    isFlipped,
    flip,
    isAcceptingCardVisible,
    showAcceptance,
    hideAcceptance,
    currentTab,
    setCurrentTab
  }
}

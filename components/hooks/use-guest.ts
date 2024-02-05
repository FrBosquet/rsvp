import { TABS } from '@/types'
import { type Guest } from '@prisma/client'
import { useEffect } from 'react'
import { create } from 'zustand'

interface Store {
  guest: Guest | null
  setGuest: (guest: Guest) => void
  isFlipped: boolean
  isAcceptingCardVisible: boolean
  isAcceptedCardVisible: boolean
  setFlipped: (isFlipped: boolean) => void
  setAcceptingCardVisible: (isAcceptingCardVisible: boolean) => void
  setAcceptedCardVisible: (isAcceptedCardVisible: boolean) => void
  currentTab: TABS
  setCurrentTab: (tab: TABS) => void
}

const useStore = create<Store>((set) => ({
  currentTab: TABS.contact,
  guest: null,
  isAcceptedCardVisible: false,
  isAcceptingCardVisible: false,
  isFlipped: false,
  setAcceptedCardVisible: (isAcceptedCardVisible: boolean) => {
    set({
      isAcceptedCardVisible
    })
  },
  setAcceptingCardVisible: (isAcceptingCardVisible: boolean) => {
    set({
      isAcceptingCardVisible
    })
  },
  setCurrentTab: (currentTab: TABS) => {
    set({
      currentTab
    })
  },
  setFlipped: (isFlipped: boolean) => {
    set({
      isFlipped
    })
  },
  setGuest: (guest: Guest) => {
    set({
      guest
    })
  }
}))

export const useGuest = (serverGuest?: Guest) => {
  const guest = useStore((state) => state.guest)
  const updateGuest = useStore((state) => state.setGuest)
  const isFlipped = useStore((state) => state.isFlipped)
  const setFlipped = useStore((state) => state.setFlipped)
  const isAcceptingCardVisible = useStore((state) => state.isAcceptingCardVisible)
  const isAcceptedCardVisible = useStore((state) => state.isAcceptedCardVisible)
  const setAcceptedCardVisible = useStore((state) => state.setAcceptedCardVisible)
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

  const showAcceptedCard = (tab: TABS) => {
    setCurrentTab(tab)
    setAcceptedCardVisible(true)
  }

  const hideAcceptedCard = () => {
    setAcceptedCardVisible(false)
  }

  return {
    currentTab,
    flip,
    guest,
    hideAcceptance,
    hideAcceptedCard,
    isAcceptedCardVisible,
    isAcceptingCardVisible,
    isFlipped,
    setCurrentTab,
    showAcceptance,
    showAcceptedCard,
    updateGuest
  }
}

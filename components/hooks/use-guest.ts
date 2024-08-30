import { type Guest } from '@prisma/client'
import { useEffect } from 'react'
import { create } from 'zustand'

import { getTypes } from '@/lib/guesttype'
import { type GuestWithNotes, NOTES, TABS } from '@/types'

interface Store {
  guest: GuestWithNotes | null
  setGuest: (guest: GuestWithNotes) => void
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
  setGuest: (guest: GuestWithNotes) => {
    set({
      guest
    })
  }
}))

export const useGuest = (serverGuest?: GuestWithNotes) => {
  const guest = useStore((state) => state.guest)
  const updateGuest = useStore((state) => state.setGuest)
  const isFlipped = useStore((state) => state.isFlipped)
  const setFlipped = useStore((state) => state.setFlipped)
  const isAcceptingCardVisible = useStore(
    (state) => state.isAcceptingCardVisible
  )
  const isAcceptedCardVisible = useStore((state) => state.isAcceptedCardVisible)
  const setAcceptedCardVisible = useStore(
    (state) => state.setAcceptedCardVisible
  )
  const setAcceptingCardVisible = useStore(
    (state) => state.setAcceptingCardVisible
  )
  const currentTab = useStore((state) => state.currentTab)
  const setCurrentTab = useStore((state) => state.setCurrentTab)

  const { isSingle, isFamily, isCouple } = guest
    ? getTypes(guest as Guest)
    : { isSingle: false, isFamily: false, isCouple: false }

  const usesBus = guest?.notes?.some(
    (note) => note.type === NOTES.bus && note.content === 'true'
  )
  const allergies = guest?.notes?.find(
    (note) => note.type === NOTES.allergies
  )?.content
  const hasAllergies = Boolean(allergies)

  useEffect(() => {
    if (!guest && serverGuest) updateGuest(serverGuest)
  }, [guest, serverGuest, updateGuest])

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
    updateGuest,
    usesBus,
    hasAllergies,
    allergies,
    isSingle,
    isFamily,
    isCouple
  }
}

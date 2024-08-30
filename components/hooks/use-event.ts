import { type Event, type User } from '@prisma/client'
import { type FormEvent, useEffect, useMemo } from 'react'
import { create } from 'zustand'

import { type GuestWithHost, type STATE } from '@/types'

interface Filter {
  name?: string
  state?: string
  host?: string
}

interface Store {
  isReady: boolean
  setIsReady: (isReady: boolean) => void
  event: Event | null
  guests: GuestWithHost[] | null
  filters: Filter
  setGuest: (guests: GuestWithHost[]) => void
  updateGuest: (guest: GuestWithHost) => void
  deleteGuest: (guest: GuestWithHost) => void
  setFilter: (k: string, v: string | null) => void
  toggleStateFilter: (stateFilter: STATE) => void
  setEvent: (event: Event) => void
}

const useStore = create<Store>((set) => ({
  isReady: false,
  setIsReady: (isReady: boolean) => {
    set({
      isReady
    })
  },
  event: null,
  guests: null,
  setEvent: (event: Event) => {
    set({
      event
    })
  },
  setGuest: (guests: GuestWithHost[]) => {
    set({
      guests
    })
  },
  updateGuest: (guest: GuestWithHost) => {
    set((state) => {
      const newGuests = state.guests?.map((g) => {
        if (g.slug === guest.slug) return guest
        return g
      })
      return {
        guests: newGuests
      }
    })
  },
  deleteGuest: (guest: GuestWithHost) => {
    set((state) => {
      const newGuests = state.guests?.filter((g) => g.slug !== guest.slug)
      return {
        guests: newGuests
      }
    })
  },
  setFilter: (k: string, v: string | null) => {
    set((state) => {
      return {
        filters: {
          ...state.filters,
          [k]: v
        }
      }
    })
  },
  toggleStateFilter: (stateFilter: STATE) => {
    set((state) => {
      return {
        filters: {
          ...state.filters,
          state: state.filters.state === stateFilter ? undefined : stateFilter
        }
      }
    })
  },
  filters: {}
}))

export const useEvent = (serverEvent?: Event & { guests: GuestWithHost[] }) => {
  const isReady = useStore((state) => state.isReady)
  const setReady = useStore((state) => state.setIsReady)
  const guests = useStore((state) => state.guests)
  const setGuests = useStore((state) => state.setGuest)
  const updateGuest = useStore((state) => state.updateGuest)
  const deleteGuest = useStore((state) => state.deleteGuest)
  const invitationAmount = guests?.length ?? 0
  const filters = useStore((state) => state.filters)
  const setFilter = useStore((state) => state.setFilter)
  const toggleStateFilter = useStore((state) => state.toggleStateFilter)
  const setEvent = useStore((state) => state.setEvent)
  const event = useStore((state) => state.event)

  const updateNameFilter = (event: FormEvent<HTMLInputElement>) => {
    setFilter('name', event.currentTarget.value)
  }

  const hosts = useMemo(() => {
    const set = new Set<string>()
    const hosts: User[] = []
    guests?.forEach((guest) => {
      if (!set.has(guest.host.id)) {
        hosts.push(guest.host)
        set.add(guest.host.id)
      }
    })
    return hosts.sort((a, b) => a.name.localeCompare(b.name))
  }, [guests])

  const { guestInvited, guestAccepted, guestPending, guestRejected } = useMemo(
    () =>
      (guests ?? []).reduce(
        (acc, guest) => {
          acc.guestInvited += guest.maxAmount
          if (guest.state === 'accepted') {
            acc.guestAccepted += guest.amount!
            acc.guestRejected += guest.maxAmount - guest.amount!
          }
          if (guest.state === 'pending') acc.guestPending += guest.maxAmount
          if (guest.state === 'rejected') acc.guestRejected += guest.maxAmount
          return acc
        },
        { guestInvited: 0, guestAccepted: 0, guestPending: 0, guestRejected: 0 }
      ),
    [guests]
  )

  const addGuest = (guest: GuestWithHost) => {
    setGuests(
      [...(guests ?? []), guest].sort((a, b) => a.name.localeCompare(b.name))
    )
  }

  const filteredGuests = useMemo(() => {
    return (guests ?? []).filter((guest) => {
      if (filters.name) {
        if (
          !guest.name.toLowerCase().includes(filters.name) ||
          !guest.slug.toLowerCase().includes(filters.name)
        )
          return false
      }
      if (filters.state && guest.state !== filters.state) return false
      if (filters.host && guest.host.id !== filters.host) return false

      return true
    })
  }, [filters, guests])

  useEffect(() => {
    if (!guests && serverEvent?.guests) {
      setGuests(serverEvent.guests)
      setEvent(serverEvent)
      setReady(true)
    }
  }, [guests, serverEvent, setEvent, setGuests, setReady])

  return {
    isReady,
    guests,
    setGuests,
    updateGuest,
    deleteGuest,
    guestInvited,
    guestAccepted,
    guestPending,
    guestRejected,
    addGuest,
    invitationAmount,
    filteredGuests,
    updateNameFilter,
    toggleStateFilter,
    filters,
    setFilter,
    hosts,
    event
  }
}

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { getEvent } from '@/actions/event'
import { EventWithUsers } from '@/types'

type LoadingEvent = {
  event: EventWithUsers | null
  hasEvent: false
  isLoading: true
}

type NoSlug = {
  event: null
  hasEvent: false
  isLoading: false
}

type Event = {
  event: EventWithUsers
  hasEvent: true
  isLoading: false
}

type ReturnType = LoadingEvent | NoSlug | Event

export const useEvent = () => {
  const { slug } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['event', slug],
    queryFn: () => {
      if (!slug) return null

      const formData = new FormData()
      formData.set('slug', slug as string)
      return getEvent(formData)
    }
  })

  return {
    event: data as EventWithUsers,
    hasEvent: data !== null,
    isLoading
  } as ReturnType
}

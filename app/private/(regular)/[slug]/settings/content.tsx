'use client'

import { useEffect, useRef, useState } from 'react'

import { FormTitle } from '@/components/dashboard/form/title'
import { Invitation } from '@/components/event/invitation'
import { useIntl } from '@/components/providers/translator'
import { cn } from '@/lib/utils'
import { InvitationConfig } from '@/types'

const mockGuest = {
  slug: 'example-slug',
  eventSlug: 'example-event-slug',
  name: 'John Doe',
  amount: null,
  maxAmount: 5,
  state: 'confirmed',
  hostId: 'host-id',
  isFamily: false,
  contacted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  notes: []
}

export const SettingsPageContent = () => {
  const { t } = useIntl()

  const ref = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({
    width: '100svh',
    height: '100svw',
    hasRef: false
  })

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setDimensions({
          width: `${ref.current.clientWidth}px`,
          height: `${ref.current.clientHeight}px`,
          hasRef: true
        })
      }
    }

    if (ref.current) {
      handleResize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const config: InvitationConfig = {
    containerWidth: dimensions.width,
    containerHeight: dimensions.height
  }

  return (
    <section
      className={cn(
        'flex h-full opacity-00 transition-all',
        dimensions.hasRef && 'opacity-100'
      )}
    >
      <article className="flex-1 flex-col">
        <FormTitle>{t('event.settings.invitation.title')}</FormTitle>
      </article>

      <article
        ref={ref}
        className="flex h-full flex-1 items-center justify-center overflow-hidden border"
      >
        {dimensions.hasRef && <Invitation config={config} guest={mockGuest} />}
      </article>
    </section>
  )
}

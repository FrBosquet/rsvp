'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { FormTitle } from '@/components/dashboard/form/title'
import { CardFlipper } from '@/components/event/flipper'
import { useIntl } from '@/components/providers/translator'
import { cn } from '@/lib/utils'

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

  const configStyles = useMemo(() => {
    return {
      ['--available-height']: dimensions.height,
      ['--available-width']: dimensions.width,
      ['--card-margin']: '2rem',
      ['--max-height-vertical']:
        'calc(var(--available-height) - var(--card-margin))',
      ['--max-width-horizontal']:
        'calc((var(--available-width) - var(--card-margin)) * 2)',
      ['--card-height']:
        'min(var(--max-height-vertical), var(--max-width-horizontal))',
      ['--card-bg']: 'pink',
      ['--card-unit']: 'calc(var(--card-height) / 100)'
    }
  }, [dimensions])

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
        style={configStyles as any}
      >
        {dimensions.hasRef && <CardFlipper guest={mockGuest} />}
      </article>
    </section>
  )
}

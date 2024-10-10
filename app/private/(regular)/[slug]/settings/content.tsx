'use client'

import { Paintbrush2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { CheckItem } from '@/components/dashboard/form/check-item'
import { FormLabel } from '@/components/dashboard/form/label'
import { FormTitle } from '@/components/dashboard/form/title'
import { Invitation } from '@/components/event/invitation'
import { useIntl } from '@/components/providers/translator'
import { fonts } from '@/lib/fonts'
import { useFontLoader } from '@/lib/fonts/use-font-loader'
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

const bgColors = [
  {
    name: 'rose',
    value: 'pink'
  },
  {
    name: 'emerald',
    value: '#6ee7b7'
  },
  {
    name: 'citric',
    value: '#fdba74'
  },
  {
    name: 'ruby',
    value: '#3f3f46'
  }
]

type State = {
  bg?: string
  fontSerif?: string
}

export const SettingsPageContent = () => {
  const [formState, setFormState] = useState<State>({})
  const { t } = useIntl()

  const ref = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({
    width: '100svh',
    height: '100svw',
    hasRef: false
  })

  useFontLoader(formState.fontSerif)

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
    containerHeight: dimensions.height,
    backgroundColor: formState.bg
  }

  const handleChange = (e: React.ChangeEvent<HTMLFieldSetElement>) => {
    const target = e.target

    switch (target.name) {
      case 'bg': {
        const { checked, value } = target as unknown as HTMLInputElement

        const color = bgColors.find((color) => color.name === value)

        setFormState((prev) => ({
          ...prev,
          [target.name]: checked ? color?.value : null
        }))
        break
      }

      case 'fontSerif': {
        const { checked, value } = target as unknown as HTMLInputElement

        setFormState((prev) => ({
          ...prev,
          [target.name]: checked ? value : null
        }))
        break
      }

      default:
        throw new Error(`Invalid input name ${target.name}`)
    }
  }

  return (
    <section
      className={cn(
        'flex h-full opacity-00 transition-all gap-2',
        dimensions.hasRef && 'opacity-100'
      )}
    >
      <article className="flex-1 flex-col">
        <FormTitle>{t('event.settings.invitation.title')}</FormTitle>
        <FormLabel htmlFor="bg-color">
          <Paintbrush2 size={14} /> {t('event.settings.invitation.bg.title')}
        </FormLabel>
        <fieldset className="grid grid-cols-4 gap-2" onChange={handleChange}>
          {bgColors.map(({ name, value }) => (
            <CheckItem
              key={name}
              className="bg-card-bg"
              name="bg"
              style={{ '--card-bg': value }}
              value={name}
            />
          ))}
        </fieldset>
        <FormLabel htmlFor="font-serif">
          <Paintbrush2 size={14} />{' '}
          {t('event.settings.invitation.font-serif.title')}
        </FormLabel>
        <fieldset className="grid grid-cols-4 gap-2" onChange={handleChange}>
          {fonts.map(({ name, short }) => (
            <CheckItem
              key={name}
              className="flex items-center justify-center bg-card-bg"
              name="fontSerif"
              value={name}
            >
              <Image
                alt={name}
                height={512}
                src={`/font-preview/${short}.webp`}
                width={512}
              />
            </CheckItem>
          ))}
        </fieldset>
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

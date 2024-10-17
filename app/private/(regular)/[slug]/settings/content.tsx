'use client'

import { Paintbrush2, Save } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { CheckItem } from '@/components/dashboard/form/check-item'
import { FormLabel } from '@/components/dashboard/form/label'
import { FormTitle } from '@/components/dashboard/form/title'
import { Invitation } from '@/components/event/invitation'
import { useIntl } from '@/components/providers/translator'
import { Button } from '@/components/ui/button'
import { InvitationConfig } from '@/lib/invitation-config'
import { bgColors } from '@/lib/invitation-config/colors'
import { fonts } from '@/lib/invitation-config/fonts'
import { useFontLoader } from '@/lib/invitation-config/use-font-loader'
import { cn } from '@/lib/utils'
import { InvitationComponentConfig } from '@/types'

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

const defaultConfig: InvitationConfig = {
  bg: '#6ee7b7',
  fontSerif: 'dm-serif'
}

type State = Partial<InvitationConfig>

export const SettingsPageContent = () => {
  const [formState, setFormState] = useState<State>(defaultConfig)
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

  const config: InvitationComponentConfig = {
    containerWidth: dimensions.width,
    containerHeight: dimensions.height,
    backgroundColor: formState.bg
  }

  const handleChange = (e: React.ChangeEvent<HTMLFieldSetElement>) => {
    const target = e.target

    switch (target.name) {
      case 'bg': {
        const { value } = target as unknown as HTMLInputElement

        setFormState((prev) => ({
          ...prev,
          [target.name]: value
        }))
        break
      }

      case 'fontSerif': {
        const { value } = target as unknown as HTMLInputElement

        setFormState((prev) => ({
          ...prev,
          [target.name]: value
        }))
        break
      }

      default:
        throw new Error(`Invalid input name ${target.name}`)
    }
  }

  return (
    <article
      className={cn(
        'flex h-full opacity-00 transition-all gap-2',
        dimensions.hasRef && 'opacity-100'
      )}
    >
      <form
        className="flex-1 flex-col"
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const obj: { [key: string]: any } = {}
          formData.forEach((value, key) => {
            obj[key] = value
          })

          // Save this to the server
          // console.log('>> :', obj)
        }}
      >
        <FormTitle>{t('event.settings.invitation.title')}</FormTitle>
        <fieldset role="menubar">
          <Button size="sm" type="submit" variant="menu">
            <Save size={16} />
            {t('event.settings.invitation.save')}
          </Button>
        </fieldset>

        {/* Bg color */}
        <FormLabel htmlFor="bg-color">
          <Paintbrush2 size={14} /> {t('event.settings.invitation.bg.title')}
        </FormLabel>
        <fieldset className="grid grid-cols-4 gap-2" onChange={handleChange}>
          {bgColors.map(({ name, value }) => (
            <CheckItem
              key={name}
              className="bg-card-bg"
              defaultChecked={value === formState.bg}
              name="bg"
              style={{ '--card-bg': value }}
              value={value}
            />
          ))}
        </fieldset>

        {/* Font serif: */}
        <FormLabel htmlFor="font-serif">
          <Paintbrush2 size={14} />{' '}
          {t('event.settings.invitation.font-serif.title')}
        </FormLabel>
        <fieldset className="grid grid-cols-4 gap-2" onChange={handleChange}>
          {fonts.map(({ name, short }) => (
            <CheckItem
              key={name}
              className="flex items-center justify-center bg-card-bg"
              defaultChecked={short === formState.fontSerif}
              name="fontSerif"
              value={short}
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
      </form>

      <article
        ref={ref}
        className="flex h-full flex-1 items-center justify-center overflow-hidden border"
      >
        {dimensions.hasRef && <Invitation config={config} guest={mockGuest} />}
      </article>
    </article>
  )
}

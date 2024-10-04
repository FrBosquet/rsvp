'use client'

import { FormTitle } from '@/components/dashboard/form/title'
import { CardFlipper } from '@/components/event/flipper'
import { useIntl } from '@/components/providers/translator'

export const SettingsPageContent = () => {
  const { t } = useIntl()

  return (
    <section className="flex h-full">
      <article className="flex-1 flex-col">
        <FormTitle>{t('event.settings.invitation.title')}</FormTitle>
      </article>

      <article className="flex h-full flex-1 items-center justify-center bg-rose-200">
        <CardFlipper
          guest={{
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
          }}
        />
      </article>
    </section>
  )
}

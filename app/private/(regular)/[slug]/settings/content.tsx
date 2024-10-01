'use client'

import { FormTitle } from '@/components/dashboard/form/title'
import { useIntl } from '@/components/providers/translator'

export const SettingsPageContent = () => {
  const { t } = useIntl()

  return (
    <section className="flex h-full">
      <article className="flex-1 flex-col">
        <FormTitle>{t('event.settings.invitation.title')}</FormTitle>
      </article>

      <article className="flex h-full flex-1 items-center justify-center bg-rose-200">
        Aquí va la preview
      </article>
    </section>
  )
}

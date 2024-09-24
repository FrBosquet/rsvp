'use client'

import { enUS, esES } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'

import { getUserPrefs } from '@/actions/prefs'

type Props = {
  children: React.ReactNode
}

const langToLocalization = {
  en: enUS,
  es: esES
}

export const CustomClerkProvider = ({ children }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['user-prefs'],
    queryFn: () => getUserPrefs()
  })

  if (isLoading) {
    return 'loading...'
  }

  const langKey = data?.language || 'en'

  const localization = langToLocalization[langKey] || esES

  return <ClerkProvider localization={localization}>{children}</ClerkProvider>
}

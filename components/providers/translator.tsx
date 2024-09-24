'use client'

import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useMemo } from 'react'

import { getUserPrefs } from '@/actions/prefs'
import {
  LangKey,
  TranslationKey,
  TranslationValue,
  Translator
} from '@/lib/translator'

type Props = {
  children: React.ReactNode
  defaultLanguage?: LangKey
}

type IntlFunction = (
  key: TranslationKey,
  values?: Record<string, TranslationValue>
) => string

const TranslatorContext = createContext<{
  lang: LangKey
  intl: IntlFunction
  t: IntlFunction
}>({
  lang: 'en',
  intl: (key) => key,
  t: (key) => key
})

export const useIntl = () => {
  const context = useContext(TranslatorContext)

  if (!context) {
    throw new Error('useIntl must be used within a TranslatorProvider')
  }

  return context
}

export const TranslatorProvider = ({
  children,
  defaultLanguage = 'en'
}: Props) => {
  const { data: prefs } = useQuery({
    queryKey: ['user-prefs'],
    queryFn: () => getUserPrefs()
  })

  const translator = useMemo(
    () => new Translator(prefs?.language || defaultLanguage),
    [defaultLanguage, prefs?.language]
  )

  const intl = (
    key: TranslationKey,
    values?: Record<string, TranslationValue>
  ) => {
    return translator.intl(key, values)
  }

  return (
    <TranslatorContext.Provider
      value={{
        lang: prefs?.language || defaultLanguage,
        intl,
        t: intl
      }}
    >
      {children}
    </TranslatorContext.Provider>
  )
}

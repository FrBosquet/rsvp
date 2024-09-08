'use client'

import { createContext, useContext, useMemo, useState } from 'react'

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
  setLang: (lang: LangKey) => void
  intl: IntlFunction
  t: IntlFunction
}>({
  lang: 'en',
  setLang: () => null,
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
  const [lang, setLang] = useState(defaultLanguage)
  const translator = useMemo(() => new Translator(lang), [lang])

  const handleSetLang = (lang: LangKey) => {
    setLang(lang)
  }

  const intl = (
    key: TranslationKey,
    values?: Record<string, TranslationValue>
  ) => {
    return translator.intl(key, values)
  }

  return (
    <TranslatorContext.Provider
      value={{ lang, setLang: handleSetLang, intl, t: intl }}
    >
      {children}
    </TranslatorContext.Provider>
  )
}

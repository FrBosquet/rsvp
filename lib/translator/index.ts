import en from './lang/en.json'
import es from './lang/es.json'

type Lang = typeof es & typeof en
export type TranslationKey = keyof Lang

const langs = {
  es,
  en
}

export type LangKey = keyof typeof langs

export class Translator {
  lang: Lang

  constructor(lang: LangKey) {
    this.lang = langs[lang]
  }

  setLang(lang: LangKey) {
    this.lang = langs[lang]
  }

  getTranslation(key: TranslationKey) {
    return this.lang[key] as string
  }
}

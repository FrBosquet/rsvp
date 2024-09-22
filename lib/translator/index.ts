import en from './lang/en.json'
import es from './lang/es.json'

type Lang = typeof es & typeof en
export type TranslationKey = keyof typeof es

const langs = {
  es,
  en
}

export type LangKey = keyof typeof langs
type DateTranslationValue = {
  date: Date
  format?: Intl.DateTimeFormatOptions
}
export type TranslationValue = string | number | DateTranslationValue

const DEFAULT_LANG = 'es'

export const getTranslator = (lang?: LangKey) => {
  const translator = new Translator(lang)

  return translator.t
}

export class Translator {
  langKey: LangKey
  lang: Lang

  constructor(key?: LangKey) {
    // Spanish is the lang by default
    if (!key) {
      key = DEFAULT_LANG
    }
    // During dev time we cannot use a key which is not in the es.json
    // During test time, we check that the key is in the en.json as well

    if (!langs[key]) {
      throw new Error(`No language found for key ${key}`)
    }
    this.langKey = key
    this.lang = langs[key] as Lang
  }

  setLang(lang: LangKey) {
    this.lang = langs[lang] as Lang
  }

  /**
   * Returns the translation for the given key
   *
   * @param key translation key
   * @returns the content
   */
  intl(key: TranslationKey, values: Record<string, TranslationValue> = {}) {
    if (!this.lang) {
      throw new Error('No language set')
    }

    let str = this.lang[key]

    if (!str) {
      return key
    }

    const substitutes = str.match(/{{(.*?)}}/g)

    if (substitutes) {
      substitutes.forEach((match) => {
        const key = match.slice(2, -2)
        let value = values[key]

        if (value != null) {
          if (typeof value === 'string') {
            str = str.replace(match, value)
            return
          } else if (typeof value === 'number') {
            str = str.replace(match, value.toString())
          } else if (value.date instanceof Date) {
            str = str.replace(
              match,
              value.date.toLocaleDateString(
                this.langKey,
                value.format || {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }
              )
            )
          }
        }
      })
    }

    return str
  }

  /**
   * Returns the translation for the given key
   *
   * @deprecated Use `intl`or `t` instead
   * @param key translation key
   * @returns the content
   */
  getTranslation = this.intl

  t = this.intl.bind(this)
}

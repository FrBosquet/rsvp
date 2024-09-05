import { Preference } from '@prisma/client'

import { UserPrefs } from '@/types'

export const fromRawPrefs = (rawPrefs: Preference[]): UserPrefs => {
  return rawPrefs.reduce<Record<string, string>>((acc, pref) => {
    acc[pref.type] = pref.value
    return acc
  }, {})
}

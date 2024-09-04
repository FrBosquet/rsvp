'use server'

import { currentUser } from '@clerk/nextjs/server'

import { prismaClient } from '@/lib/prisma'
import { LangKey } from '@/lib/translator'

type UserPrefs = {
  language?: LangKey
}

export const getUserPrefs = async () => {
  const user = await currentUser()

  if (!user) {
    return {}
  }

  const rawPref = await prismaClient.preference.findMany({
    where: {
      userId: user.id
    }
  })

  const prefs = rawPref.reduce<Record<string, string>>((acc, pref) => {
    acc[pref.type] = pref.value
    return acc
  }, {})

  return prefs as UserPrefs
}

export const setUserPrefs = async (formData: FormData) => {
  const user = await currentUser()

  if (!user) {
    return {}
  }

  const dataEntries = Array.from(formData.entries())

  const data = dataEntries.map(([type, value]) => {
    return {
      userId: user.id,
      type,
      value: value as string
    }
  })

  await prismaClient.preference.deleteMany({
    where: {
      userId: user.id
    }
  })

  await prismaClient.preference.createMany({
    data
  })

  const rawPref = await prismaClient.preference.findMany({
    where: {
      userId: user.id
    }
  })

  const prefs = rawPref.reduce<Record<string, string>>((acc, pref) => {
    acc[pref.type] = pref.value
    return acc
  }, {})

  return prefs as UserPrefs
}

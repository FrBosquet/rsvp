'use server'

import { currentUser } from '@clerk/nextjs/server'

import { prismaClient } from '@/lib/prisma'

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

  return prefs
}

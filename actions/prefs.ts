'use server'

import { currentUser } from '@clerk/nextjs/server'

import { prismaClient } from '@/lib/prisma'
import { fromRawPrefs } from '@/lib/server/prefs'

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

  return fromRawPrefs(rawPref)
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

  return fromRawPrefs(rawPref)
}

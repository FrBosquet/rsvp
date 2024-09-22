import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { prisma } from '../prisma'
import { getTranslator } from '../translator'
import { fromRawPrefs } from './prefs'

export const getUserData = async () => {
  const authUser = await currentUser()

  if (!authUser) return redirect('/private/creating_account')

  const user = await prisma.user.findUnique({
    where: {
      id: authUser.id
    },
    include: {
      preferences: true
    }
  })

  if (!user) return redirect('/private/creating_account')

  const { preferences, ...userData } = user

  return {
    ...userData,
    prefs: fromRawPrefs(preferences)
  }
}

export const getUserIntl = async () => {
  const user = await getUserData()

  const t = getTranslator(user.prefs.language)

  return { user, t }
}

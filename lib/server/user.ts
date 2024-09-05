import { User } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { prisma } from '../prisma'
import { fromRawPrefs } from './prefs'

export const getUserData = async (clerkUser: User) => {
  const user = await prisma.user.findUnique({
    where: {
      id: clerkUser.id
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

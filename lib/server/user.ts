import { User } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { prisma } from '../prisma'

export const getUserData = async (clerkUser: User) => {
  const user = await prisma.user.findUnique({
    where: {
      id: clerkUser.id
    }
  })

  if (!user) return redirect('/private/creating_account')

  return user
}

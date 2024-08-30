import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { prisma } from '../prisma'

export const getUser = async () => {
  const clerkUser = await currentUser()

  if (!clerkUser) return redirect('/sign-in')

  const user = await prisma.user.findUnique({
    where: {
      id: clerkUser.id
    }
  })

  if (!user) return redirect('/private/creating_account')

  return user
}

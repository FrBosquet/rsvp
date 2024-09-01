'use server'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { prismaClient } from '@/lib/prisma'

export const acceptHost = async (formData: FormData) => {
  const user = await currentUser()
  if (!user) throw new Error('User not found')

  const slug = formData.get('slug')

  const userOnEvent = await prismaClient.userOnEvent.findFirst({
    where: {
      email: user.emailAddresses[0].emailAddress,
      eventSlug: slug as string
    }
  })

  if (!userOnEvent) throw new Error('UserOnEvent not found')

  // Upsert userOnEvent to attach user id
  await prismaClient.userOnEvent.update({
    where: {
      id: userOnEvent.id
    },
    data: {
      user: {
        connect: {
          id: user.id
        }
      }
    }
  })

  // Redirect to event page
  redirect('/private')
}

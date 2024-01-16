'use server'

import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

// events

export async function createEvent(prevState: { error: string }, formData: FormData) {
  const name = formData.get('name')
  const slug = formData.get('slug')


  try {
    await prisma.event.create({
      data: {
        name: name as string,
        slug: slug as string,
      },
    })
  } catch (e: any) {
    return {
      error: e.message
    }
  }

  redirect('/private')
}

export async function deleteEvent(formData: FormData) {
  const id = formData.get('id') as string

  await prisma.event.delete({
    where: {
      id
    }
  })


  redirect('/private')
}

export async function addOwnerToEvent(formData: FormData) {
  const eventId = formData.get('id') as string
  const email = formData.get('email') as string

  await prisma.userOnEvent.create({
    data: {
      event: {
        connect: {
          id: eventId
        }
      },
      email
    }
  })

  redirect('/private')
}

export async function removeOwnerFromEvent(formData: FormData) {
  const eventId = formData.get('id') as string
  const email = formData.get('email') as string

  await prisma.userOnEvent.deleteMany({
    where: {
      email,
      eventId
    }
  })

  redirect('/private')
}

export async function acceptEventOwnership(formData: FormData) {
  const user = await currentUser()

  if (!user) {
    throw new Error('User not found')
  }

  const eventId = formData.get('eventId') as string

  const eventOnUser = await prisma.userOnEvent.findFirst({
    where: {
      eventId,
      email: user.emailAddresses[0].emailAddress
    }
  })

  if (!eventOnUser) {
    throw new Error('Event not found')
  }

  await prisma.userOnEvent.update({
    where: {
      id: eventOnUser.id,
    },
    data: {
      user: {
        connect: {
          id: user.id
        }
      }
    }
  })

  redirect('/private')
}
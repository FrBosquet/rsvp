'use server'

import { prisma } from '@/lib/prisma'
import { NOTES, STATE, type GuestWithHost, type GuestWithNotes } from '@/types'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

// events
export async function createEvent(prevState: { error: string }, formData: FormData) {
  const name = formData.get('name')
  const slug = formData.get('slug')

  try {
    await prisma.event.create({
      data: {
        name: name as string,
        slug: slug as string
      }
    })
  } catch (e: any) {
    return {
      error: e.message
    }
  }

  redirect('/private')
}

export async function deleteEvent(formData: FormData) {
  const slug = formData.get('slug') as string

  await prisma.event.delete({
    where: {
      slug
    }
  })

  redirect('/private')
}

export async function addOwnerToEvent(formData: FormData) {
  const slug = formData.get('slug') as string
  const email = formData.get('email') as string

  await prisma.userOnEvent.create({
    data: {
      event: {
        connect: {
          slug
        }
      },
      email
    }
  })

  redirect('/private')
}

export async function removeOwnerFromEvent(formData: FormData) {
  const eventSlug = formData.get('eventSlug') as string
  const email = formData.get('email') as string

  await prisma.userOnEvent.deleteMany({
    where: {
      email,
      eventSlug
    }
  })

  redirect('/private')
}

export async function acceptEventOwnership(formData: FormData) {
  const user = await currentUser()

  if (!user) {
    throw new Error('User not found')
  }

  const eventSlug = formData.get('eventSlug') as string

  const eventOnUser = await prisma.userOnEvent.findFirst({
    where: {
      eventSlug,
      email: user.emailAddresses[0].emailAddress
    }
  })

  if (!eventOnUser) {
    throw new Error('Event not found')
  }

  await prisma.userOnEvent.update({
    where: {
      id: eventOnUser.id
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

// guests
export async function addGuestToEvent(formData: FormData): Promise<GuestWithHost> {
  const eventSlug = formData.get('eventSlug') as string

  const name = (formData.get('names') as string).split(',').map((name) => name.trim()).join(', ')
  const slug = formData.get('slug')
  const isFamily = formData.get('family') === 'on'
  const maxAmount = formData.get('guests')
  const hostId = formData.get('hostId') as string

  const newGuest = await prisma.guest.create({
    include: {
      host: true
    },
    data: {
      event: {
        connect: {
          slug: eventSlug
        }
      },
      host: {
        connect: {
          id: hostId
        }
      },
      slug: slug as string,
      name,
      isFamily,
      maxAmount: parseInt(maxAmount as string)
    }
  })

  return newGuest as GuestWithHost
}

export async function editGuest(formData: FormData): Promise<GuestWithHost> {
  const eventSlug = formData.get('eventSlug') as string
  const slug = formData.get('slug') as string

  const name = (formData.get('names') as string).split(',').map((name) => name.trim()).join(', ')
  const isFamily = formData.get('family') === 'on'
  const maxAmount = formData.get('guests')

  const updatedGuest = await prisma.guest.update({
    include: {
      host: true
    },
    where: {
      eventSlug_slug: {
        eventSlug,
        slug
      }
    },
    data: {
      name,
      isFamily,
      maxAmount: parseInt(maxAmount as string)
    }
  })

  return updatedGuest as GuestWithHost
}

export async function deleteGuest(formData: FormData): Promise<GuestWithHost> {
  const event = formData.get('eventSlug') as string
  const guest = formData.get('slug') as string

  const data = await prisma.guest.findUnique({
    where: {
      eventSlug_slug: {
        eventSlug: event,
        slug: guest
      }
    },
    include: {
      host: true,
      notes: true
    }
  })

  if (!data) {
    throw new Error('Guest not found')
  }

  await prisma.guest.delete({
    where: {
      eventSlug_slug: {
        eventSlug: event,
        slug: guest
      }
    }
  })

  return data
}

const writeNote = async (eventSlug: string, slug: string, type: NOTES, content: string) => {
  await prisma.note.upsert({
    where: {
      guestSlug_guestEventSlug_type: {
        guestSlug: slug,
        guestEventSlug: eventSlug,
        type
      }
    },
    update: {
      content
    },
    create: {
      content,
      guest: {
        connect: {
          eventSlug_slug: {
            eventSlug,
            slug
          }
        }
      },
      type
    }
  })
}

export async function toggleContacted(formData: FormData): Promise<GuestWithHost> {
  const eventSlug = formData.get('event') as string
  const slug = formData.get('slug') as string
  const contacted = formData.get('contacted') as string

  const data = await prisma.guest.findUnique({
    where: {
      eventSlug_slug: {
        eventSlug,
        slug
      }
    },
    include: {
      notes: true
    }
  })

  if (!data) {
    throw new Error('Guest not found')
  }

  const updatedGuest = await prisma.guest.update({
    where: {
      eventSlug_slug: {
        eventSlug,
        slug
      }
    },
    data: {
      contacted: contacted === 'true'
    },
    include: {
      notes: true,
      host: true
    }
  })

  return updatedGuest
}

const deleteAllergyIfPresent = async (eventSlug: string, slug: string) => {
  await prisma.note.deleteMany({
    where: {
      guestSlug: slug,
      guestEventSlug: eventSlug,
      type: NOTES.allergies
    }
  })
}

export async function replyToInvitation(formData: FormData): Promise<GuestWithNotes> {
  const eventSlug = formData.get('eventSlug') as string
  const slug = formData.get('slug') as string
  const amount = formData.get('amount') as string
  const state = formData.get('state') as STATE
  const bus = formData.get('bus') as string
  const allergies = formData.get('allergies') as string

  const data = await prisma.guest.findUnique({
    where: {
      eventSlug_slug: {
        eventSlug,
        slug
      }
    }
  })

  if (!data) {
    throw new Error('Guest not found')
  }

  if (state === STATE.accepted) {
    try {
      const hasAllergies = allergies?.length > 0

      await Promise.all([
        writeNote(eventSlug, slug, NOTES.bus, bus ? 'true' : 'false'),
        hasAllergies && writeNote(eventSlug, slug, NOTES.allergies, allergies)
      ])

      if (!hasAllergies) {
        await deleteAllergyIfPresent(eventSlug, slug)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const updatedGuest = await prisma.guest.update({
    where: {
      eventSlug_slug: {
        eventSlug,
        slug
      }
    },
    data: {
      amount: amount ? parseInt(amount) : 0,
      state
    },
    include: {
      notes: true
    }
  })

  return updatedGuest
}

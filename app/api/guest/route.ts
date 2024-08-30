import { type NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams

  const event = searchParams.get('event')!
  const slug = searchParams.get('slug')!

  const guest = await prisma.guest.findUnique({
    where: {
      eventSlug_slug: {
        eventSlug: event,
        slug
      }
    },
    include: {
      notes: true,
      event: {
        include: {
          settings: true
        }
      }
    }
  })

  if (!guest) {
    return new Response(null, { status: 404 })
  }

  return new Response(JSON.stringify(guest), {
    headers: {
      'content-type': 'application/json'
    }
  })
}

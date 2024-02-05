import { CardFlipper } from '@/components/Cards/Flipper'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

interface Route {
  params: {
    event: string
    slug: string
  }
}

export default async function GuestPage({ params }: Route) {
  const { event, slug } = params

  const guest = await prisma.guest.findUnique({
    where: {
      eventSlug_slug: {
        eventSlug: event,
        slug
      }
    },
    include: {
      notes: true
    }
  })

  if (!guest) return redirect('/')

  return <main className='flex h-s-screen justify-center overflow-hidden'>
    <CardFlipper guest={guest} />
  </main>
}

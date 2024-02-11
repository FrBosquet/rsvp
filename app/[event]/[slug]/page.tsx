import { CardFlipper } from '@/components/Cards/Flipper'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Jana Y Odette',
  description: 'Invitación a la boda de Jana y Odette',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no'
}
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

  return <main className='flex h-s-screen justify-center overflow-hidden font-noto'>
    <CardFlipper guest={guest} />
  </main>
}

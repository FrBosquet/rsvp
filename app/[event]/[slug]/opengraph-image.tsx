/* eslint-disable @next/next/no-img-element */
import { prisma } from '@/lib/prisma'
import { SETTING } from '@/types'

interface Route {
  params: {
    event: string
  }
}

export default async function Image({ params }: Route) {
  const event = params.event

  const setting = await prisma.setting.findFirst({
    where: {
      slug: event,
      type: SETTING.ogImage
    }
  })

  if (setting) {
    return <img src={setting.value}
      alt='devaux RSVP'
      width={256}
      height={256}
      style={{ objectFit: 'cover' }} />
  }
}

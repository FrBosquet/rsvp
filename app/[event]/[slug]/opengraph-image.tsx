/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

import { prisma } from '@/lib/prisma'
import { SETTING } from '@/types'

interface Route {
  params: {
    event: string
  }
}

export const alt = 'DeVaux RSVP'
export const size = {
  width: 600,
  height: 600
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
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            backgroundImage: `url(${setting.value})`,
            width: size.width,
            height: size.height
          }}
        >
          <img alt={alt} src={setting.value} />
        </div>
      )
    )
  }
}

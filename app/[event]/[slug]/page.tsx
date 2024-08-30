import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { CardFlipper } from '@/components/Cards/Flipper'
import { isSingle } from '@/lib/guesttype'
import { getSettingsMap } from '@/lib/settings'
import { type GuestWithEvent, SETTING } from '@/types'

interface Route {
  params: {
    event: string
    slug: string
  }
}

const getGuestResponse = async (
  event: string,
  slug: string
): Promise<Response> => {
  const headersList = headers()
  const host = headersList.get('x-forwarded-host')
  const proto = headersList.get('x-forwarded-proto')

  const response = await fetch(
    `${proto}://${host}/api/guest?event=${event}&slug=${slug}`,
    { next: { tags: [`guest:${event}`] } }
  )

  return response
}

export async function generateMetadata({ params }: Route) {
  const response = await getGuestResponse(params.event, params.slug)

  if (response.status === 404) return {}

  const guest = (await response.json()) as GuestWithEvent

  const settings = getSettingsMap(guest.event.settings)

  const isGuestSingle = isSingle(guest)
  const title = settings[SETTING.ogTitle]

  const settingName = isGuestSingle
    ? SETTING.ogDescriptionSingle
    : SETTING.ogDescription
  const description = (settings[settingName] ?? '').replace(
    /<GUEST>/g,
    guest.name
  )

  return {
    openGraph: {
      title,
      description,
      type: 'profile',
      locale: 'es_ES'
    }
  }
}

export default async function GuestPage({ params }: Route) {
  const response = await getGuestResponse(params.event, params.slug)

  if (response.status === 404) return redirect('/')

  const guest = (await response.json()) as GuestWithEvent

  return (
    <main className="flex h-s-screen justify-center overflow-hidden font-noto">
      <CardFlipper guest={guest} />
    </main>
  )
}

import { CardFlipper } from '@/components/Cards/Flipper'
import { getFromSlug } from '@/lib/supabase'

interface Route {
  params: {
    slug: string
  }
}

export default async function GuestPage({ params }: Route) {
  const guestInfo = await getFromSlug(params.slug)

  return <CardFlipper guest={guestInfo} />
}

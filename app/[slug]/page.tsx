import { CardFlipper } from "@/components/Cards/Flipper"
import { getFromSlug } from "@/lib/supabase"

type Route = {
  params: {
    slug: string
  }
}

export default async function GuestPage({ params }: Route) {
  const guestInfo = await getFromSlug(params.slug)

  return <CardFlipper guest={guestInfo} />
}
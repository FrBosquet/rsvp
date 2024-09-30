import { OgManager } from '@/components/dashboard/event/settings/og-manager'

export default async function SettingsPage({
  params
}: {
  params: { slug: string }
}) {
  return <OgManager slug={params.slug} />
}
